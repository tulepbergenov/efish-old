import { memo } from "react";

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clip0_2_4345)"
      >
        <path d="M7.5 13.75a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zM7.5 5v5M5 7.5h5"></path>
      </g>
      <defs>
        <clipPath id="clip0_2_4345">
          <path fill="currentColor" d="M0 0H15V15H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(Icon);
