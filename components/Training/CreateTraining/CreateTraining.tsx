import { FC, useRef, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import CreateTrainingDropdown from "../CreateTrainingDropdown";
import { TCreateTrainingDropdownRef } from "../CreateTrainingDropdown/types";
import { CONTENT } from "./consts";
import { defaultTrainingSelection } from "../CreateTrainingDropdown/consts";
import { useAppSelector } from "@/components/types/generic";
import { TUserSchema } from "@/types/Models/User";
import { createTraining } from "@/API/training/training";
import { TTrainingTypeSchema } from "@/types/Models/Training";
import { useTrainingContext } from "@/hooks/useTrainingContext/useTrainingContext";

export const CreateTraining: FC = () => {
  const { setTrainingTypes, trainingData } = useTrainingContext();
  const user = useAppSelector(
    (state) => state.authentication.user
  ) as TUserSchema;

  const dropdownRef = useRef<TCreateTrainingDropdownRef>(null);
  const [name, setName] = useState("");

  const submitHandler = async () => {
    const selectedTraining = dropdownRef.current?.getSelectedTraining();

    if (selectedTraining === defaultTrainingSelection || !selectedTraining)
      return;

    const submitData = {
      name,
      type: selectedTraining,
      _id: trainingData?._id,
    };

    const trainingType = await createTraining(
      user.token,
      submitData as Pick<TTrainingTypeSchema, "name" | "type">
    );

    if (trainingType) {
      setTrainingTypes((prev) => [...prev, trainingType]);
    }
  };

  return (
    <View>
      <CreateTrainingDropdown ref={dropdownRef} />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={CONTENT.placeholderText}
      />
      <Button title={CONTENT.submitButtonLabel} onPress={submitHandler} />
    </View>
  );
};
