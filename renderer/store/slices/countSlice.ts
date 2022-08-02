import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/_app";

export const fetchCount = createAsyncThunk("count/fetchCount", async () => {
  const countRef = doc(db, "infos", "counts");
  const countSnap = await getDoc(countRef);
  if (countSnap.exists()) return countSnap.data();
});

export interface CountData {
  groupChattingCount: number;
}

interface CountState {
  count: CountData;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: CountState = {
  count: { groupChattingCount: 0 },
  loading: "idle",
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending.type, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCount.fulfilled.type, (state, action: PayloadAction<CountData>) => {
        state.count = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchCount.rejected.type, (state) => {
        state.loading = "failed";
      });
  },
});

export default countSlice.reducer;
