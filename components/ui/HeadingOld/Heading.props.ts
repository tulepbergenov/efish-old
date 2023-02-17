import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
  as: "h1" | "h2" | "h3";
  size: "lg" | "md" | "sm";
  uppercase?: boolean;
  center?: boolean;
  className?: string;
}
