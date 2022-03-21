import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { RootState } from "../app/store";
import {
  DateSchedule,
  OBJECTPARAM,
  PLACE,
  TaskBlock,
} from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type AdminState = {
  place: PLACE;
  timeSche: DateSchedule;
  taskBlock?: TaskBlock | null;
  objects: OBJECTPARAM[]; //後でかえる
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
  timeSche: { start: null, end: null },
  taskBlock: null,
  objects: [],
};

// sliceの設定
export const adminSlice = createSlice({
  name: "adminState",
  initialState,
  // reducerをここに定義する
  reducers: {
    adminSetter: (state, action: PayloadAction<AdminState>) => {
      //console.log(action.payload);
      return action.payload;
    },
    adminObjectSetter: (state, action: PayloadAction<OBJECTPARAM[]>) => {
      return {
        ...state,
        objects: action.payload,
      };
    },
    adminTaskSetter: (state, action: PayloadAction<TaskBlock>) => {},
  },
});

export const { adminSetter, adminObjectSetter } = adminSlice.actions;

export const selectAdminState = (state: RootState) => state.adminState;
export const selectAdminPlaceState = (state: RootState) =>
  state.adminState.place;
export const selectAdminObjects = (state: RootState) =>
  state.adminState.objects;
// exporting the reducer here, as we need to add this to the store
export default adminSlice.reducer;
