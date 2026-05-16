import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

type Stack = "backend";

type Level =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

type Package =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export const Log = async (
  stack: Stack,
  level: Level,
  packageName: Package,
  message: string
) => {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    console.log("Log Created:", response.data);
  } catch (error: any) {
    console.error("Logging Failed:", error.message);
  }
};