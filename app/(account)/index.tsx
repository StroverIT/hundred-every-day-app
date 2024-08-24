import Training from "@/components/pages/account/Training/Training";
import { trainingTypes } from "@/components/pages/account/Training/types";
import moment from "moment";
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function index() {
  const [selected, setSelected] = useState(moment().format("YYYY-MM-DD"));
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
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Toggle calendar"
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
      <Training
        typeOfTraining={trainingTypes.pushUps}
        currentReps={trainingData[trainingTypes.pushUps].currentReps}
        maxReps={trainingData[trainingTypes.pushUps].maxReps}
      />
      <Training
        typeOfTraining={trainingTypes.sitUps}
        currentReps={trainingData[trainingTypes.sitUps].currentReps}
        maxReps={trainingData[trainingTypes.sitUps].maxReps}
      />
        <Training
        typeOfTraining={trainingTypes.crunches}
        currentReps={trainingData[trainingTypes.crunches].currentReps}
        maxReps={trainingData[trainingTypes.crunches].maxReps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 60,
  },
});
