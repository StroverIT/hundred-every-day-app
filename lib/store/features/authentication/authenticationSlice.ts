// src/features/example/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authentication = createSlice({
  name: "authentication",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, payload: any | object) => {
      state.user = payload.payload;
    },
  },
});

export const { setUser } = authentication.actions;

export default authentication.reducer;
