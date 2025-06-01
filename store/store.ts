import { configureStore } from "@reduxjs/toolkit";

import testResultReducer from "./testResult.slicer";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    testResult: testResultReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
