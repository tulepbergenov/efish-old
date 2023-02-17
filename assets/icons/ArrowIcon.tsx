import { memo } from "react";
import { IconProps } from "./Icon.props";

const ArrowIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="8"
      fill="none"
      viewBox="0 0 15 8"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.5 1l6 6 6-6"
      ></path>
    </svg>
  );
};

export default memo(ArrowIcon);
