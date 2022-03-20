import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type BasicInfo = {
  userId: string;
  teamId: string;
};

// Stateの初期値
const initialState: BasicInfo = {
  userId: "",
  teamId: "",
};

// sliceの設定
export const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
  // reducerをここに定義する
  reducers: {
    login: (state, action: PayloadAction<BasicInfo>) => {
      //console.log(action.payload);
      state.teamId = action.payload.teamId;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = basicInfoSlice.actions;

export const selectBasicInfo = (state: RootState) => state.basicInfo;

// exporting the reducer here, as we need to add this to the store
export default basicInfoSlice.reducer;
