// import { getTraining, updateTraining } from "@/API/training";
import Training from "@/components/pages/account/Training/Training";
import {
  trainingTypes,
  trainingTypesUpdate,
  updateValueHandlerType,
} from "@/components/pages/account/Training/types";
import { defaultFormatDate } from "@/components/types/dates";
import { useAppSelector } from "@/components/types/generic";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const currentDay = moment();

export default function index() {
  const { user } = useAppSelector((state: any) => state.authentication) || {};
  const [selected, setSelected] = useState(
    currentDay.format(defaultFormatDate)
  );
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [trainingData, setTrainingData] = useState({
    [trainingTypes.pushUps]: {
      currentReps: 0,
      maxReps: 0,
    },
    [trainingTypes.sitUps]: {
      currentReps: 0,
      maxReps: 0,
    },
    [trainingTypes.crunches]: {
      currentReps: 0,
      maxReps: 0,
    },
  });

  const isFutureDay = moment(selected).isAfter(currentDay, "day");

  const isTrainingFinished = Object.values(trainingData).every(
    (training) => training.currentReps >= training.maxReps
  );

  const updateValueHandler: updateValueHandlerType = (type, increment) => {
    const newValue = parseInt(increment) + trainingData[type].currentReps;

    // updateTraining({
    //   userId: user.id,
    //   selected,
    //   type: trainingTypesUpdate[type],
    //   increment: newValue,
    // });

    setTrainingData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        currentReps: newValue,
      },
    }));
  };

  useEffect(() => {
    // !isFutureDay &&
    // getTraining({
    //   userId: user.id,
    //   selected,
    //   setTrainingData,
    // });
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="CALENDAR"
        onPress={() => setCalendarOpen(!isCalendarOpen)}
      />

      {isCalendarOpen && (
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      )}
      {isFutureDay && (
        <Text style={styles.showUpText}>
          Cannot create data for future date
        </Text>
      )}

      {!isTrainingFinished && !isFutureDay && (
        <>
          <Training
            typeOfTraining={trainingTypes.pushUps}
            currentReps={trainingData[trainingTypes.pushUps].currentReps}
            maxReps={trainingData[trainingTypes.pushUps].maxReps}
            updateValueHandler={updateValueHandler}
          />
          <Training
            typeOfTraining={trainingTypes.sitUps}
            currentReps={trainingData[trainingTypes.sitUps].currentReps}
            maxReps={trainingData[trainingTypes.sitUps].maxReps}
            updateValueHandler={updateValueHandler}
          />
          <Training
            typeOfTraining={trainingTypes.crunches}
            currentReps={trainingData[trainingTypes.crunches].currentReps}
            maxReps={trainingData[trainingTypes.crunches].maxReps}
            updateValueHandler={updateValueHandler}
          />
        </>
      )}
      {isTrainingFinished && !isFutureDay && (
        <Text style={styles.showUpText}>
          You finished the training for today. Congrats!
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 60,
  },
  showUpText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
