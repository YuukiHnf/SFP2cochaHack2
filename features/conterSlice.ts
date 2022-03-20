import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// 定義したいState
export type CounterState = {
  value: number;
};

// Stateの初期値
const initialState: CounterState = {
  value: 0,
};

// sliceの設定
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // reducerをここに定義する
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    // 引数が必要なとき
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectConunt = (state: RootState) => state.counter.value;

// exporting the reducer here, as we need to add this to the store
export default counterSlice.reducer;
