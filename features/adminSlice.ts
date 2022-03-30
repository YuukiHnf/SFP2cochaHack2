import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { RootState } from "../app/store";
import {
  DateSchedule,
  ObjectLocation,
  OBJECTPARAM,
  PLACE,
  TaskBlock,
} from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type AdminState = {
  place: PLACE;
  timeSche: DateSchedule;
  taskBlock?: TaskBlock[];
  initObjectLocations: ObjectLocation[];
  objects: Omit<OBJECTPARAM, "initLocation">[];
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
  taskBlock: [],
  initObjectLocations: [],
  objects: [],
};

// sliceの設定
export const adminSlice = createSlice({
  name: "adminState",
  initialState,
  // reducerをここに定義する
  reducers: {
    adminSetter: (
      state,
      action: PayloadAction<
        Omit<AdminState, "taskBlock" | "initObjectLocations" | "objects">
      >
    ) => {
      //console.log(action.payload);
      return {
        ...action.payload,
        taskBlock: state.taskBlock,
        initObjectLocations: state.initObjectLocations,
        objects: state.objects,
      };
    },
    adminObjectSetter: (state, action: PayloadAction<OBJECTPARAM[]>) => {
      return {
        ...state,
        objects: action.payload.map((obj) => ({
          id: obj.id,
          objectName: obj.objectName,
          iconUrl: obj.iconUrl,
          weight: obj.weight ?? undefined,
          semiIconUrl: obj.semiIconUrl,
          createAt: obj.createAt,
        })),
        initObjectLocations: action.payload.map(
          (obj) =>
            ({ location: obj.initLocation, objectId: obj.id } as ObjectLocation)
        ),
      };
    },
    adminTaskSetter: (state, action: PayloadAction<TaskBlock[]>) => {
      return {
        ...state,
        taskBlock: action.payload, //action.payload.filter((block) => !block.isInit),
      };
    },
  },
});

export const { adminSetter, adminObjectSetter, adminTaskSetter } =
  adminSlice.actions;

export const selectAdminState = (state: RootState) => state.adminState;
export const selectAdminPlaceState = (state: RootState) =>
  state.adminState.place;
export const selectAdminObjects = (state: RootState) =>
  state.adminState.objects;
export const selectAdminTaskBlock = (state: RootState) =>
  state.adminState.taskBlock;
export const selectAdminInitObjects = (state: RootState) =>
  state.adminState.initObjectLocations;
export const selectAdminTimeSche = (state: RootState) =>
  state.adminState.timeSche;
// exporting the reducer here, as we need to add this to the store
export default adminSlice.reducer;
