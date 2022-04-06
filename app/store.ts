import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

// reducerを追加する
import guestSlice from "../features/guestSlice";
import basicInfoSlice from "../features/basicInfoSlice";
import counterSlice from "../features/conterSlice";
import adminSlice from "../features/adminSlice";
import setObjectSlice from "../features/setObjectSlice";

const rootReducer = combineReducers({
  // reducerを追加する
  // admin&guest の state
  basicInfo: basicInfoSlice,
  // guest用
  guestState: guestSlice,
  // admin用
  adminState: adminSlice,
  setObjects: setObjectSlice,
});

export const store = configureStore({
  reducer: {
    // reducerを追加する
    // admin&guest の state
    basicInfo: basicInfoSlice,
    // guest用
    guestState: guestSlice,
    // admin用
    adminState: adminSlice,
    setObjects: setObjectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
