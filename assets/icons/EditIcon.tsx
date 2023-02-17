import { memo } from "react";
import { IconProps } from "./Icon.props";

const Icon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 15h6.75M12.375 2.625a1.591 1.591 0 112.25 2.25L5.25 14.25l-3 .75.75-3 9.375-9.375z"
      ></path>
    </svg>
  );
};

export default memo(Icon);
