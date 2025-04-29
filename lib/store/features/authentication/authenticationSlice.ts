import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserSchema } from "@/types/Models/User";

export const authentication = createSlice({
  name: "authentication",
  initialState: {
    user: null as TUserSchema | null,
  },
  reducers: {
    setUser: (state, payload: PayloadAction<TUserSchema>) => {
      state.user = payload.payload;
    },
  },
});

export const { setUser } = authentication.actions;

export default authentication.reducer;
