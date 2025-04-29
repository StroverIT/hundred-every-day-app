import { TTrainingTypeSchema } from "@/types/Models/Training";

export const defaultTrainingSelection = "Моля изберете тренировка";

export const trainingTypes: (
  | TTrainingTypeSchema["type"]
  | typeof defaultTrainingSelection
)[] = [defaultTrainingSelection, "cardio", "strength", "flexibility", "other"];
