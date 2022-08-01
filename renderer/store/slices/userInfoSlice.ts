import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchUserInfo = createAsyncThunk("userInfo/fetchUserInfo", async () => {
  const userRef = doc(db, "users");
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) return userSnap.data();
  else return initialState.userInfo;
});

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserInfoState {
  userInfo: UserInfo;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserInfoState = {
  userInfo: { uid: "", email: "", nickname: "", profileImage: "" },
  loading: "idle",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserInfo.fulfilled.type, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchUserInfo.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default userInfoSlice.reducer;
