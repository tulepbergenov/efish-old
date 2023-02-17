import { INewUserData } from "@/interfaces/create-user-data.interface";
import { IUserInfoResponse } from "@/interfaces/user-info.interface";
import { IUsersResponse } from "@/interfaces/users.interface";
import { AxiosResponse } from "axios";
import api from "..";

export const getUserList = (
  token: string | null
): Promise<AxiosResponse<IUsersResponse, undefined>> => {
  const res = api.get("/user/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getUserInfo = (
  id: string | number,
  token: string
): Promise<AxiosResponse<IUserInfoResponse, undefined>> => {
  const res = api.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

const createUser = (newUserData: INewUserData, token: string) => {
  const res = api.post("/user/create", newUserData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

const blockUser = (id: string | number, token: string) => {
  const res = api.post(`user/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const UsersService = {
  getUserList,
  createUser,
  getUserInfo,
  blockUser,
};
