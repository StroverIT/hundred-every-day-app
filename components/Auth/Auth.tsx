import { Button } from "react-native";
import React, { lazy, useState } from "react";
import { Text, TextInput, View } from "react-native";
// const GoogleSignIn = lazy(() => import("@/components/GoogleSignIn"));
import { styles } from "./styles";

export const Auth = ({ isRegister }: { isRegister: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    // if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    // if (error) Alert.alert(error.message);
    // if (session) router.replace("/(account)");
    setLoading(false);
  }

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
        secureTextEntry={true}
      />
      {!isRegister && (
        <View style={[styles.verticallySpaced]} className="mt-10">
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
      )}
      {isRegister && (
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      )}
      {/* <GoogleSignIn /> */}
    </View>
  );
};
