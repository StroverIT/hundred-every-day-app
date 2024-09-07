import { supabase } from "@/lib/supabase";
import { Input } from "@rneui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import { createTimer, getTimer, updateTimer } from "@/lib/nativeModules/timer";

const defaultTimerValue = "10:00";

export default function settings() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("19:00");
  const [isTimerChanger, setTimerChanger] = useState(false);
  const [hour, setHour] = useState(defaultTimerValue);
  const [prevHour, setPrevHour] = useState(defaultTimerValue);
  const [isTimerExisting, setIsTimerExisting] = useState(false);

  const toggleSwitch = async () => {
    if (!isPermissionGranted) await Notifications.requestPermissionsAsync();

    setIsPermissionGranted((previousState) => !previousState);
  };

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    router.replace("/(tabs)");
  };

  const submitTimerHandler = async () => {

    if (isTimerExisting) updateTimer(hour);
    else if (!isTimerExisting) createTimer(hour)
    
    setCurrentTimer(hour);
    setHour(defaultTimerValue);
    setTimerChanger(false);
  };

  const cancelTimerHandler = async () => {
    setHour(defaultTimerValue);
    setTimerChanger(false);
  };

  const onChangeHandler = (text: string) => {
    let newText = text;
    if (newText.length == 1) {
      const newTextToNumber = +newText;
      if (
        newTextToNumber < 10 &&
        newTextToNumber != 0 &&
        newTextToNumber != 1
      ) {
        newText = "0" + newText.toString();
      }
    }

    if (newText.length == 2 && prevHour[2] != ":") {
      newText = newText + ":";
    }

    setHour(newText.replace(".", ":"));
  };

  useEffect(() => {
    const initial = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus === "granted") {
        setIsPermissionGranted(true);
        const timer = await getTimer();
        if (timer) {
          setCurrentTimer(timer);
          setIsTimerExisting(true);
        }
      }
    };

    initial();
  }, []);

  useEffect(() => {
    setPrevHour(hour);
  }, [hour]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          gap: 10,
          marginBottom: 10,
        }}
      >
        <Button title="Sign Out" onPress={signOutHandler} />
        <View
          style={{
            flexDirection: "row", // Align items in a row
            alignItems: "center", // Center items vertically
            justifyContent: "space-between", // Distribute space evenly
            gap: 10, // Add some space between the elements
          }}
        >
          {/* TODO: Must be show when is denied */}
          <Text>Notifications:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPermissionGranted ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPermissionGranted}
          />
        </View>
        {isPermissionGranted && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                width: "40%",
              }}
            >
              <Button
                title="Set new timer"
                onPress={() =>
                  setTimerChanger((previousState) => !previousState)
                }
              />
            </View>
            <Text>Current timer: {currentTimer}</Text>
          </View>
        )}
      </View>

      {isTimerChanger && (
        <View style={styles.mt10}>
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Timer format 20:00
          </Text>
          <Input
            label="Set hour"
            placeholder="0"
            keyboardType="numeric"
            value={hour}
            onChangeText={onChangeHandler}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              title="Set timer"
              color={"green"}
              onPress={submitTimerHandler}
            />
            <Button title="Cancel" color={"red"} onPress={cancelTimerHandler} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 60,
  },
  mt10: {
    marginTop: 10,
  },
});
