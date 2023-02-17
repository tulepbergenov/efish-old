import { Dispatch, SetStateAction } from "react";

export interface BlockUserProps {
  role: string;
  id: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
