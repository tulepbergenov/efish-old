import { memo } from "react";
import { IconProps } from "./Icon.props";

const EmailIcon = ({ className, ...props }: IconProps) => {
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
        d="M26.5 35.333a8.833 8.833 0 100-17.666 8.833 8.833 0 000 17.666z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M35.333 17.667v11.041a6.625 6.625 0 0013.25 0V26.5a22.083 22.083 0 10-8.657 17.534"
      ></path>
    </svg>
  );
};

export default memo(EmailIcon);
