import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminId: null,
  email: null,
  role: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const { admin } = action.payload;
      state.adminId = admin.adminId;
      state.email = admin.email;
      state.role = admin.role;
    },
    adminlogout: (state) => {
      state.adminId = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setAdmin, adminlogout } = adminSlice.actions;
export default adminSlice.reducer;
