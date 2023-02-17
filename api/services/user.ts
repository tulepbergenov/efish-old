import { ILoginData } from "@/interfaces/login.interface";
import { IUserData, IUserResponse } from "../../interfaces/user.interface";
import { AxiosResponse } from "axios";
import api from "..";
import { IUserRolesResponse } from "@/interfaces/user-roles.interface";

const login = (
  data: ILoginData
): Promise<AxiosResponse<IUserResponse, any>> => {
  const res = api.post("/login", data);

  return res;
};

const getUserData = (
  token: string | null
): Promise<AxiosResponse<IUserData, any>> => {
  const res = api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

const getUserRoles = (
  token?: string
): Promise<AxiosResponse<IUserRolesResponse, any>> => {
  const response = api.get("/user/role/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const editUser = (
  id: number,
  data: {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    iin_bin: string;
    avatar: any;
    password: string;
    role_id: number;
  },
  token: string
) => {
  const response = api.post(`/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const logout = (): Promise<AxiosResponse<any, any>> => {
  const res = api.post("/user/logout");

  return res;
};

export const AuthService = {
  login,
  getUserData,
  logout,
};

export const UserService = { getUserRoles, editUser };
