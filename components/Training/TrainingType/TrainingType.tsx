import { FC } from "react";
import { Text, View } from "react-native";
import { TTrainingTypeProps } from "./types";

export const TrainingType: FC<TTrainingTypeProps> = ({ item }) => {
  return (
    <View>
      <Text>
        name: {item.name} | reps: {item.repetitions}
      </Text>
    </View>
  );
};
