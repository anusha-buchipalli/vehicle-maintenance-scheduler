import express from "express";
import cors from "cors";

import schedulerRoutes
from "./routes/scheduler.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Vehicle Scheduler Running",
  });

});

app.use(
  "/api/schedule",
  schedulerRoutes
);

export default app;