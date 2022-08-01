import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchUserCount = createAsyncThunk("userCount/fetchUserCount", async () => {
  const userInfoRef = doc(db, "infos", "userInfo");
  const userInfoSnap = await getDoc(userInfoRef);
  if (userInfoSnap.exists()) return userInfoSnap.data().count;
});

interface UserInfoState {
  userCount: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: UserInfoState = {
  userCount: 0,
  loading: "idle",
};

export const userCountSlice = createSlice({
  name: "userCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCount.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserCount.fulfilled.type, (state, action: PayloadAction<number>) => {
        state.userCount = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchUserCount.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default userCountSlice.reducer;
