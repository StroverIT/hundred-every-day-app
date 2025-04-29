import { FC } from "react";
import { Text, SectionList, Dimensions, View } from "react-native";
import { useTrainingContext } from "@/hooks/useTrainingContext/useTrainingContext";
import TrainingType from "../TrainingType";
const windowHeight = Dimensions.get("window").height;

export const TrainingTypes: FC = () => {
  const { trainingTypes } = useTrainingContext();

  if (trainingTypes.length === 0) return null;

  const sections = trainingTypes.map((item) => ({
    title: item.type,
    data: [item],
  }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => <TrainingType item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="font-bold text-xl uppercase">{title}</Text>
      )}
      contentContainerStyle={{ paddingBottom: 10 }}
      style={{ height: windowHeight * 1 }}
    />
  );
};
