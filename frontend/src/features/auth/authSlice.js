import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage - user payload that contains
// vital user information, such as the JWT
const user = JSON.parse(localStorage.getItem("user"));

// Define the initial state
const initialState = {
  user: user ? user : null, // use user in local storage if exists
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User - Dispatched from Register component
// asyncThunk function (function that deals with backend & asynchronous data)
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      // return payload response from api
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Return the error message as the payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // Functions that define the logic required to change the state
  reducers: {
    // define a regular reducer to reset state to its default values
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  // handle actions based on the status of register (AsyncThunk) function
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// generate actions that correspond to reducer functions
export const { reset } = authSlice.actions;
// export reducer
export default authSlice.reducer;
