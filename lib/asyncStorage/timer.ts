import { NativeModules } from "react-native";

const { StorageModule } = NativeModules;

export const createTimer = (hour: string) => {
  try {
    let [hourValue, minuteValue] = hour.split(":");
    if (!minuteValue) minuteValue = "00";

    StorageModule.create("timer", `${hourValue}:${minuteValue}`);
  } catch (e) {
    return null;
  }
};

export const getTimer = async () => {
  try {
    let value;
    await StorageModule.get("timer")
      .then((res: string) => {
        value = res;
      })
      .catch(() => {
        value = null;
      });
      return value
  } catch {
    return null;
  }
};

export const updateTimer = (hour: string) => {
  try {
    let [hourValue, minuteValue] = hour.split(":");
    if (!minuteValue) minuteValue = "00";

    StorageModule.update("timer", `${hourValue}:${minuteValue}`);
  } catch (e) {
    return null;
  }
};
