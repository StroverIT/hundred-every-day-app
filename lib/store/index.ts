// src/store/index.js
import authenticationSlice from "@/lib/store/features/authentication/authenticationSlice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // Optional: blacklist specific reducers you don't want to persist
  // blacklist: ['someReducer']
  // Optional: whitelist specific reducers to persist
  // whitelist: ['user', 'cart']
};

const rootReducer = combineReducers({
  authentication: authenticationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
