import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string | null;
  email: string | null;
  isLoggedIn: boolean;
  name: string | null;
  createdAt?: string | null;
  firstTestStarted?: boolean;
  testStartTimestamp?: string | null;
  gender?: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  isLoggedIn: false,
  name: null,
  createdAt: null,
  firstTestStarted: false,
  testStartTimestamp: null,
  gender: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        name: string;
        createdAt: string;
        firstTestStarted?: boolean;
        gender?: string;
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
      state.createdAt = action.payload.createdAt || null;
      state.firstTestStarted = action.payload.firstTestStarted || false;
      state.testStartTimestamp = null;
      state.gender = action.payload.gender || null;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;
      state.name = null;
      state.createdAt = null;
      state.firstTestStarted = false;
      state.testStartTimestamp = null;
      state.gender = null;
    },
    setFirstTestStarted: (state, action: PayloadAction<boolean>) => {
      state.firstTestStarted = action.payload;
    },
    setTestStartTimestamp: (state, action: PayloadAction<string | null>) => {
      state.testStartTimestamp = action.payload;
    },
    setGender: (state, action: PayloadAction<string | null>) => {
      state.gender = action.payload;
    },
  },
});

export const { login, logout, setFirstTestStarted, setTestStartTimestamp } =
  userSlice.actions;
export default userSlice.reducer;
