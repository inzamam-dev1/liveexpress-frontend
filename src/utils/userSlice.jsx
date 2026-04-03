import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    initializeUser: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.isLoggedIn = true;
        state.user = JSON.parse(savedUser);
      }
    },
  },
});

export const { loginUser, logoutUser, initializeUser } = userSlice.actions;
export default userSlice.reducer;
