import { FC } from "react";
import { Text, ScrollView } from "react-native";
import { useTrainingContext } from "@/hooks/useTrainingContext/useTrainingContext";

export const TrainingTypes: FC = () => {
  const { trainingTypes } = useTrainingContext();
  return (
    <ScrollView>
      {trainingTypes.map((training) => (
        <Text key={training._id}>
          {training.name} {training.repetitions}
        </Text>
      ))}
    </ScrollView>
  );
};
