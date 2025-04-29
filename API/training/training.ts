import { TTrainingTypeSchema } from "@/types/Models/Training";
import { apiEndpoints } from "../config";

export const getTraining = async (token: string, selected: string) => {
  const response = await fetch(`${apiEndpoints.training}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      selected,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch training");
  }

  return response.json();
};

export const createTraining = async (
  token: string,
  training: Pick<TTrainingTypeSchema, "name" | "type">
) => {
  const response = await fetch(`${apiEndpoints.createTrainingType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(training),
  });

  if (!response.ok) {
    throw new Error("Failed to create training");
  }

  return response.json();
};
