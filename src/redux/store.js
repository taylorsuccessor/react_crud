import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./slices/Global/globalSlice";


export const store = configureStore({
  reducer: {
    //  reducers will be here
    global: globalReducer,
  },
  devTools: true,
});
