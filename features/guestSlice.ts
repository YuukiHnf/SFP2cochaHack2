import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// 定義したいState
export type GuestState = {
  isActive: boolean;
  isGPS: boolean;
  taskId: string;
};

// Stateの初期値
const initialState: GuestState = {
  isActive: false,
  isGPS: false,
  taskId: "",
};

// sliceの設定
export const guestStateSlice = createSlice({
  name: "guestState",
  initialState,
  // reducerをここに定義する
  reducers: {
    guestSetter: (state, action: PayloadAction<GuestState>) => {
      state.isActive = action.payload.isActive;
      state.isGPS = action.payload.isGPS;
      state.taskId = action.payload.taskId;
    },
    cleanGuest: (state) => {
      state = { ...initialState };
    },
  },
});

export const { guestSetter, cleanGuest } = guestStateSlice.actions;

export const selectAllGuestState = (state: RootState) => state.guestState;
export const selectTaskGuestState = (state: RootState) =>
  state.guestState.taskId;

// exporting the reducer here, as we need to add this to the store
export default guestStateSlice.reducer;
