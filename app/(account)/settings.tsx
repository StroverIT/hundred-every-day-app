import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function settings() {
  const signOutHandler = async () => {
    await supabase.auth.signOut();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings</Text>
      <Button title="Sign Out" onPress={signOutHandler} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 60,
  },
});
