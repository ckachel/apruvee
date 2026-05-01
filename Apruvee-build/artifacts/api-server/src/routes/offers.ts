import { Router, type IRouter } from "express";
import { db, lenderOffersTable } from "@workspace/db";
import { ListOffersQueryParams, ListOffersResponse } from "@workspace/api-zod";
import { gte, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/offers", async (req, res): Promise<void> => {
  const params = ListOffersQueryParams.safeParse(req.query);
  if (!params.success) {
    req.log.warn({ errors: params.error.message }, "Invalid offers query");
    res.status(400).json({ error: "Validation error" });
    return;
  }

  let query = db
    .select()
    .from(lenderOffersTable)
    .orderBy(asc(lenderOffersTable.minRate));

  const { creditScore } = params.data;

  let minScore = 0;
  if (creditScore === "Excellent 720+") minScore = 720;
  else if (creditScore === "Good 680-719" || creditScore === "Good 680–719") minScore = 680;
  else if (creditScore === "Fair 640-679" || creditScore === "Fair 640–679") minScore = 640;
  else if (creditScore === "Poor below 640") minScore = 580;

  const offers = await (minScore > 0
    ? db
        .select()
        .from(lenderOffersTable)
        .where(gte(lenderOffersTable.minCreditScore, 0))
        .orderBy(asc(lenderOffersTable.minRate))
    : query);

  const filtered = minScore > 0
    ? offers.filter(o => o.minCreditScore <= minScore)
    : offers;

  const cleaned = filtered.map(o => ({
    ...o,
    logoUrl: o.logoUrl ?? undefined,
    badgeLabel: o.badgeLabel ?? undefined,
  }));

  res.json(ListOffersResponse.parse(cleaned));
});

export default router;
