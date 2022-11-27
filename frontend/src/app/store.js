import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// setup the global store object
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
