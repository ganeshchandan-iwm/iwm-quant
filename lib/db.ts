import { DatabaseSync } from "node:sqlite";
import { createClient, type Client } from "@libsql/client";
import path from "path";
import fs from "fs";

/**
 * Contact storage - two backends behind one async API:
 *
 * - Local / self-hosted: SQLite file at data/iwm.db via Node's built-in
 *   node:sqlite. Zero setup; used whenever TURSO_DATABASE_URL is unset.
 * - Production (Vercel & other serverless): Turso (hosted libSQL/SQLite).
 *   Set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN and submissions persist
 *   across deployments and serverless instances.
 */

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  created_at: string;
};

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`;

// Reuse connections across dev hot-reloads / warm serverless invocations.
const g = globalThis as unknown as {
  __iwmLocal?: DatabaseSync;
  __iwmTurso?: Client;
  __iwmTursoReady?: Promise<unknown>;
};

const usingTurso = () => Boolean(process.env.TURSO_DATABASE_URL);

/* ---------- Turso (hosted) ---------- */

function turso(): Client {
  if (!g.__iwmTurso) {
    g.__iwmTurso = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return g.__iwmTurso;
}

function tursoReady(): Promise<unknown> {
  if (!g.__iwmTursoReady) g.__iwmTursoReady = turso().execute(SCHEMA);
  return g.__iwmTursoReady;
}

/* ---------- Local SQLite (node:sqlite) ---------- */

function local(): DatabaseSync {
  if (!g.__iwmLocal) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const db = new DatabaseSync(path.join(dataDir, "iwm.db"));
    db.exec("PRAGMA journal_mode = WAL");
    db.exec(SCHEMA);
    g.__iwmLocal = db;
  }
  return g.__iwmLocal;
}

/* ---------- Public API ---------- */

export async function saveContact(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}): Promise<number> {
  const args = [
    input.name,
    input.email,
    input.phone ?? null,
    input.company ?? null,
    input.message,
  ];

  if (usingTurso()) {
    await tursoReady();
    const res = await turso().execute({
      sql: `INSERT INTO contacts (name, email, phone, company, message)
            VALUES (?, ?, ?, ?, ?)`,
      args,
    });
    return Number(res.lastInsertRowid ?? 0);
  }

  const result = local()
    .prepare(
      `INSERT INTO contacts (name, email, phone, company, message)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(...args);
  return Number(result.lastInsertRowid);
}

export async function listContacts(): Promise<Contact[]> {
  if (usingTurso()) {
    await tursoReady();
    const res = await turso().execute(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    return res.rows as unknown as Contact[];
  }

  return local()
    .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
    .all() as unknown as Contact[];
}
