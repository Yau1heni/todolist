import {ResponseType} from './todolist-api';
import {instance} from './config';

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
    return instance.get<ResponseType<meResponseType>>("auth/me");
  },
  login(data: AuthUserType) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
