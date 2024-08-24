import { Tabs, useRouter } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { setUser } from "@/lib/store/features/authentication/authenticationSlice";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import "react-native-reanimated";

import { Session } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
export default function TabLayout() {
    const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user));
    });
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-add" : "person-add-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}