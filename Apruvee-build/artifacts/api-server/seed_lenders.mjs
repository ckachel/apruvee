// Seed script — run once to populate real lender data
// Usage: node seed_lenders.mjs
// Requires DATABASE_URL environment variable

import pg from "pg";

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL });

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

async function seed() {
  await client.connect();
  console.log("Connected to database");

  // Clear existing offers
  await client.query("DELETE FROM lender_offers");
  console.log("Cleared existing offers");

  for (const lender of lenders) {
    await client.query(
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
    console.log(`Added: ${lender.lender_name}`);
  }

  console.log(`\nSeeded ${lenders.length} lenders successfully`);
  await client.end();
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
