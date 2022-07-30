import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface AlertDataProps {
  message: string;
  visibility?: boolean;
}

const initialState: AlertDataProps = {
  message: "",
  visibility: false,
};

export const alertDataSlice = createSlice({
  name: "alertData",
  initialState: initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.visibility = true;
    },
    setAlertVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
  },
});

export const setAlertWithTimeOut = (dispatch: Dispatch, message: string) => {
  dispatch(setAlertMessage(message));
  setTimeout(() => {
    dispatch(setAlertVisibility(false));
  }, 2000);
};

export const { setAlertMessage, setAlertVisibility } = alertDataSlice.actions;

export default alertDataSlice.reducer;
