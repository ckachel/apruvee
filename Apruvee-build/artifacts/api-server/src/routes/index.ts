import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import offersRouter from "./offers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(offersRouter);

export default router;
