import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import offersRouter from "./offers";
import postbackRouter from "./postback";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(offersRouter);
router.use(postbackRouter);

export default router;
