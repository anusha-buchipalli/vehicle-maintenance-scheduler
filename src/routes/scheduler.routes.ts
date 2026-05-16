import express from "express";

import { scheduleTasks }
from "../controllers/scheduler.controller";

const router = express.Router();

router.get(
  "/:depotId",
  scheduleTasks
);

export default router;