import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import * as Haptics from "expo-haptics"; // for haptic feedback
import { Text, TouchableOpacity, View } from "react-native";
import { TimePickerProps } from "./types";

const TimePicker = ({
  showPicker,
  setShowPicker,
  submitTimerHandler,
}: TimePickerProps) => {
  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <View
      style={{
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                  overflow: "hidden",
                  borderColor: "blue",
                  color: "blue",
                }}
              >
                Change timer 🔔
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration: any) => {
          submitTimerHandler(formatTime(pickedDuration));
          setShowPicker(false);
        }}
        modalTitle="Change timer"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        use12HourPicker
        // supply your own custom click sound asset
        // clickSoundAsset={require("./assets/custom_click.mp3")}
        LinearGradient={LinearGradient}
        Haptics={Haptics}
        styles={{
          theme: "light",
        }}
      />
    </View>
  );
};

export default TimePicker;
