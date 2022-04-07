import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  GuestInputType,
  PointingLocationType,
} from "../components/guest/GuestHome";
import { Location } from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */

const initGuestInput: GuestInputType = {
  commentText: "",
  pointerLocation: null,
};

// 定義したいState
export type UIHelperType = {
  chatTaskId: string;
  chatInput: GuestInputType; //ユーザのInput
  pointingLocation: PointingLocationType | null; //chatが指す場所
};

// Stateの初期値
const initialState: UIHelperType = {
  chatTaskId: "",
  chatInput: initGuestInput,
  pointingLocation: null,
};

// sliceの設定
export const UIHelperSlice = createSlice({
  name: "UIHelper",
  initialState,
  // reducerをここに定義する
  reducers: {
    setChatTaskId: (state, action: PayloadAction<string>) => {
      return { ...state, chatTaskId: action.payload };
    },
    setChatInputLocation: (state, action: PayloadAction<Location>) => {
      return {
        ...state,
        chatInput: { ...state.chatInput, pointerLocation: action.payload },
      };
    },
    setChatInputText: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        chatInput: { ...state.chatInput, commentText: action.payload },
      };
    },
    setPointingLocation: (
      state,
      action: PayloadAction<PointingLocationType>
    ) => {
      return {
        ...state,
        pointingLocation: { ...action.payload },
      };
    },
  },
});

export const {
  setChatTaskId,
  setChatInputLocation,
  setChatInputText,
  setPointingLocation,
} = UIHelperSlice.actions;

export const selectChatTaskId = (state: RootState) => state.uiHelper.chatTaskId;
export const selectChatInput = (state: RootState) => state.uiHelper.chatInput;
export const selectPointingLocations = (state: RootState) =>
  state.uiHelper.pointingLocation;

// exporting the reducer here, as we need to add this to the store
export default UIHelperSlice.reducer;
