import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./types";

export const authentication = createSlice({
  name: "authentication",
  initialState: {
    user: null as TUser | null,
  },
  reducers: {
    setUser: (state, payload: PayloadAction<TUser>) => {
      state.user = payload.payload;
    },
  },
});

export const { setUser } = authentication.actions;

export default authentication.reducer;
