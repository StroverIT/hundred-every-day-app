import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Alert, Button } from "react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Auth({ isRegister }: { isRegister: boolean }) {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "377510755690-fd6ohgfaigu0o45hcu4aar1q7mok5h19.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error) {
      console.log("error", error);
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
    <View>
      <Text style={styles.title}>{isRegister ? "Register" : "Log in"}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
      />
      {!isRegister && <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>}
      {isRegister && <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>}
      <TouchableOpacity
        style={styles.socialMediaButton}
        onPress={signInWithGoogle}
      >
        <AntDesign
          name="google"
          size={24}
          color="black"
          style={styles.socialMediaIcon}
        />
        <Text style={styles.socialMediaText}>Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  input: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#2894f4",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  submitButtonText: {
    color: "white",
  },
  socialMediaButton: {
    marginTop: 40,
    backgroundColor: "#4267b2",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialMediaIcon: {
    color: "white",
  },
  socialMediaText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
