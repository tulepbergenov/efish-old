export interface IHeading {
  children: string;
  as: "h1" | "h2" | "h3";
  size: "lg" | "md" | "sm";
  url?: string;
  line?: boolean;
  uppercase?: boolean;
  className?: string;
}
