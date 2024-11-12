import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userId: null, email: null, role: null, accessToken: null },
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      const { token } = action.payload;
      state.userId = user.userId;
      state.token = token;
      state.email = user.email;
      state.role = user.role;
    },

    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
