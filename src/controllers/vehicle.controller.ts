import { Request, Response } from "express";
import { vehicles } from "../data/vehicle.data";
import { Vehicle } from "../models/vehicle.model";
import { Log } from "../middleware/logger";

export const addVehicle = async (
  req: Request,
  res: Response
) => {
  try {

    const vehicle: Vehicle = {
      id: Date.now().toString(),
      ...req.body,
    };

    vehicles.push(vehicle);

    await Log(
      "backend",
      "info",
      "controller",
      "Vehicle added successfully"
    );

    res.status(201).json({
      success: true,
      data: vehicle,
    });

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Error adding vehicle"
    );

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getVehicles = async (
  req: Request,
  res: Response
) => {
  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Fetched all vehicles"
    );

    res.status(200).json({
      success: true,
      data: vehicles,
    });

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Error fetching vehicles"
    );

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};