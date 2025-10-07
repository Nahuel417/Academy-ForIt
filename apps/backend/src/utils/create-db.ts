import sqlite from "better-sqlite3";

export function createDb(): any {
  const db = sqlite("data/data.db");
  db.pragma("journal_mode = WAL");

  db.prepare(
    "CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT, price INTEGER)"
  ).run();

  return db;
}
