import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Picker } from "@react-native-picker/picker";
import { trainingTypes } from "./consts";
import { TCreateTrainingDropdownRef } from "./types";

export const CreateTrainingDropdown = forwardRef<TCreateTrainingDropdownRef>(
  ({}, ref) => {
    const [selectedType, setSelectedType] = useState(trainingTypes[0]);

    useImperativeHandle(ref, () => ({
      getSelectedTraining: () => selectedType,
    }));

    return (
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        {trainingTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
    );
  }
);
