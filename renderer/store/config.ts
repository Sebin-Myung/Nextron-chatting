import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import alertDataSlice from "./slices/alertDataSlice";
import countSlice from "./slices/countSlice";
import groupChattingListSlice from "./slices/groupChattingListSlice";
import userInfoSlice from "./slices/userInfoSlice";
import userListSlice from "./slices/userListSlice";

export const store = configureStore({
  reducer: {
    alertData: alertDataSlice,
    userList: userListSlice,
    userInfo: userInfoSlice,
    groupChattingList: groupChattingListSlice,
    count: countSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
