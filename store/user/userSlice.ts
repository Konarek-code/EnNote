import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string | null;
  email: string | null;
  isLoggedIn: boolean;
  name: string | null;
  createdAt?: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  isLoggedIn: false,
  name: null,
  createdAt: null,
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
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
      state.createdAt = action.payload.createdAt || null;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;
      state.name = null;
      state.createdAt = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
