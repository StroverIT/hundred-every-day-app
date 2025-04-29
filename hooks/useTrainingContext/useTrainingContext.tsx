import React, { createContext, useContext, FC } from "react";
import { TTrainingContext, TTrainingProviderProps } from "./types";

const TrainingContext = createContext<TTrainingContext | undefined>(undefined);

export const TrainingProvider: FC<TTrainingProviderProps> = ({
  children,
  isCalendarOpen,
  isLoading,
  selected,
  setIsCalendarOpen,
  setIsLoading,
  setSelected,
  setTrainingData,
  trainingData,
  trainingTypes,
  setTrainingTypes,
}) => {
  return (
    <TrainingContext.Provider
      value={{
        trainingData,
        setTrainingData,
        selected,
        setSelected,
        isCalendarOpen,
        setIsCalendarOpen,
        isLoading,
        setIsLoading,
        trainingTypes,
        setTrainingTypes,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTrainingContext = (): TTrainingContext => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error(
      "useTrainingContext must be used within a TrainingProvider"
    );
  }
  return context;
};
