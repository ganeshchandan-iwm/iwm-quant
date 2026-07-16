import { NextResponse } from "next/server";
import { listContacts, type Contact } from "@/lib/db";

/**
 * Admin-only Excel export of contact submissions.
 *
 *   curl -H "x-admin-token: $ADMIN_TOKEN" \
 *        http://localhost:3000/api/contact/export -o contacts.csv
 *
 * A browser can't send a custom header from the address bar, so ?token= is
 * also accepted for a one-click download. Prefer the header where you can:
 * a token in a URL leaks into browser history, proxies and server logs.
 */

const HEADERS = ["id", "created_at", "name", "email", "phone", "company", "message"] as const;

/**
 * Quote a CSV cell, and neutralise spreadsheet formula injection: Excel
 * evaluates a cell starting with = + - @ (or tab/CR) as a formula, so a
 * visitor could otherwise smuggle one in via the contact form.
 *
 * = @ tab and CR always get the leading-apostrophe guard. A leading + or -
 * only matters if it could actually name a function (needs a letter or an
 * open paren) — that keeps plain phone numbers like "+91 98…" apostrophe-free
 * in Excel, while still catching payloads like "+HYPERLINK(...)".
 */
function cell(v: unknown): string {
  let s = v === null || v === undefined ? "" : String(v);
  const risky = /^[=@\t\r]/.test(s) || (/^[+\-]/.test(s) && /[A-Za-z(]/.test(s));
  if (risky) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

function toCsv(rows: Contact[]): string {
  const lines = [HEADERS.map(cell).join(",")];
  for (const r of rows) {
    lines.push(
      [r.id, r.created_at, r.name, r.email, r.phone, r.company, r.message]
        .map(cell)
        .join(",")
    );
  }
  // BOM so Excel reads it as UTF-8; CRLF is what Excel expects.
  return "﻿" + lines.join("\r\n");
}

export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  const provided =
    req.headers.get("x-admin-token") ?? new URL(req.url).searchParams.get("token");

  if (!token || provided !== token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const rows = await listContacts();
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(toCsv(rows), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="iwm-contacts-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
