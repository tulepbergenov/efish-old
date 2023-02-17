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
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      ></path>
    </svg>
  );
};

export default memo(Icon);
