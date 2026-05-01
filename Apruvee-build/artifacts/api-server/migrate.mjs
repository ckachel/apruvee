import pg from "pg";
import { fileURLToPath } from "url";
import path from "path";

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL });

async function migrate() {
  await client.connect();
  console.log("Running database migrations...");

  await client.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      loan_amount INTEGER NOT NULL,
      loan_purpose TEXT NOT NULL,
      credit_score TEXT NOT NULL,
      annual_income INTEGER NOT NULL,
      employment_status TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      state TEXT,
      consent_to_contact BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS lender_offers (
      id SERIAL PRIMARY KEY,
      lender_name TEXT NOT NULL,
      logo_url TEXT,
      min_rate REAL NOT NULL,
      max_rate REAL NOT NULL,
      min_amount INTEGER NOT NULL,
      max_amount INTEGER NOT NULL,
      min_term INTEGER NOT NULL,
      max_term INTEGER NOT NULL,
      min_credit_score INTEGER NOT NULL,
      estimated_monthly_payment REAL NOT NULL,
      features TEXT[] NOT NULL DEFAULT '{}',
      affiliate_url TEXT NOT NULL,
      badge_label TEXT
    );
  `);

  console.log("Migrations complete.");
  await client.end();
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
