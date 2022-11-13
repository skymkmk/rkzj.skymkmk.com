import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface currentDataState {
  currentIndex: number;
}

const initialState: currentDataState = {
  currentIndex: -1,
};

export const currentDataSlice = createSlice({
  name: "currentData",
  initialState,
  reducers: {
    updateCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});
export const { updateCurrentIndex } = currentDataSlice.actions;
export const selectCurrentData = (state: RootState) => state.currentData.currentIndex;
export default currentDataSlice.reducer;
