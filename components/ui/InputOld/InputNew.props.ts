import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputNewProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  textSize: "sm" | "md";
  border: boolean;
  showPassword?: boolean;
}
