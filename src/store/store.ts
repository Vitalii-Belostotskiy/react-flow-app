import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";
import { flowReducer } from "./flowSlice";
import { loadState, saveState } from "../utils/localStorage";
import { CustomRootState } from "../types/types";

// Load previously saved state from localStorage
// 'as CustomRootState | undefined' is a type assertion for TypeScript
const preloadedState = loadState() as CustomRootState | undefined;
export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
  preloadedState,
});

// Subscribe to store changes to persist state to localStorage
// Using throttle to limit how often we save to localStorage
// Throttle to maximum once per second (1000ms)
// This prevents performance issues from frequent localStorage writes
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// TypeScript type definitions for better type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
