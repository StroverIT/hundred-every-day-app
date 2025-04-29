import { getTraining } from "@/API/training/training";
import CreateTraining from "@/components/Training/CreateTraining";
import { TrainingTypes } from "@/components/Training/TrainingTypes/TrainingTypes";
import { defaultFormatDate } from "@/components/types/dates";
import { useAppSelector } from "@/components/types/generic";
import { TTrainingContext } from "@/hooks/useTrainingContext/types";
import { TrainingProvider } from "@/hooks/useTrainingContext/useTrainingContext";
import { TUserSchema } from "@/types/Models/User";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const currentDay = moment();

export default function index() {
  const user = useAppSelector(
    (state) => state.authentication.user
  ) as TUserSchema;

  const [selected, setSelected] = useState(
    currentDay.format(defaultFormatDate)
  );
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [trainingData, setTrainingData] =
    useState<TTrainingContext["trainingData"]>(null);
  const [trainingTypes, setTrainingTypes] = useState<
    TTrainingContext["trainingTypes"]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTraining(user.token, selected)
      .then((data) => {
        setTrainingData(data);
        setTrainingTypes(data.types);
      })
      .catch((error) => {
        console.log("error++", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selected]);

  return (
    <TrainingProvider
      trainingData={trainingData}
      setTrainingData={setTrainingData}
      trainingTypes={trainingTypes}
      setTrainingTypes={setTrainingTypes}
      selected={selected}
      setSelected={setSelected}
      isCalendarOpen={isCalendarOpen}
      setIsCalendarOpen={setCalendarOpen}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    >
      <SafeAreaView className="flex-1 mx-4 mt-14 h-full">
        <Button
          title="CALENDAR"
          onPress={() => setCalendarOpen(!isCalendarOpen)}
        />
        {isCalendarOpen && (
          <Calendar
            onDayPress={(day: any) => {
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
        <KeyboardAvoidingView
          className="flex-1 mt-4"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          {isLoading && <Text>Зарежда се...</Text>}
          <TrainingTypes />
          {!isLoading && <CreateTraining />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TrainingProvider>
  );
}
