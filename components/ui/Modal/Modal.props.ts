import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
