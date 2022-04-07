import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

/**GuestもAdminも両方使うstate */

// 定義したいState
export type UIHelperType = {
  chatTaskId: string;
};

// Stateの初期値
const initialState: UIHelperType = {
  chatTaskId: "",
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
  },
});

export const { setChatTaskId } = UIHelperSlice.actions;

export const selectChatTaskId = (state: RootState) => state.uiHelper.chatTaskId;

// exporting the reducer here, as we need to add this to the store
export default UIHelperSlice.reducer;
