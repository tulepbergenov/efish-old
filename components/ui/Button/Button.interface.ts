import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  textSize?: "sm" | "md";
  bg?: "blue" | "white" | "green" | "black";
  icon?: ReactNode;
}
