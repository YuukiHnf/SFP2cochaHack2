import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  GuestInputType,
  PointingLocationType,
} from "../components/guest/GuestHome";
import { Location } from "../utils/firebase/FirebaseStore";

/**GuestもAdminも両方使うstate */
export type InputModeType = "ORIGINAL" | "ADD" | "EDIT" | "COPY" | "CHATINPUT";

const initGuestInput: GuestInputType = {
  commentText: "",
  pointerLocation: null,
};

// 定義したいState
export type UIHelperType = {
  chatTaskId: string;
  chatInput: GuestInputType; //ユーザのInput
  pointingLocation: PointingLocationType | null; //chatが指す場所
  InputMode: InputModeType;
};

// Stateの初期値
const initialState: UIHelperType = {
  chatTaskId: "",
  chatInput: initGuestInput,
  pointingLocation: null,
  InputMode: "ORIGINAL",
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
    setChatInputInit: (state, action: PayloadAction) => {
      return {
        ...state,
        chatInput: initGuestInput,
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
    setPointingLocationNULL: (state, action: PayloadAction) => {
      return {
        ...state,
        pointingLocation: null,
      };
    },
    setInputType: (state, action: PayloadAction<InputModeType>) => {
      return {
        ...state,
        InputMode: action.payload,
      };
    },
  },
});

export const {
  setChatTaskId,
  setChatInputLocation,
  setChatInputText,
  setPointingLocation,
  setPointingLocationNULL,
  setInputType,
  setChatInputInit,
} = UIHelperSlice.actions;

export const selectChatTaskId = (state: RootState) => state.uiHelper.chatTaskId;
export const selectChatInput = (state: RootState) => state.uiHelper.chatInput;
export const selectPointingLocations = (state: RootState) =>
  state.uiHelper.pointingLocation;
export const selectInputType = (state: RootState) => state.uiHelper.InputMode;

// exporting the reducer here, as we need to add this to the store
export default UIHelperSlice.reducer;
