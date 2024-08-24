export type TrainingProps = {
  maxReps: number;
  currentReps: number;
  typeOfTraining: trainingTypes;
};

export enum trainingTypes {
  pushUps = "Push Ups",
  sitUps = "Sit Ups",
  crunches = "Crunches",
}

export enum typeOfValueCounter  {
  minus = "minus",
  plus = "plus",
}
