import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

const SALES_EMAIL = "sales@sigmashopfronts.com";
const FROM_EMAIL = "SigmaShopfronts <noreply@sigmashopfronts.com>";

export interface LeadData {
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
 * Sends a lead notification email to the sales team.
 */
export async function sendLeadNotification(lead: LeadData): Promise<void> {
  const submittedAt = lead.createdAt.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 8px;">
      <div style="background: #1a1a2e; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #d4a843; margin: 0; font-size: 22px;">New Lead Received</h1>
        <p style="color: #e8c876; margin: 8px 0 0; font-size: 14px;">SigmaShopfronts Enquiry</p>
      </div>

      <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 35%;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">
              <a href="mailto:${lead.email}" style="color: #1a1a2e;">${lead.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">
              <a href="tel:${lead.phone}" style="color: #1a1a2e;">${lead.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Location</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${lead.location}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Service</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${lead.service}</td>
          </tr>
          ${
            lead.message
              ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${lead.message}</td>
          </tr>`
              : ""
          }
          ${
            lead.source
              ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Source</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${lead.source}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Submitted</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">${submittedAt}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/447397066538?text=Hi%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20your%20enquiry"
             style="display: inline-block; background: #25d366; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Reply via WhatsApp
          </a>
        </div>

        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af; text-align: center;">
          Lead ID: ${lead.id}
        </p>
      </div>
    </div>
  `;

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: SALES_EMAIL,
    subject: `New Enquiry: ${lead.service} – ${lead.name} (${lead.location})`,
    html,
  });

  if (error) {
    throw new Error(`Failed to send lead notification: ${error.message}`);
  }
}

/**
 * Sends an automated thank-you reply to the customer.
 */
export async function sendAutoReply(
  email: string,
  name: string
): Promise<void> {
  const firstName = name.split(" ")[0];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 8px;">
      <div style="background: #1a1a2e; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #d4a843; margin: 0; font-size: 26px; letter-spacing: -0.5px;">SigmaShopfronts</h1>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Premium Shopfront Solutions</p>
      </div>

      <div style="background: #ffffff; padding: 32px 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1a1a2e; margin: 0 0 16px; font-size: 20px;">Thank you, ${firstName}!</h2>
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
          We've received your enquiry and our team will be in touch within <strong>2 hours</strong> during business hours (Mon–Fri, 8am–6pm).
        </p>
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Need a faster response? Reach us directly:
        </p>

        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 12px; font-size: 14px; color: #374151;">
            📞 <a href="tel:+447397066538" style="color: #1a1a2e; font-weight: 600;">07397 066 538</a>
          </p>
          <p style="margin: 0 0 12px; font-size: 14px; color: #374151;">
            💬 <a href="https://wa.me/447397066538" style="color: #1a1a2e; font-weight: 600;">WhatsApp us</a>
          </p>
          <p style="margin: 0; font-size: 14px; color: #374151;">
            📧 <a href="mailto:sales@sigmashopfronts.com" style="color: #1a1a2e; font-weight: 600;">sales@sigmashopfronts.com</a>
          </p>
        </div>

        <div style="text-align: center;">
          <a href="https://www.sigmashopfronts.com/gallery"
             style="display: inline-block; background: #d4a843; color: #1a1a2e; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px;">
            View Our Work
          </a>
        </div>

        <hr style="margin: 28px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
          SigmaShopfronts Ltd · Registered in England &amp; Wales<br />
          <a href="https://www.sigmashopfronts.com/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We've received your enquiry – SigmaShopfronts",
    html,
  });

  if (error) {
    throw new Error(`Failed to send auto-reply: ${error.message}`);
  }
}
