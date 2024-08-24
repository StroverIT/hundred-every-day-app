import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { TrainingProps, typeOfValueCounter } from "./types";

export default function Training({
  typeOfTraining,
  currentReps,
  maxReps,
}: TrainingProps) {
  const [currentValue, setCurrentValue] = useState("10");
  const handleSubmit = () => {};

  const changeValueHandler = (value: number, type: typeOfValueCounter) => {
    if (type === typeOfValueCounter.minus) {
      setCurrentValue((prev) => {
        if (parseInt(prev) - value < 0) {
          return "1";
        }
        return (parseInt(prev) - value).toString();
      });
    } else if (type === typeOfValueCounter.plus) {
      setCurrentValue((prev) => {
        return (parseInt(prev) + value).toString();
      });
    }
  };
  return (
    <View
      style={{
        marginTop: 20,

        paddingTop: 5,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {typeOfTraining}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {currentReps} / {maxReps}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Button
            title="-"
            onPress={() => changeValueHandler(1, typeOfValueCounter.minus)}
          />
          <TextInput
            style={{ borderWidth: 1, padding: 5, flex: 1 }}
            value={currentValue}
            onChangeText={(text) => setCurrentValue(text)}
          />
          <Button
            title="+"
            onPress={() => changeValueHandler(1, typeOfValueCounter.plus)}
          />
        </View>
        <Button title="Submit" color={"green"} onPress={handleSubmit} />
      </View>
    </View>
  );
}
