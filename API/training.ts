import { trainingTypes } from "@/components/pages/account/Training/types";
import { DateWeekType, defaultFormatDate } from "@/components/types/dates";
import { supabase } from "@/lib/supabase";
import moment from "moment";
import {
  createTrainingType,
  getTrainingType,
  updateTrainingType,
} from "@/components/types/api/training";

export const getTraining = async ({
  userId,
  selected,
  setTrainingData,
}: getTrainingType) => {
  try {
    let { data: training } = await supabase
      .from("training")
      .select("*")
      // Filters
      .eq("created_at", selected)
      .eq("userId", userId);

    if (!training || training?.length === 0) {
      const res = await createTraining({ userId, selected });
      if (res) training = res;
    }

    if (training) {
      setTrainingData &&
        setTrainingData({
          [trainingTypes.pushUps]: {
            currentReps: training[0]?.pushUpsReps,
            maxReps: training[0]?.pushUpsMaxReps,
          },
          [trainingTypes.sitUps]: {
            currentReps: training[0]?.sitUpsReps,
            maxReps: training[0]?.sitUpsMaxReps,
          },
          [trainingTypes.crunches]: {
            currentReps: training[0]?.crunchesReps,
            maxReps: training[0]?.crunchesMaxReps,
          },
        });
    }
  } catch (e) {
    console.log("error", e);
  }
};

export const createTraining = async ({
  userId,
  selected,
}: createTrainingType) => {
  try {
    // // TODO: It's must if check current day is not finished yet, not to create for future days
    // // Example:
    // // It's 15 september and must not create for 16 september
    // const isFutureDay = moment(selected).isAfter(moment(), "day");
    // if (isFutureDay) return { error: "Future days are not allowed to create" };
    
    const dateCreated = moment(selected);
    const dateOfWeek = dateCreated.format("dddd");
    const isRestDay = dateOfWeek === DateWeekType.Sunday;

    const maxRepsToAdd = isRestDay ? 0 : 100;

    let createData = {
      userId: userId,

      pushUpsReps: 0,
      pushUpsMaxReps: maxRepsToAdd,

      sitUpsReps: 0,
      sitUpsMaxReps: maxRepsToAdd,

      crunchesReps: 0,
      crunchesMaxReps: maxRepsToAdd,

      isTrainingFullyFinished: false,
      isRestDay: false,
      created_at: selected,
    };

    if (isRestDay) createData = { ...createData, isRestDay: true };

    const { data: getPreviousTraining, error: getPreviousTrainingError } =
      await supabase
        .from("training")
        .select(
          `
        pushUpsReps,
        sitUpsReps,
        crunchesReps,
        pushUpsMaxReps,
        sitUpsMaxReps,
        crunchesMaxReps
        `
        )
        .eq("userId", userId)
        .eq(
          "created_at",
          moment(selected).subtract(1, "days").format(defaultFormatDate)
        );

    // @ts-ignore
    if (getPreviousTraining?.length > 0 && getPreviousTraining) {
      const previousTrainingFound = getPreviousTraining[0];

      // Push ups
      createData.pushUpsMaxReps +=
        previousTrainingFound?.pushUpsMaxReps -
        previousTrainingFound.pushUpsReps;
      // Sit ups
      createData.sitUpsMaxReps =
        previousTrainingFound?.sitUpsMaxReps - previousTrainingFound.sitUpsReps;

      // Crunches
      createData.crunchesMaxReps =
        previousTrainingFound?.crunchesMaxReps -
        previousTrainingFound.crunchesReps;
    }

    const { data } = await supabase
      .from("training")
      .insert([createData])
      .select();

    if (data) return data;
    return [];
  } catch (e) {
    console.log("error", e);
  }
};

export const updateTraining = async ({
  userId,
  selected,
  type,
  increment,
}: updateTrainingType) => {
  try {
    const { data, error } = await supabase
      .from("training")
      .update({ [type]: increment })
      .eq("userId", userId)
      .eq("created_at", selected)
      .select();
  } catch (e) {
    console.log("error:", e);
  }
};
