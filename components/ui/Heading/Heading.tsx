import classNames from "classnames";
import Link from "next/link";
import { createElement } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IHeading } from "./Heading.interface";
import styles from "./Heading.module.css";

export const Heading = ({
  as,
  children,
  url,
  size,
  line = false,
  uppercase = false,
  className,
}: IHeading) => {
  if (url) {
    return createElement(
      "div",
      {
        className: classNames(styles.wrapper, className),
      },
      createElement(
        Link,
        {
          href: url,
          className: styles.link,
        },
        createElement(IoIosArrowBack, {
          className: styles.icon,
        })
      ),
      createElement(
        as,
        {
          className: classNames(styles.heading, {
            [styles.heading_uppercase]: uppercase === true,
            [styles.heading_sm]: size === "sm",
            [styles.heading_md]: size === "md",
            [styles.heading_lg]: size === "lg",
            [styles.heading_line]: line === true,
          }),
        },
        children
      )
    );
  }

  return createElement(
    as,
    {
      className: classNames(
        styles.heading,
        {
          [styles.heading_uppercase]: uppercase === true,
          [styles.heading_sm]: size === "sm",
          [styles.heading_md]: size === "md",
          [styles.heading_lg]: size === "lg",
          [styles.heading_line]: line === true,
        },
        className
      ),
    },
    children
  );
};
