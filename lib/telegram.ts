// ---------------------------------------------------------------------------
// Telegram Bot – Lead Notifications
// ---------------------------------------------------------------------------

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message?: string | null;
  source?: string | null;
  createdAt: Date;
}

/**
 * Send a formatted lead notification to a Telegram group/chat.
 * Fires silently — logs warnings on misconfiguration and errors on failure,
 * but never throws so it won't break the request flow.
 */
export async function sendTelegramLeadNotification(
  lead: LeadData
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set — skipping notification."
    );
    return;
  }

  // Strip non-digit characters for tel: / WhatsApp links
  const digits = lead.phone.replace(/\D/g, "");
  // Ensure UK numbers start with country code for WhatsApp
  const waNumber = digits.startsWith("44")
    ? digits
    : digits.startsWith("0")
      ? `44${digits.slice(1)}`
      : digits;

  const timestamp = lead.createdAt.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    `<b>New Lead</b>`,
    ``,
    `<b>Name:</b> ${escapeHtml(lead.name)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    `<b>Phone:</b> ${escapeHtml(lead.phone)}`,
    `<b>Location:</b> ${escapeHtml(lead.location)}`,
    `<b>Service:</b> ${escapeHtml(lead.service)}`,
    lead.message ? `<b>Message:</b> ${escapeHtml(lead.message)}` : null,
    lead.source ? `<b>Source:</b> ${escapeHtml(lead.source)}` : null,
    `<b>Received:</b> ${timestamp}`,
    `<b>ID:</b> <code>${lead.id}</code>`,
    ``,
    `<a href="tel:${digits}">Call Customer</a>  |  <a href="https://wa.me/${waNumber}">WhatsApp Customer</a>`,
    ``,
    `Quick reply from:`,
    `<a href="tel:07414779594">Line 1 — 07414 779 594</a>`,
    `<a href="tel:07397066538">Line 2 — 07397 066 538</a>`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[telegram] sendMessage failed (${res.status}): ${body}`
      );
    }
  } catch (err) {
    console.error("[telegram] Failed to send lead notification:", err);
  }
}

/** Escape characters that are special in Telegram's HTML mode. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
