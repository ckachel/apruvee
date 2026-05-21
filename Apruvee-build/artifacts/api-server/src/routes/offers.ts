import { Router, type IRouter } from "express";
import { db, lenderOffersTable } from "@workspace/db";
import { ListOffersQueryParams, ListOffersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/offers", async (req, res): Promise<void> => {
  const params = ListOffersQueryParams.safeParse(req.query);
  if (!params.success) {
    req.log.warn({ errors: params.error.message }, "Invalid offers query");
    res.status(400).json({ error: "Validation error" });
    return;
  }

  const { creditScore } = params.data;

  // Map credit score label to numeric floor for filtering
  let minScore = 0;
  if (creditScore === "Excellent 720+" || creditScore === "Excellent") minScore = 720;
  else if (creditScore === "Good 680-719" || creditScore === "Good 680–719" || creditScore === "Good") minScore = 680;
  else if (creditScore === "Fair 640-679" || creditScore === "Fair 640–679" || creditScore === "Fair") minScore = 640;
  else if (creditScore === "Poor below 640" || creditScore === "Poor") minScore = 580;

  // Fetch all offers — sorting is done in-process so we can apply the
  // paid-partner priority tier without a SQL CASE expression.
  const all = await db.select().from(lenderOffersTable);

  // Filter to lenders whose min credit score requirement ≤ user's score.
  // When no credit score is provided, return all offers.
  const filtered = minScore > 0
    ? all.filter((o) => o.minCreditScore <= minScore)
    : all;

  // Sort: paid partners first (isPaidPartner DESC), then by minRate ASC within each tier.
  const sorted = filtered.sort((a, b) => {
    if (a.isPaidPartner !== b.isPaidPartner) {
      return a.isPaidPartner ? -1 : 1; // paid partners bubble to top
    }
    return a.minRate - b.minRate;
  });

  const cleaned = sorted.map((o) => ({
    ...o,
    logoUrl: o.logoUrl ?? undefined,
    badgeLabel: o.badgeLabel ?? undefined,
  }));

  res.json(ListOffersResponse.parse(cleaned));
});

export default router;
