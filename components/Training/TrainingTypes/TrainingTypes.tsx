import { FC } from "react";
import { Text, FlatList, Dimensions } from "react-native";
import { useTrainingContext } from "@/hooks/useTrainingContext/useTrainingContext";

const windowHeight = Dimensions.get("window").height;

export const TrainingTypes: FC = () => {
  const { trainingTypes } = useTrainingContext();

  if (trainingTypes.length === 0) return null;

  return (
    <FlatList
      data={trainingTypes}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Text>
          {item.name} {item.repetitions}
        </Text>
      )}
      contentContainerStyle={{ paddingBottom: 10 }}
      style={{ height: windowHeight * 1 }}
    />
  );
};
