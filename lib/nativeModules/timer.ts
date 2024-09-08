import { NativeModules } from "react-native";

const { StorageModule } = NativeModules;

export const createTimer = (time: string) => {
  try {
    StorageModule.create("timer", time);
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

export const updateTimer = (timer: string) => {
  try {
    StorageModule.update("timer", timer);
  } catch (e) {
    return null;
  }
};
