import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TestResultState {
  score: number | null;
  total: number | null;
}

const initialState: TestResultState = {
  score: null,
  total: null,
};

const testResultSlice = createSlice({
  name: "testResult",
  initialState,
  reducers: {
    setTestResult: (
      state,
      action: PayloadAction<{ score: number; total: number }>
    ) => {
      state.score = action.payload.score;
      state.total = action.payload.total;
    },
    clearTestResult: (state) => {
      state.score = null;
      state.total = null;
    },
  },
});

export const { setTestResult, clearTestResult } = testResultSlice.actions;
export default testResultSlice.reducer;
