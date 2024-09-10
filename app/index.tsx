import { useAppSelector } from "@/components/types/generic";
import { Redirect } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function index() {
  const { user } = useAppSelector((state) => state.authentication);

  if (user) {
    return <Redirect href="/(account)/" />;
  }
  if (!user) {
    return <Redirect href="/(tabs)/" />;
  }

  return (
    <Image
      style={{ width: "100%", height: "100%" }}
      source={require("@/assets/images/splash-screen-1.png")}
    />
  );
}
