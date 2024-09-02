import { setUser } from "@/lib/store/features/authentication/authenticationSlice";
import { supabase } from "@/lib/supabase";
import { Stack, router, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
export default function Session() {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user as any || null));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user as any || null));
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(account)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
