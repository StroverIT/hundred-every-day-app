import { Button } from "react-native";
import React from "react";
import { Text, TextInput, View } from "react-native";
// const GoogleSignIn = lazy(() => import("@/components/GoogleSignIn"));
import { styles } from "./styles";
import { useAuth } from "./Auth.hooks";

export const Auth = ({ isRegister }: { isRegister: boolean }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();

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
