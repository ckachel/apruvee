import { Router } from "express";
import { db } from "@workspace/db";
import { postbacksTable } from "@workspace/db/schema";

const router = Router();

/**
 * GET /api/postback/leadstack
 *
 * Receives server-side conversion postbacks from Lead Stack Media (pdvportal.com).
 * Register in pdvportal postback manager as:
 *   https://www.apruvee.com/api/postback/leadstack?commission=[commission]&sub=[sub]&clickId=[sub2]
 *
 * Lead Stack macro tokens:
 *   [commission] → payout amount for this conversion
 *   [sub]        → traffic source label we passed (google | seo | bing | direct)
 *   [sub2]       → UUID click ID — matches back to the originating session
 */
router.get("/api/postback/leadstack", async (req, res) => {
  const { commission, sub, clickId } = req.query;

  // Respond 200 immediately — Lead Stack expects a fast acknowledgement.
  res.sendStatus(200);

  try {
    if (!clickId || typeof clickId !== "string") {
      console.warn("[postback/leadstack] Missing clickId — not recorded", req.query);
      return;
    }

    await db.insert(postbacksTable).values({
      partner: "leadstack",
      clickId,
      trafficSource: typeof sub === "string" ? sub : null,
      commission: typeof commission === "string" ? commission : null,
    });

    console.info("[postback/leadstack] Recorded conversion", { clickId, sub, commission });
  } catch (err) {
    console.error("[postback/leadstack] Failed to record postback", err);
  }
});

export default router;
