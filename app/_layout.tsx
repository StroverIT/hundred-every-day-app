import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { useEffect } from "react";
import Session from "@/components/Layout/Session";
// Prevent the splash screen from auto-hiding before asset loading is complete.
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/lib/expo-notifications";
import { LogLevel, OneSignal } from "react-native-onesignal";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {


  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    registerForPushNotificationsAsync()
       
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize(process.env.EXPO_PUBLIC_SIGNAL_KEY as string);

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener("click", (event) => {
      console.log("OneSignal: notification clicked:", event);
    });

    
  }, []);
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Session />
    </Provider>
  );
}
