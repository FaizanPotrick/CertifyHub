import { configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./features/certificate-slice";
import indexReducer from "./features/index-slice";
import alertReducer from "./features/alert-slice";
import modalReducer from "./features/modal-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      certificate: certificateReducer,
      index: indexReducer,
      alerts: alertReducer,
      modal: modalReducer,
    },
  });
};
