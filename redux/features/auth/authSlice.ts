import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state,action: PayloadAction<{user: string}>) => {
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.user = "";
    },
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;