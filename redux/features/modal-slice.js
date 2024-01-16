import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  uid: "",
  name: "",
  sub_title: "",
  date: "",
  url: "",
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearModal: (state) => {
      return initialState;
    },
  },
});

export const { setModal, clearModal } = modal.actions;
export default modal.reducer;
