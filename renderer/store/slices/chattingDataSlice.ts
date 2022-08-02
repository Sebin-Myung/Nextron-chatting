import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchChattingData = createAsyncThunk("chattingData/fetchChattingData", async (uid_uid: string) => {
  const chattingRef = doc(db, "chatting", uid_uid);
  const chattingSnap = await getDoc(chattingRef);
  if (chattingSnap.exists()) return chattingSnap.data();
});

export interface MessageData {
  uid: string;
  timestamp: number;
  message: string;
}

export interface ChattingData {
  users: string[];
  messages: MessageData[];
  lastMessage: MessageData;
}

interface ChattingDataState {
  chattingData: ChattingData;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: ChattingDataState = {
  chattingData: { users: [], messages: [], lastMessage: { uid: "", timestamp: 0, message: "" } },
  loading: "idle",
};

export const chattingDataSlice = createSlice({
  name: "chattingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChattingData.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchChattingData.fulfilled.type, (state, action: PayloadAction<ChattingData>) => {
        state.chattingData.users = action.payload?.users;
        state.chattingData.messages = action.payload?.messages.reverse();
        state.chattingData.lastMessage = action.payload?.lastMessage;
        state.loading = "succeeded";
      })
      .addCase(fetchChattingData.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default chattingDataSlice.reducer;
