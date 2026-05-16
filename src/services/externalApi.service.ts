import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "http://4.224.186.213/evaluation-service";

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

export const fetchDepots = async () => {
  const response = await axios.get(
    `${BASE_URL}/depots`,
    { headers }
  );

  return response.data.depots;
};

export const fetchTasks = async () => {
  const response = await axios.get(
    `${BASE_URL}/vehicles`,
    { headers }
  );

  return response.data.vehicles;
};