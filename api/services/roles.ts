import { IRoleResponse } from "@/interfaces/roles.interface";
import { AxiosResponse } from "axios";
import api from "..";

const getRoles = (): Promise<AxiosResponse<IRoleResponse, any>> => {
  const res = api.get("/user/role/list");

  return res;
};

export const RoleService = {
  getRoles,
};
