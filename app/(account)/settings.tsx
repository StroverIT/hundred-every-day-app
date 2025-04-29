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
import TimePicker from "@/components/generic/TimePicker/TimePicker";

export default function settings() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("19:00");
  const [isTimerExisting, setIsTimerExisting] = useState(false);

  const [showPicker, setShowPicker] = useState(false);

  const toggleSwitch = async () => {
    if (!isPermissionGranted) await Notifications.requestPermissionsAsync();

    setIsPermissionGranted((previousState: boolean) => !previousState);
  };

  const signOutHandler = async () => {
    // Clear the user from the store
    // Send for logout for JWT token
    router.replace("/(tabs)");
  };

  const submitTimerHandler = async (time: string) => {
    if (isTimerExisting) updateTimer(time);
    else if (!isTimerExisting) createTimer(time);
    setCurrentTimer(time);
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
            <TimePicker
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              submitTimerHandler={submitTimerHandler}
            />

            <Text
              style={{
                fontSize: 17,
                paddingTop: 20,
              }}
            >
              Current timer: {currentTimer}
            </Text>
          </View>
        )}
      </View>
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
