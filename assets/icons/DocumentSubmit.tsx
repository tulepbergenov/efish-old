import { memo } from "react";
import { IconProps } from "./Icon.props";

const Icon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 22h14a2 2 0 002-2V7.5L14.5 2H6a2 2 0 00-2 2v4"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14 2v6h6M2 15h10M9 18l3-3-3-3"
      ></path>
    </svg>
  );
};

export default memo(Icon);
