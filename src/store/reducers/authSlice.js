import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser")) ?? null;

const initialState = {
  currentUser: currentUser,
  isAuthorizated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, username } = action.payload;

      const users = JSON.parse(localStorage.getItem("users")) ?? [];

      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        state.error = "Пользователь с таким email уже существует";
      } else {
        const currentUser = { email, password, username };
        users.push(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));

        state.currentUser = currentUser;
        state.isAuthorizated = true;
        state.error = null;
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      const users = JSON.parse(localStorage.getItem("users")) ?? [];

      const currentUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!currentUser) {
        state.error = "Неверная почта или пароль";
      } else {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        state.currentUser = currentUser;
        state.isAuthorizated = true;
        state.error = null;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthorizated = false;
      state.error = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("favoritesData");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
