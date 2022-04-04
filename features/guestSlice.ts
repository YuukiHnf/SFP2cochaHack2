import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { DateSchedule, Location } from "../utils/firebase/FirebaseStore";

// 定義したいState
export type GuestState = {
  isActive: boolean;
  isGPS: boolean;
  location?: Location;
  taskIds: string[];
  timeSche: DateSchedule[];
};

// Stateの初期値
const initialState: GuestState = {
  isActive: false,
  isGPS: false,
  taskIds: [],
  timeSche: [],
};

// sliceの設定
export const guestStateSlice = createSlice({
  name: "guestState",
  initialState,
  // reducerをここに定義する
  reducers: {
    guestSetter: (state, action: PayloadAction<GuestState>) => ({
      ...action.payload,
    }),
    cleanGuest: (state) => ({ ...initialState }),
  },
});

export const { guestSetter, cleanGuest } = guestStateSlice.actions;

export const selectAllGuestState = (state: RootState) => state.guestState;
export const selectGuestTaskState = (state: RootState) =>
  state.guestState.taskIds;
export const selectGuestTimeScheduleState = (state: RootState) =>
  state.guestState.timeSche;

// exporting the reducer here, as we need to add this to the store
export default guestStateSlice.reducer;
