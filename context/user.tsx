import { createContext } from "react";
import { IUserContext } from "./user.props";

export const UserContext = createContext<IUserContext>({
  userData: undefined,
  setUserData: () => {},
  users: undefined,
  setUsers: () => {},
  token: "",
  setToken: () => {},
  roles: [],
  setRoles: () => {},
  isUsersLoading: false,
  setIsUsersLoading: () => {},
});
