import { TTrainingTypeSchema } from "@/types/Models/Training";
import { TTrainingSchema } from "@/types/Models/Training";
import { ReactNode } from "react";

export type TSetTrainingData = (data: TTrainingContext["trainingData"]) => void;
export type TSetTrainingTypes = (
  data: TTrainingContext["trainingTypes"]
) => void;

export type TTrainingContext = {
  trainingData: TTrainingSchema | null;
  setTrainingData: TSetTrainingData;
  trainingTypes: TTrainingTypeSchema[];
  setTrainingTypes: TSetTrainingTypes;
  selected: string;
  setSelected: (selected: string) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (isCalendarOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export type TTrainingProviderProps = TTrainingContext & {
  children: ReactNode;
};
