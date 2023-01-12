import axios from "axios";
import { ResponseType } from "./todolist-api";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/auth/",
  withCredentials: true,
  headers: {
    "API-KEY": "5e83c86a-1713-4894-b55e-b49e5d20fde8",
  },
});

export type AuthUserType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
type meResponseType = {
  id: number;
  email: string;
  login: string;
};

export const authApi = {
  me() {
    return instance.get<ResponseType<meResponseType>>("me");
  },
  login(data: AuthUserType) {
    return instance.post<ResponseType<{ userId: number }>>("login", data);
  },
  logout() {
    return instance.delete<ResponseType>("login");
  },
};
