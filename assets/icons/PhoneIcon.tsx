import { memo } from "react";
import { IconProps } from "./Icon.props";

const PhoneIcon = ({ className, ...props }: IconProps) => {
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
        d="M48.584 37.365v6.625a4.418 4.418 0 01-4.815 4.417 43.702 43.702 0 01-19.057-6.78 43.062 43.062 0 01-13.25-13.25 43.703 43.703 0 01-6.78-19.146 4.417 4.417 0 014.395-4.814h6.625a4.417 4.417 0 014.416 3.798c.28 2.12.798 4.202 1.546 6.206a4.417 4.417 0 01-.994 4.66l-2.804 2.804a35.334 35.334 0 0013.25 13.25l2.804-2.805a4.416 4.416 0 014.66-.994 28.356 28.356 0 006.205 1.546 4.417 4.417 0 013.799 4.483z"
      ></path>
    </svg>
  );
};

export default memo(PhoneIcon);
