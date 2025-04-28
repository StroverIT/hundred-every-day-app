import { useState } from "react";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { setUser } from "@/lib/store/features/authentication/authenticationSlice";
import { register, login } from "@/API/auth";

type TUseAuth = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  signInWithEmail: () => Promise<void>;
  signUpWithEmail: () => Promise<void>;
};

export const useAuth = (): TUseAuth => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response) {
        dispatch(setUser(response));
        router.replace("/(account)");
      }
    } catch (error) {
      console.error("test+++", error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);

    try {
      const response = await register(email, password);

      if (response) {
        dispatch(setUser(response));
        router.replace("/(account)");
      }
    } catch (error) {
      console.error("test+++", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signInWithEmail,
    signUpWithEmail,
  };
};
