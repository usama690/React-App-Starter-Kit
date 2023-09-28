import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";

interface IAuthInitialState {
  user: IUser | null;
  isLoadingUser: boolean;
  token: string | null;
}

const initialState: IAuthInitialState = {
  user: null,
  isLoadingUser: false,
  token: localStorage.getItem("token"),
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: IAuthInitialState, { payload }) => {
      state.user = payload;
    },
    logout: (state: IAuthInitialState) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.getUserInfo.matchFulfilled,
        (state: IAuthInitialState, { payload }) => {
          state.user = payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getUserInfo.matchRejected,
        (state: IAuthInitialState) => {
          state.token = null;
          state.user = null;
        }
      );
  },
});

export const { logout, login } = slice.actions;

export default slice.reducer;