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
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_2_4454)"
      >
        <path d="M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM11.25 6.75l-4.5 4.5M6.75 6.75l4.5 4.5"></path>
      </g>
      <defs>
        <clipPath id="clip0_2_4454">
          <path fill="currentColor" d="M0 0H18V18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(Icon);
