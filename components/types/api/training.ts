export type getTrainingType = {
  userId: string;
  selected: string;
  setTrainingData: (data: any) => void;
};

export type createTrainingType = {
  userId: string;
  selected: string;
};

export type updateTrainingType = {
  userId: string;
  selected: string;
  type: string;
  increment: number;
};
