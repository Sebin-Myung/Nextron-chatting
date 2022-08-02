import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../pages/_app";
import { ChattingData } from "./chattingDataSlice";

export const fetchGroupChattingList = createAsyncThunk("/fetchGroupChattingList", async (currentUid: string) => {
  const result: GroupChattingData[] = [];
  const groupChattingRef = collection(db, "groupChatting");
  const groupChattingSnapshot = await getDocs(query(groupChattingRef, where("users", "array-contains", currentUid)));
  groupChattingSnapshot.forEach((groupChatting) => {
    result.push(groupChatting.data() as GroupChattingData);
  });
  result.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
  return result;
});

export interface GroupChattingData extends ChattingData {
  roomTitle: string;
  roomProfileImage: string;
}

interface GroupChattingListState {
  groupChattingList: GroupChattingData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: GroupChattingListState = {
  groupChattingList: [],
  loading: "idle",
};

export const groupChattingListSlice = createSlice({
  name: "groupChattingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupChattingList.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchGroupChattingList.fulfilled.type, (state, action: PayloadAction<GroupChattingData[]>) => {
        state.groupChattingList = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchGroupChattingList.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default groupChattingListSlice.reducer;
