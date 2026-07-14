'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 20;

const quickStarts = [
  { label: 'Get a quote', message: 'I\'d like to get a quote for a shop front.' },
  { label: 'Emergency repair', message: 'I need an emergency repair as soon as possible.' },
  { label: 'What areas do you cover?', message: 'What areas do you cover?' },
];

function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-grey-100 rounded-2xl rounded-bl-sm w-fit">
      <span className="w-2 h-2 bg-grey-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-grey-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-grey-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0 && inputRef.current) {
      inputRef.current.focus();
    }
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function sendMessage(content: string) {
    if (!content.trim() || typing || messages.length >= MAX_MESSAGES) return;

    const userMsg: Message = { role: 'user', content: content.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.message || 'Sorry, I couldn\'t get a response. Please call us on 07414 779594.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please call us on 07414 779594.',
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <div
        className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? 'items-end' : ''
        } ${
          pastHero || open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'
        }`}
      >
        {open && (
          <div
            className="
              w-[calc(100vw-2rem)] max-w-[360px]
              sm:w-[360px]
              bg-white rounded-2xl shadow-2xl overflow-hidden
              flex flex-col
              transition-all duration-300 ease-out
              origin-bottom-right
            "
            style={{ height: '500px' }}
            role="dialog"
            aria-label="Sigma Assistant chat"
          >
            <div className="bg-navy px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                <span className="font-heading font-bold text-white text-sm">Sigma Assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-grey-400 hover:text-white transition-colors p-1 rounded"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-grey-50">
              {messages.length === 0 && !typing ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-2">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-gold">
                    <ChatIcon />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-navy text-sm mb-1">How can we help?</p>
                    <p className="text-grey-500 text-xs">Get instant answers about our services</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {quickStarts.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => sendMessage(q.message)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gold/30 hover:border-gold bg-white hover:bg-gold/5 text-sm text-navy font-medium transition-colors text-left"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gold text-navy font-medium rounded-br-sm'
                            : 'bg-white text-charcoal shadow-sm rounded-bl-sm border border-grey-100'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <TypingIndicator />
                    </div>
                  )}
                  {messages.length >= MAX_MESSAGES && (
                    <p className="text-center text-xs text-grey-400 py-2">
                      Chat limit reached. Please{' '}
                      <a href="/contact" className="text-gold underline">contact us</a>
                      {' '}or call{' '}
                      <a href="tel:07414779594" className="text-gold underline">07414 779594</a>.
                    </p>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="flex-shrink-0 p-3 border-t border-grey-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={typing || messages.length >= MAX_MESSAGES}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-grey-50 border border-grey-200 text-sm text-charcoal placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
                  aria-label="Chat message input"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing || messages.length >= MAX_MESSAGES}
                  className="w-10 h-10 rounded-xl bg-gold hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-navy transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full bg-gold hover:bg-gold-light shadow-lg hover:shadow-xl flex items-center justify-center text-navy transition-all duration-200 ${
            open ? 'scale-90' : 'scale-100'
          }`}
          aria-label={open ? 'Close chat' : 'Open chat'}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </>
  );
}
