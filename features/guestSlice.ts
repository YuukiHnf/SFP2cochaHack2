import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// 定義したいState
export type GuestState = {
  username: string;
  avatarUrl?: string;
  isActive: boolean;
  isGPS: boolean;
  taskId: string;
  teamId: string;
};

// Stateの初期値
const initialState: GuestState = {
  username: "unKnown",
  avatarUrl: "",
  isActive: false,
  isGPS: false,
  taskId: "",
  teamId: "",
};

// sliceの設定
export const guestStateSlice = createSlice({
  name: "guestState",
  initialState,
  // reducerをここに定義する
  reducers: {
    login: (
      state,
      action: PayloadAction<
        Omit<GuestState, "isActive" | "isGPS" | "teamId" | "taskId">
      >
    ) => {
      state = {
        username: action.payload.username,
        avatarUrl: action.payload.avatarUrl ?? "",
        isActive: true,
        isGPS: false,
        taskId: "",
        teamId: "",
      };
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = guestStateSlice.actions;

export const selectAllGuestState = (state: RootState) => state.guestState;
export const selectTaskGuestState = (state: RootState) =>
  state.guestState.taskId;

// exporting the reducer here, as we need to add this to the store
export default guestStateSlice.reducer;
