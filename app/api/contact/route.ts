import { NextResponse } from "next/server";
import { saveContact, listContacts } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "A field exceeds its maximum length." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  try {
    const id = await saveContact({ name, email, phone: phone || undefined, company: company || undefined, message });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    console.error("Error saving contact:", err);
    return NextResponse.json(
      { error: "Failed to store your message. Please try again." },
      { status: 500 }
    );
  }
}

// Admin-only: list submissions. Requires x-admin-token header matching ADMIN_TOKEN.
export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  const provided = req.headers.get("x-admin-token");
  if (!token || provided !== token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ contacts: await listContacts() });
}
