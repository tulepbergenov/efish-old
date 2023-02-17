import { memo } from "react";
import { IconProps } from "./Icon.props";

const LocationIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="53"
      height="53"
      fill="none"
      viewBox="0 0 53 53"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M46.375 22.084c0 15.458-19.875 28.708-19.875 28.708S6.625 37.542 6.625 22.083a19.875 19.875 0 1139.75 0z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M26.5 28.709a6.625 6.625 0 100-13.25 6.625 6.625 0 000 13.25z"
      ></path>
    </svg>
  );
};

export default memo(LocationIcon);
