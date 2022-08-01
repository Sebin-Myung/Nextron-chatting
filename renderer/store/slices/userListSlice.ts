import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchUserList = createAsyncThunk("userList/fetchUserList", async () => {
  const result = [];
  const usersRef = collection(db, "users");
  const userSnapshot = await getDocs(query(usersRef, orderBy("nickname")));
  userSnapshot.forEach((user) => {
    result.push(user.data());
  });
  return result;
});

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserListState {
  userList: UserInfo[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserListState = {
  userList: [],
  loading: "idle",
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserList.fulfilled.type, (state, action: PayloadAction<UserInfo[]>) => {
        state.userList = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchUserList.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default userListSlice.reducer;
