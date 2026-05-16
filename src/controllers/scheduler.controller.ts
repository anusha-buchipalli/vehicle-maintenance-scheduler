import { Request, Response } from "express";

import {
  fetchDepots,
  fetchTasks,
} from "../services/externalApi.service";

import { optimizeTasks } from "../utils/scheduler";

import { Log } from "../middleware/logger";

export const scheduleTasks = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const depotId = Number(req.params.depotId);

    console.log("DEPOT ID:", depotId);

    // Fetch depots
    const depots = await fetchDepots();

    console.log("DEPOTS:", depots);

    // Find matching depot
    const depot = depots.find(
      (d: any) =>
        d.id === depotId ||
        d.ID === depotId
    );

    // Validate depot
    if (!depot) {

      await Log(
        "backend",
        "error",
        "controller",
        "Depot not found"
      );

      return res.status(404).json({
        success: false,
        message: "Depot not found",
      });
    }

    console.log("SELECTED DEPOT:", depot);

    // Fetch vehicle tasks
    const tasks = await fetchTasks();

    console.log("TASKS COUNT:", tasks.length);

    // Get mechanic hours safely
    const mechanicHours =
      depot.MechanicHours ||
      depot.mechanicHours;

    // Run optimization
    const result = optimizeTasks(
      tasks,
      mechanicHours
    );

    console.log(
      "OPTIMIZATION RESULT:",
      result
    );

    // Success log
    await Log(
      "backend",
      "info",
      "controller",
      "Task scheduling completed successfully"
    );

    return res.status(200).json({
      success: true,
      depotId,
      mechanicHours,
      totalImpact: result.totalImpact,
      totalDuration: result.totalDuration,
      selectedTasks: result.selectedTasks,
    });

  } catch (error: any) {

    console.log("SCHEDULER ERROR:");

    console.log(
      error?.response?.data ||
      error?.message ||
      error
    );

    await Log(
      "backend",
      "error",
      "controller",
      "Scheduling failed"
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:
        error?.response?.data ||
        error?.message ||
        "Unknown Error",
    });
  }
};