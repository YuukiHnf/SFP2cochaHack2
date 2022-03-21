import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PLACE } from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type AdminState = {
  place: PLACE;
  taskBlock?: null;
  objects: null; //後でかえる
};

// Stateの初期値
const initMapState: PLACE = {
  zoom: 15,
  center: {
    lat: 43.08014911998283,
    lng: 141.34006823521992,
  },
  tilt: 0,
  heading: 90,
};
const initialState: AdminState = {
  place: initMapState,
  taskBlock: null,
  objects: null,
};

// sliceの設定
export const adminSlice = createSlice({
  name: "adminState",
  initialState,
  // reducerをここに定義する
  reducers: {
    adminSetter: (state, action: PayloadAction<AdminState>) => {},
  },
});

export const { adminSetter } = adminSlice.actions;

export const selectBasicInfo = (state: RootState) => state.basicInfo;
export const selectTeamId = (state: RootState) => state.basicInfo.teamId;

// exporting the reducer here, as we need to add this to the store
export default adminSlice.reducer;
