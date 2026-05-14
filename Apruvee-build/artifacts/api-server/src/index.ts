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

async function seedLenders() {
  const { rows } = await pool.query("SELECT COUNT(*) as count FROM lender_offers");
  const count = parseInt(rows[0].count, 10);
  if (count > 0) {
    logger.info({ count }, "Lenders already seeded, skipping.");
    return;
  }

  logger.info("Seeding lender offers...");

  const lenders = [
    {
      lender_name: "Upgrade",
      logo_url: null,
      min_rate: 9.99,
      max_rate: 35.99,
      min_amount: 1000,
      max_amount: 50000,
      min_term: 24,
      max_term: 84,
      min_credit_score: 580,
      estimated_monthly_payment: 285,
      features: ["Direct creditor payoff", "No prepayment penalty", "Soft pull pre-qual", "Rewards checking discount"],
      affiliate_url: "https://www.upgrade.com",
      badge_label: "Best for Fair Credit",
    },
    {
      lender_name: "Best Egg",
      logo_url: null,
      min_rate: 7.99,
      max_rate: 35.99,
      min_amount: 2000,
      max_amount: 50000,
      min_term: 36,
      max_term: 60,
      min_credit_score: 600,
      estimated_monthly_payment: 290,
      features: ["Fast funding (1-3 days)", "No prepayment penalty", "Soft pull pre-qual", "Fixed rate"],
      affiliate_url: "https://www.bestegg.com",
      badge_label: "Fast Funding",
    },
    {
      lender_name: "LendingClub",
      logo_url: null,
      min_rate: 9.57,
      max_rate: 35.99,
      min_amount: 1000,
      max_amount: 40000,
      min_term: 24,
      max_term: 60,
      min_credit_score: 600,
      estimated_monthly_payment: 280,
      features: ["Direct creditor payoff option", "Joint applications allowed", "Soft pull pre-qual", "Fixed monthly payment"],
      affiliate_url: "https://www.lendingclub.com",
      badge_label: null,
    },
    {
      lender_name: "Prosper",
      logo_url: null,
      min_rate: 8.99,
      max_rate: 35.99,
      min_amount: 2000,
      max_amount: 50000,
      min_term: 24,
      max_term: 60,
      min_credit_score: 560,
      estimated_monthly_payment: 278,
      features: ["Peer-to-peer lending", "No prepayment penalty", "Soft pull pre-qual", "Fixed rate"],
      affiliate_url: "https://www.prosper.com",
      badge_label: null,
    },
    {
      lender_name: "Achieve",
      logo_url: null,
      min_rate: 8.99,
      max_rate: 35.99,
      min_amount: 5000,
      max_amount: 50000,
      min_term: 24,
      max_term: 60,
      min_credit_score: 620,
      estimated_monthly_payment: 292,
      features: ["Direct creditor payoff", "Rate discount for retirement savings", "Soft pull pre-qual", "No prepayment penalty"],
      affiliate_url: "https://www.achieve.com",
      badge_label: "Top Rated",
    },
    {
      lender_name: "Upstart",
      logo_url: null,
      min_rate: 7.80,
      max_rate: 35.99,
      min_amount: 1000,
      max_amount: 50000,
      min_term: 36,
      max_term: 60,
      min_credit_score: 580,
      estimated_monthly_payment: 275,
      features: ["AI-powered approval", "Education & income considered", "Soft pull pre-qual", "Fast funding"],
      affiliate_url: "https://www.upstart.com",
      badge_label: null,
    },
    {
      lender_name: "Happy Money",
      logo_url: null,
      min_rate: 11.72,
      max_rate: 24.50,
      min_amount: 5000,
      max_amount: 40000,
      min_term: 24,
      max_term: 60,
      min_credit_score: 640,
      estimated_monthly_payment: 310,
      features: ["Credit card payoff focused", "No prepayment penalty", "Soft pull pre-qual", "Member benefits"],
      affiliate_url: "https://www.happymoney.com",
      badge_label: "Credit Card Payoff",
    },
  ];

  for (const lender of lenders) {
    await pool.query(
      `INSERT INTO lender_offers
        (lender_name, logo_url, min_rate, max_rate, min_amount, max_amount,
         min_term, max_term, min_credit_score, estimated_monthly_payment,
         features, affiliate_url, badge_label)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        lender.lender_name,
        lender.logo_url,
        lender.min_rate,
        lender.max_rate,
        lender.min_amount,
        lender.max_amount,
        lender.min_term,
        lender.max_term,
        lender.min_credit_score,
        lender.estimated_monthly_payment,
        lender.features,
        lender.affiliate_url,
        lender.badge_label,
      ]
    );
    logger.info({ lender: lender.lender_name }, "Seeded lender");
  }

  logger.info("Lender seeding complete.");
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
  .then(() => seedLenders())
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
    logger.error({ err }, "Startup failed, exiting");
    process.exit(1);
  });
