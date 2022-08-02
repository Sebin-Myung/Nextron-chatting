import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../pages/_app";
import { ChattingData } from "./chattingDataSlice";

export const fetchPersonalChattingList = createAsyncThunk(
  "personalChattingList/fetchPersonalChattingList",
  async (currentUid: string) => {
    const result: ChattingData[] = [];
    const personalChattingRef = collection(db, "chatting");
    const personalChattingSnapshot = await getDocs(
      query(personalChattingRef, where("users", "array-contains", currentUid)),
    );
    personalChattingSnapshot.forEach((personalChatting) => {
      result.push(personalChatting.data() as ChattingData);
    });
    result.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
    return result;
  },
);

interface PersonalChattingListState {
  personalChattingList: ChattingData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: PersonalChattingListState = {
  personalChattingList: [],
  loading: "idle",
};

export const personalChattingListSlice = createSlice({
  name: "personalChattingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalChattingList.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPersonalChattingList.fulfilled.type, (state, action: PayloadAction<ChattingData[]>) => {
        state.personalChattingList = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchPersonalChattingList.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default personalChattingListSlice.reducer;
