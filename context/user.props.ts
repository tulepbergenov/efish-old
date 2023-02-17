import { IUserData, IUserRole } from "@/interfaces/user.interface";
import { IUserTableData } from "@/interfaces/users.interface";
import { ReactNode } from "react";

export interface IUserContext {
  userData: IUserData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
  users: IUserTableData[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<IUserTableData[] | undefined>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  roles: IUserRole[];
  setRoles: React.Dispatch<React.SetStateAction<IUserRole[]>>;
  isUsersLoading: boolean;
  setIsUsersLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserProviderProps {
  children: ReactNode;
}
