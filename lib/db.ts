import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  created_at: string;
};

// Reuse a single connection across dev hot-reloads.
const globalForDb = globalThis as unknown as { __iwmDb?: DatabaseSync };

function createDb(): DatabaseSync {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const db = new DatabaseSync(path.join(dataDir, "iwm.db"));
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}

export function getDb(): DatabaseSync {
  if (!globalForDb.__iwmDb) globalForDb.__iwmDb = createDb();
  return globalForDb.__iwmDb;
}

export function saveContact(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}): number {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO contacts (name, email, phone, company, message)
     VALUES (?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    input.name,
    input.email,
    input.phone ?? null,
    input.company ?? null,
    input.message
  );
  return Number(result.lastInsertRowid);
}

export function listContacts(): Contact[] {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM contacts ORDER BY created_at DESC`)
    .all() as unknown as Contact[];
}
