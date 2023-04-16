import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
interface GlobalState {
  searchKey: string;
}

const initialState: GlobalState = {
  searchKey: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    }
  },
});

export const { setSearchKey } = globalSlice.actions;

export const globalSelector = (state: RootState) => state.global;

export default globalSlice.reducer;
