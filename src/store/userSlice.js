import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  users: [], // all users list (for admin)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.users = [];
    },
    // ✅ set entire user list (for getAllUsers API)
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    // ✅ add new user to list (after addUser API)
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
    },
    // ✅ delete user by id
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },
    // ✅ update user (after edit API)
    updateUserSuccess: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((u) => u._id === updatedUser._id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
  },
});

export const {
  login,
  logout,
  setUsers,
  addUserSuccess,
  deleteUserSuccess,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
