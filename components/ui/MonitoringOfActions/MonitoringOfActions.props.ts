import { IUserTableData } from "@/interfaces/users.interface";
import { Dispatch, SetStateAction } from "react";

export interface MonitoringOfActionsProps
  extends Pick<IUserTableData, "first_name" | "last_name" | "middle_name"> {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
