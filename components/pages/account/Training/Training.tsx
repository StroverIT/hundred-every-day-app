import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TrainingProps, typeOfValueCounter } from "./types";
import * as Burnt from "burnt";

export default function Training({
  typeOfTraining,
  currentReps,
  maxReps,
  updateValueHandler,
}: TrainingProps) {
  const [currentValue, setCurrentValue] = useState("10");
  const [incrementValue, setIncrementValue] = useState(1);
  const handleSubmit = () => {
    Burnt.toast({
      title: `Successfully updated ${typeOfTraining.toLocaleLowerCase()} to ${+currentValue + +currentReps}`, // required
      preset: "done", // or "error", "none", "custom"
      haptic: "none", // or "success", "warning", "error"
      duration: 2, // duration in seconds
      shouldDismissByDrag: true,
      from: "top", // "top" or "bottom"
    });
    
    updateValueHandler(typeOfTraining, currentValue);
  };

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
    <View style={styles.container}>
      
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

      <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between"}}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={[styles.changeValue, styles.topValue]}
            onPress={() =>
              changeValueHandler(incrementValue, typeOfValueCounter.plus)
            }
          >
            <Text style={styles.valueText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.changeValue, styles.bottomValue]}>
            <Text style={styles.valueText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.inputContainer}
            value={currentValue}
            keyboardType="numeric"
            onChangeText={(text) => setCurrentValue(text)}
          />
        </View>
        <View style={styles.submitBtn}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  changeValue: {
    position: "absolute",
    right: 0,
    width: 20,
    flex: 1,
    alignItems: "center",
    zIndex: 2,
  },
  valueText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },
  topValue: {
    top: 0,
    backgroundColor: "green",
    borderTopEndRadius: 10,
  },
  bottomValue: {
    bottom: 0,
    backgroundColor: "red",
    borderBottomEndRadius: 10,
  },
  inputContainer: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    width: 100,
    height: 50,
    borderColor: "gray",
    borderRadius: 10,
    fontSize: 20,
  },
  submitBtn: { marginLeft: 20, width: 100, marginTop: 5 },
});
