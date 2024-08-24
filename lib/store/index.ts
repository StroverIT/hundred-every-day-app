// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from '@/lib/store/features/authentication/authenticationSlice';
export const store = configureStore({
  reducer: {
    example: authenticationSlice,
  },
});