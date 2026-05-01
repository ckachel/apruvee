import app from "./app";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

async function runMigrations() {
  logger.info("Running database migrations...");
  await pool.query(`
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
  logger.info("Migrations complete.");
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

runMigrations()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        process.exit(1);
      }
      logger.info({ port }, "Server listening");
    });
  })
  .catch((err) => {
    logger.error({ err }, "Migration failed, exiting");
    process.exit(1);
  });
