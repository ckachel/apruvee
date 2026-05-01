import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { SubmitLeadBody, GetLeadStatsResponse } from "@workspace/api-zod";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid lead submission");
    res.status(400).json({ error: "Validation error", details: parsed.error.message });
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values({
      loanAmount: parsed.data.loanAmount,
      loanPurpose: parsed.data.loanPurpose,
      creditScore: parsed.data.creditScore,
      annualIncome: parsed.data.annualIncome,
      employmentStatus: parsed.data.employmentStatus,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      state: parsed.data.state ?? null,
      consentToContact: parsed.data.consentToContact,
    })
    .returning();

  req.log.info({ leadId: lead.id }, "New lead captured");
  res.status(201).json(lead);
});

router.get("/leads/stats", async (req, res): Promise<void> => {
  const [stats] = await db.execute<{
    total_leads: string;
    today_leads: string;
    avg_loan_amount: string;
    top_purpose: string;
  }>(sql`
    SELECT
      COUNT(*)::text AS total_leads,
      COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::text AS today_leads,
      COALESCE(AVG(loan_amount), 0)::text AS avg_loan_amount,
      COALESCE(
        (SELECT loan_purpose FROM leads GROUP BY loan_purpose ORDER BY COUNT(*) DESC LIMIT 1),
        'Debt Consolidation'
      ) AS top_purpose
    FROM leads
  `);

  const result = GetLeadStatsResponse.parse({
    totalLeads: parseInt(stats.total_leads ?? "0", 10),
    todayLeads: parseInt(stats.today_leads ?? "0", 10),
    avgLoanAmount: parseFloat(stats.avg_loan_amount ?? "0"),
    topPurpose: stats.top_purpose ?? "Debt Consolidation",
  });

  res.json(result);
});

export default router;
