import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// reducerを追加する
import counterReducer from "../features/conterSlice";

export const store = configureStore({
  reducer: {
    // reducerを追加する
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
