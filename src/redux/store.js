import { configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./features/certificate-slice";
import alertReducer from "./features/alert-slice";
import modalReducer from "./features/modal-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      certificate: certificateReducer,
      alerts: alertReducer,
      modal: modalReducer,
    },
  });
};
