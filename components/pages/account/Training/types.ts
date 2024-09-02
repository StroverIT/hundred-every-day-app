export type updateValueHandlerType = (type: trainingTypes, value: string) => void;

export type TrainingProps = {
  maxReps: number;
  currentReps: number;
  typeOfTraining: trainingTypes;
  updateValueHandler: updateValueHandlerType;
};

export enum trainingTypes {
  pushUps = "Push Ups",
  sitUps = "Sit Ups",
  crunches = "Crunches",
}

export const trainingTypesUpdate = {
  [trainingTypes.pushUps]: "pushUpsReps",
  [trainingTypes.sitUps]: "sitUpsReps",
  [trainingTypes.crunches]: "crunchesReps",
}

export enum typeOfValueCounter  {
  minus = "minus",
  plus = "plus",
}
