import { apiEndpoints } from "../config";

export const register = async (email: string, password: string) => {
  try {
    const response = await fetch(apiEndpoints.register, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(apiEndpoints.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
