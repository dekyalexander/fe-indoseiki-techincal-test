import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
   username: string | null;
   email: string | null;
   id: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  username: Cookies.get("username") || null,
  email: Cookies.get("email") || null,
  id: Cookies.get("id") || null,
  isAuthenticated: !!Cookies.get("token"),
};

const auth_slices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; username: string; email: string;  id: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuthenticated = true;
      Cookies.set("token", action.payload.token, { expires: 7 }); // Simpan token selama 7 hari
      Cookies.set("username", action.payload.username);
      Cookies.set("email", action.payload.email);
      Cookies.set("id", action.payload.id); 
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("email");
      Cookies.remove("id");
    },
  },
});

export const { loginSuccess, logout } = auth_slices.actions;
export default auth_slices.reducer;
