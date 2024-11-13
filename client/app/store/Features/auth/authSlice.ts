"use client";

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: null,
  signUpUserEmail: null,
  guestId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state, action) => {
      state.token = null;
      state.signUpUserEmail = null;
    },
    setSignUpUserEmail: (state, action) => {
      const { email } = action.payload;
      state.signUpUserEmail = email;
    },
    removeSignUpUserEmail: (state, action) => {
      state.signUpUserEmail = null;
    },
    setGuestId: (state, action) => {
      const { guestId } = action.payload;
      state.guestId = guestId;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setSignUpUserEmail,
  removeSignUpUserEmail,
  setGuestId,
} = authSlice.actions;
export default authSlice.reducer;
