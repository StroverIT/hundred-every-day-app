import { TUserSchema } from "./User";

export type TTrainingSchema = {
  title: string;
  description: string;
  duration: number;
  date: Date;
  type: TTrainingTypeSchema;
  user: TUserSchema["_id"];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

export type TTrainingTypeSchema = {
  name: string;
  type: "cardio" | "strength" | "flexibility" | "other";
  repetitions: number;
  _id: string;
};
