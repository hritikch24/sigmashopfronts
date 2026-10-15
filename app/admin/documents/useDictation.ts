'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Speak instead of type, for the quick-create box.
 *
 * "server": records with MediaRecorder and sends the audio to
 *   /api/admin/documents/transcribe (Whisper). Works in every current browser,
 *   phones included, and copes with long, rambling dictation.
 * "browser": the browser's own speech recognition, used only when the server
 *   has no speech service and the browser offers one (Chrome, Edge, Safari).
 *
 * Whatever is heard is handed to `onText` and lands in the text box, so it can
 * be read and corrected before anything is built from it.
 */

type Mode = 'server' | 'browser' | null;
export type DictationState = 'idle' | 'recording' | 'transcribing';

/** Long enough for a detailed job; short enough to stay under the upload limit. */
const MAX_SECONDS = 240;

interface BrowserRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function browserRecognition(): (new () => BrowserRecognition) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: new () => BrowserRecognition; webkitSpeechRecognition?: new () => BrowserRecognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function pickMime(): string {
  for (const t of ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) return t;
  }
  return '';
}

export function useDictation(headers: () => Record<string, string>, onText: (text: string) => void) {
  const [mode, setMode] = useState<Mode>(null);
  const [state, setState] = useState<DictationState>('idle');
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');

  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognition = useRef<BrowserRecognition | null>(null);

  // Which way can this browser and this server do it?
  useEffect(() => {
    let alive = true;
    (async () => {
      const canRecord = typeof window !== 'undefined' && 'MediaRecorder' in window && Boolean(navigator.mediaDevices?.getUserMedia);
      let server = false;
      if (canRecord) {
        try {
          const res = await fetch('/api/admin/documents/transcribe', { headers: headers() });
          if (res.ok) server = Boolean((await res.json()).available);
        } catch {
          // offline or blocked: fall through to the browser's own recogniser
        }
      }
      if (alive) setMode(server ? 'server' : browserRecognition() ? 'browser' : null);
    })();
    return () => {
      alive = false;
    };
  }, [headers]);

  const stopTimer = () => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  };

  const upload = useCallback(
    async (blob: Blob) => {
      setState('transcribing');
      try {
        const auth = { ...headers() };
        delete auth['Content-Type']; // the browser sets the multipart boundary itself
        const form = new FormData();
        form.append('audio', blob, blob.type.includes('mp4') ? 'speech.mp4' : blob.type.includes('ogg') ? 'speech.ogg' : 'speech.webm');
        const res = await fetch('/api/admin/documents/transcribe', { method: 'POST', headers: auth, body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not turn that into text.');
        onText(data.text);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not turn that into text.');
      }
      setState('idle');
    },
    [headers, onText],
  );

  const stop = useCallback(() => {
    stopTimer();
    if (recorder.current && recorder.current.state !== 'inactive') recorder.current.stop();
    recognition.current?.stop();
  }, []);

  const start = useCallback(async () => {
    if (state !== 'idle' || !mode) return;
    setError('');
    setSeconds(0);

    if (mode === 'browser') {
      const Ctor = browserRecognition();
      if (!Ctor) return;
      const r = new Ctor();
      r.lang = 'en-GB';
      r.continuous = true;
      r.interimResults = false;
      r.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) onText(e.results[i][0].transcript);
        }
      };
      r.onerror = (e) => setError(e.error === 'not-allowed' ? 'Microphone access was blocked. Allow it in the browser and try again.' : 'Speech recognition stopped. Try again, or type it.');
      r.onend = () => {
        stopTimer();
        setState('idle');
      };
      recognition.current = r;
      r.start();
      setState('recording');
      tick.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError('Microphone access was blocked. Allow it in the browser and try again.');
      return;
    }
    const mimeType = pickMime();
    const rec = new MediaRecorder(stream, mimeType ? { mimeType, audioBitsPerSecond: 32_000 } : undefined);
    chunks.current = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.current.push(e.data);
    };
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks.current, { type: rec.mimeType || mimeType || 'audio/webm' });
      if (blob.size) void upload(blob);
      else setState('idle');
    };
    recorder.current = rec;
    rec.start();
    setState('recording');
    tick.current = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= MAX_SECONDS) stop();
        return s + 1;
      });
    }, 1000);
  }, [state, mode, onText, upload, stop]);

  useEffect(() => () => stop(), [stop]);

  return { available: mode !== null, state, seconds, error, start, stop, maxSeconds: MAX_SECONDS };
}
