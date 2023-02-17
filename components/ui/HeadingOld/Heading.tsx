import { createElement } from "react";
import { HeadingProps } from "./Heading.props";
import styles from "./Heading.module.css";
import classNames from "classnames";

export const Heading = ({
  children,
  as,
  uppercase = false,
  center = false,
  size,
  className,
}: HeadingProps) => {
  return createElement(
    as,
    {
      className: classNames(styles.heading, className, {
        [styles.heading_lg]: size === "lg",
        [styles.heading_md]: size === "md",
        [styles.heading_sm]: size === "sm",
        [styles.heading_center]: center === true,
        [styles.heading_uppercase]: uppercase === true,
      }),
    },
    children
  );
};
