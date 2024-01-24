import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheck: false,
  uid: "",
  name: "",
  sub_title: "",
  date: "",
};

export const certificate = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearState: (state) => {
      return initialState;
    },
  },
});

export const { setState, clearState } = certificate.actions;
export default certificate.reducer;
