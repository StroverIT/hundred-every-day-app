import { AntDesign } from "@expo/vector-icons";
import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { configureGoogleSignIn } from "@/lib/googleSignIn/googleSignIn";
import {
  GoogleSignin as GoogleSigninFc,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

configureGoogleSignIn();

export const GoogleSignIn: FC = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSigninFc.hasPlayServices();
      const userInfo = await GoogleSigninFc.signIn();
      if (userInfo.idToken) {
        // if (data) router.replace("/(account)");
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error) {
      console.log("error catch", JSON.stringify(error));
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <div>
      <TouchableOpacity
        className="mt-10 bg-[#4267b2] items-center rounded-lg p-2 flex-row justify-center"
        onPress={signInWithGoogle}
      >
        <AntDesign
          name="google"
          size={24}
          color="black"
          className="text-white"
        />
        <Text className="text-white ml-8 font-bold">Google</Text>
      </TouchableOpacity>
    </div>
  );
};
