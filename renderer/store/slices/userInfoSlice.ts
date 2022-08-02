import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchUserInfo = createAsyncThunk("userInfo/fetchUserInfo", async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) return userSnap.data();
});

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserInfoState {
  userInfo: UserInfo[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: UserInfoState = {
  userInfo: [],
  loading: "idle",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.userInfo = [];
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserInfo.fulfilled.type, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = [...state.userInfo, action.payload];
        state.loading = "succeeded";
      })
      .addCase(fetchUserInfo.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export const { resetUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
