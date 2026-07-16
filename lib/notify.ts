/**
 * Post-submission notifications for the contact form:
 *
 *  1. Email the enquiry to HR (via Resend's HTTPS API — no SDK needed).
 *     Configure RESEND_API_KEY (free at https://resend.com). Recipient
 *     defaults to hr@iwmquant.com; override with CONTACT_TO.
 *
 *  2. Append a row to the IWM Quant Google Sheet:
 *     https://docs.google.com/spreadsheets/d/1o2W_SvldggHh8k5HiXNr_8C0n0aGR0CF5Eujm1DjtMk
 *     A plain "editable" sheet link can't accept API writes on its own
 *     (that access is a signed-in browser permission, not a credential a
 *     server can use) — so this sheet has a bound Apps Script Web App
 *     deployed on it that accepts a POST and appends a row. Its exec URL
 *     is hardcoded below as SHEET_WEBHOOK_URL. Only redeploy/replace it if
 *     the target sheet ever changes.
 *
 * Both are best-effort: a provider hiccup is logged but never blocks the
 * visitor's success screen — the enquiry is already safe in the database.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

const HR_FALLBACK = "hr@iwmquant.com";

// Hardcoded per requirement: the only spreadsheet this ever writes to is
// https://docs.google.com/spreadsheets/d/1o2W_SvldggHh8k5HiXNr_8C0n0aGR0CF5Eujm1DjtMk
// via its bound Apps Script Web App deployment.
const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyi8erTW7pmZVnLm7eLacMmBcCRWl001_6Ho1K5Il-38FOvrfPcYM9vVViXjWTnl-SQ/exec";

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
    `Phone:   ${c.phone || "—"}`,
    `Company: ${c.company || "—"}`,
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

export async function pushToSheet(c: ContactPayload): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL || SHEET_WEBHOOK_URL;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submittedAt: new Date().toISOString(),
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      company: c.company || "",
      message: c.message,
    }),
  });
  if (!res.ok) {
    throw new Error(`Sheet webhook responded ${res.status}: ${await res.text()}`);
  }
}

/** Run every notification; log failures without throwing. */
export async function notifyAll(c: ContactPayload): Promise<void> {
  const jobs: [string, Promise<void>][] = [
    ["HR email", sendHrEmail(c)],
    ["Google Sheet", pushToSheet(c)],
  ];
  const results = await Promise.allSettled(jobs.map(([, p]) => p));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[notify] ${jobs[i][0]} failed:`, r.reason);
    }
  });
}
