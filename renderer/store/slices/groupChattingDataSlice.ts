import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { ChattingData } from "../../config/chattingData";
import { db } from "../../pages/_app";

export const fetchGroupChattingData = createAsyncThunk(
  "groupChattingData/fetchGroupChattingData",
  async (groupId: string) => {
    const groupChattingRef = doc(db, "groupChatting", groupId);
    const groupChattingSnap = await getDoc(groupChattingRef);
    if (groupChattingSnap.exists()) return groupChattingSnap.data() as GroupChattingData;
  },
);

export const getGroupChattingId = createAsyncThunk("groupChattingData/getGroupChattingId", async (users: string[]) => {
  const groupChattingRef = collection(db, "groupChatting");
  const groupChattingSnapshot = await getDocs(query(groupChattingRef, where("users", "in", [users])));
  return groupChattingSnapshot.empty ? null : (groupChattingSnapshot[0].data() as GroupChattingData).url;
});

export interface GroupChattingData extends ChattingData {
  roomTitle: string;
  roomProfileImage: string;
}

interface GroupChattingDataState {
  groupChattingData: GroupChattingData;
  loading: "idle" | "pending" | "succeeded" | "failed";
  groupChattingId: string | null;
  searchFinish: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: GroupChattingDataState = {
  groupChattingData: {
    roomTitle: "",
    roomProfileImage: "",
    url: "",
    users: [],
    messages: [],
    lastMessage: { uid: "", timestamp: 0, message: "" },
  },
  loading: "idle",
  groupChattingId: null,
  searchFinish: "idle",
};

export const groupChattingDataSlice = createSlice({
  name: "groupChattingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupChattingData.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchGroupChattingData.fulfilled.type, (state, action: PayloadAction<GroupChattingData>) => {
        state.groupChattingData.roomTitle = action.payload?.roomTitle;
        state.groupChattingData.roomProfileImage = action.payload?.roomProfileImage;
        state.groupChattingData.url = action.payload?.url;
        state.groupChattingData.users = action.payload?.users;
        state.groupChattingData.messages = action.payload?.messages.reverse();
        state.groupChattingData.lastMessage = action.payload?.lastMessage;
        state.loading = "succeeded";
      })
      .addCase(fetchGroupChattingData.rejected.type, (state) => {
        state.loading = "failed";
      })
      .addCase(getGroupChattingId.pending.type, (state) => {
        state.searchFinish = "pending";
      })
      .addCase(getGroupChattingId.fulfilled.type, (state, action: PayloadAction<string | null>) => {
        state.groupChattingId = action.payload;
        state.searchFinish = "succeeded";
      })
      .addCase(getGroupChattingId.rejected.type, (state) => {
        state.searchFinish = "failed";
      });
  },
});

export default groupChattingDataSlice.reducer;
