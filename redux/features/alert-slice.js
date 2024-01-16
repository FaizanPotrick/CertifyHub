import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const alerts = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return [...state, action.payload];
    },
    clearAlert: (state) => {
      return initialState;
    },
    deleteAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, clearAlert, deleteAlert } = alerts.actions;
export default alerts.reducer;
