import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  DateSchedule,
  Location,
  TaskType,
} from "../utils/firebase/FirebaseStore";

// 定義したいState
export type GuestState = {
  isActive: boolean;
  isGPS: boolean;
  location?: Location;
  tasks: TaskType[];
  timeSche: DateSchedule[];
};

// Stateの初期値
const initialState: GuestState = {
  isActive: false,
  isGPS: false,
  tasks: [] as TaskType[],
  timeSche: [],
};

type GuestStateOmitTasks = Omit<GuestState, "tasks">;

// sliceの設定
export const guestStateSlice = createSlice({
  name: "guestState",
  initialState,
  // reducerをここに定義する
  reducers: {
    guestSetterWithoutTasks: (
      state,
      action: PayloadAction<GuestStateOmitTasks>
    ) => ({
      ...action.payload,
      tasks: state.tasks,
    }),
    guestSetterTasks: (state, action: PayloadAction<TaskType[]>) => ({
      ...state,
      tasks: action.payload,
    }),
    cleanGuest: (state) => ({ ...initialState }),
  },
});

export const { guestSetterWithoutTasks, guestSetterTasks, cleanGuest } =
  guestStateSlice.actions;

export const selectAllGuestState = (state: RootState) => state.guestState;
export const selectGuestTaskState = (state: RootState) =>
  state.guestState.tasks;
export const selectGuestTimeScheduleState = (state: RootState) =>
  state.guestState.timeSche;

// exporting the reducer here, as we need to add this to the store
export default guestStateSlice.reducer;
