import { configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./features/certificate-slice";
import indexReducer from "./features/index-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      certificate: certificateReducer,
      index: indexReducer,
    },
  });
};
