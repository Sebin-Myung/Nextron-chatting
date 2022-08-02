import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";
import { GroupChattingData } from "./groupChattingListSlice";

export const fetchGroupChattingData = createAsyncThunk(
  "groupChattingData/fetchGroupChattingData",
  async (groupId: string) => {
    const groupChattingRef = doc(db, "groupChatting", groupId);
    const groupChattingSnap = await getDoc(groupChattingRef);
    if (groupChattingSnap.exists()) return groupChattingSnap.data();
  },
);

interface GroupChattingDataState {
  groupChattingData: GroupChattingData;
  loading: "idle" | "pending" | "succeeded" | "failed";
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
      });
  },
});

export default groupChattingDataSlice.reducer;
