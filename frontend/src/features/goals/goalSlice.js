import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";

// define intial application state
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  // functions that define logic for chaning goal state
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
