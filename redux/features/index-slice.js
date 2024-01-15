import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hostname: null,
  path: "verify/",
  isGenerate: false,
};

export const index = createSlice({
  name: "index",
  initialState,
  reducers: {
    setValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearValue: (state) => {
      return initialState;
    },
  },
});

export const { setValue, clearValue } = index.actions;
export default index.reducer;
