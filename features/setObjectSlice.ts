import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { SetObjectType } from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */

// 定義したいState
// Stateの初期値
const initialState: SetObjectType[] = [];

// sliceの設定
export const basicInfoSlice = createSlice({
  name: "setObjects",
  initialState,
  // reducerをここに定義する
  reducers: {
    setSetObject: (state, action: PayloadAction<SetObjectType[]>) =>
      action.payload,
  },
});

export const { setSetObject } = basicInfoSlice.actions;

export const selectSetObjects = (state: RootState) => state.setObjects;

// exporting the reducer here, as we need to add this to the store
export default basicInfoSlice.reducer;
