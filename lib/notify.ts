/**
 * Post-submission notification for the contact form.
 *
 * Emails the enquiry to HR via Resend's HTTPS API (no SDK needed).
 * Configure RESEND_API_KEY (free at https://resend.com). Recipient defaults
 * to hr@iwmquant.com; override with CONTACT_TO.
 *
 * The enquiry itself is always persisted to the database first — this is
 * best-effort on top: a provider hiccup is logged but never blocks the
 * visitor's success screen.
 *
 * Note: submissions are read back out as Excel/CSV via
 * GET /api/contact/export. There is deliberately no Google Sheet webhook.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

const HR_FALLBACK = "hr@iwmquant.com";

export async function sendHrEmail(c: ContactPayload): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[notify] RESEND_API_KEY not set — skipping HR email.");
    return;
  }
  const to = process.env.CONTACT_TO || HR_FALLBACK;
  const from = process.env.CONTACT_FROM || "IWM Quant Website <onboarding@resend.dev>";

  const text = [
    `New enquiry from the website contact form`,
    ``,
    `Name:    ${c.name}`,
    `Email:   ${c.email}`,
    `Phone:   ${c.phone || "-"}`,
    `Company: ${c.company || "-"}`,
    ``,
    `Message:`,
    c.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: c.email,
      subject: `[iwmquant.com] New contact: ${c.name}`,
      text,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

/** Run every notification; log failures without throwing. */
export async function notifyAll(c: ContactPayload): Promise<void> {
  const jobs: [string, Promise<void>][] = [["HR email", sendHrEmail(c)]];
  const results = await Promise.allSettled(jobs.map(([, p]) => p));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[notify] ${jobs[i][0]} failed:`, r.reason);
    }
  });
}
