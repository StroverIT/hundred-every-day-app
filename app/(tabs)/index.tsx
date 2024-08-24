import AntDesign from "@expo/vector-icons/AntDesign";

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TextInputExample = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMediaButton}>
        <AntDesign name="google" size={24} color="black" style={styles.socialMediaIcon}/>
        <Text style={styles.socialMediaText}>Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
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
  }
});

export default TextInputExample;
