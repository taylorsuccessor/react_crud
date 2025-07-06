import { createSlice } from "@reduxjs/toolkit";
import initialState from "./globalInitialState";
import globalActions from "./globalActions";

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: globalActions,
});

export const {
  setState,
} = globalSlice.actions;

export default globalSlice.reducer;
