import { createSlice } from "@reduxjs/toolkit";
import { appApis } from "../../services/api";

interface IAuthInitialState {
  user: IUser | null | any;
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
    setAuth: (state: IAuthInitialState, { payload }) => ({ ...state, ...payload }),
    logout: (state: IAuthInitialState) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        appApis.endpoints.getUserInfo.matchFulfilled,
        (state: IAuthInitialState, { payload }) => {
          state.user = payload.user;
        }
      )
      .addMatcher(
        appApis.endpoints.getUserInfo.matchRejected,
        (state: IAuthInitialState) => {
          localStorage.removeItem("token");
          state.token = null;
          state.user = null;
        }
      );
    builder.addMatcher(appApis.endpoints.login.matchFulfilled,
      (state: IAuthInitialState, { payload }) => {
        state.user = payload.user
        state.token = payload.token
      }
    ),
      builder.addMatcher(appApis.endpoints.logout.matchFulfilled,
        (state: IAuthInitialState) => {
          localStorage.removeItem("token");
          state.user = null;
          state.token = null;
        }
      )
  },
});

export const { logout, setAuth } = slice.actions;

export default slice.reducer;