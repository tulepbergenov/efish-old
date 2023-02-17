import { memo } from "react";
import { IconProps } from "./Icon.props";

const LogoIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      fill="none"
      viewBox="0 0 70 70"
      className={className}
      {...props}
    >
      <rect
        width="70"
        height="70"
        fill="url(#paint0_linear_2_1199)"
        rx="10"
      ></rect>
      <mask
        id="mask0_2_1199"
        style={{ maskType: "alpha" }}
        width="70"
        height="70"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <rect
          width="70"
          height="70"
          fill="url(#paint1_linear_2_1199)"
          rx="10"
        ></rect>
      </mask>
      <g mask="url(#mask0_2_1199)">
        <path
          fill="#C1DFFF"
          d="M4.45 44.241C-8.793 51.312-11 60.909-11 60.909V70H92V55.858s-8.093-25.76-28.693-11.617c-20.6 14.142-15.45 1.01-29.428 2.525C19.9 48.282 17.693 37.17 4.45 44.241z"
        ></path>
      </g>
      <path
        fill="#52A5FC"
        d="M35.392 10.239c-15.339.352-21.716 9.374-22.988 13.841 3.795 6.496 15.407 6.978 20.738 6.408 3.13 2.2 7.532 2.445 8.804 1.565 1.017-.704-.848-2.543-1.908-3.375 6.359-3.375 12.375-3.032 14.722 2.348 1.878 4.304-2.38 7.206-4.744 8.119-10.878.47-12.912 1.728-12.57 2.299.752 2.758 7.14 4.243 9.342 5.33 3.404 1.683 2.07 4.778.978 6.115-6.016 5.624-5.95 6.162-5.722 6.651.939 2.387 6.75-1.353 9.537-3.521 9.078-7.943 9.912-17.852 9.195-21.814-.156-11.269-8.804-18.619-13.108-20.885 2.387-1.252 2.723-2.054 2.593-2.299-4.451-3.423-9.538-.293-11.201-.587-1.33-.234-3-.228-3.668-.195z"
      ></path>
      <circle cx="24.338" cy="18.797" r="1.761" fill="#fff"></circle>
      <path
        fill="#52A5FC"
        d="M22.284 47.596c13.734-4.93 20.95.032 22.841 3.13-.235 3.052-5.739 5.739-8.461 6.7-.9 1.253-2.625 2.446-3.375 2.886-6.456 2.857-4.712.114-3.033-1.614-5.752.235-10.744-2.608-12.52-4.06-6.692-4.93-8.3-15.031-8.267-19.466.245-9.586 3.473-2.2 3.913-.733.35 1.167 3.734.994 5.527.733 4.93-.352 2.641 2.201.88 3.522-6.769 7.043-1.157 8.869 2.495 8.902z"
      ></path>
      <circle cx="36.663" cy="49.904" r="1.174" fill="#fff"></circle>
      <defs>
        <linearGradient
          id="paint0_linear_2_1199"
          x1="-1.817"
          x2="67.542"
          y1="1.817"
          y2="64.924"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#D8EBFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2_1199"
          x1="-1.817"
          x2="67.542"
          y1="1.817"
          y2="64.924"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#D8EBFF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(LogoIcon);
