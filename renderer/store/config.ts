import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import alertDataSlice from "./slices/alertDataSlice";
import chattingDataSlice from "./slices/chattingDataSlice";
import groupChattingDataSlice from "./slices/groupChattingDataSlice";
import groupChattingListSlice from "./slices/groupChattingListSlice";
import personalChattingListSlice from "./slices/personalChattingListSlice";
import userInfoSlice from "./slices/userInfoSlice";
import userListSlice from "./slices/userListSlice";

export const store = configureStore({
  reducer: {
    alertData: alertDataSlice,
    userList: userListSlice,
    userInfo: userInfoSlice,
    chattingData: chattingDataSlice,
    personalChattingList: personalChattingListSlice,
    groupChattingData: groupChattingDataSlice,
    groupChattingList: groupChattingListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
