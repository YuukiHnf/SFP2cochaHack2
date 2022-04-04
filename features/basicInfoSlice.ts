import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type BasicInfo = {
  userId: string;
  username: string;
  teamId: string;
  avaterUrl?: string;
};

// Stateの初期値
const initialState: BasicInfo = {
  userId: "",
  teamId: "",
  username: "",
  avaterUrl: "",
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
      state.username = action.payload.username;
      state.avaterUrl = action.payload.avaterUrl;
    },
    basicInfologout: (state) => ({
      ...initialState,
    }),
  },
});

export const { login, basicInfologout } = basicInfoSlice.actions;

export const selectBasicInfo = (state: RootState) => state.basicInfo;
export const selectTeamId = (state: RootState) => state.basicInfo.teamId;

// exporting the reducer here, as we need to add this to the store
export default basicInfoSlice.reducer;
