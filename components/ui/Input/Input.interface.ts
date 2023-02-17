import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

export interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fShowHide?: boolean;
  icon?: ReactNode;
}
