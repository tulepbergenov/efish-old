import { ContainerProps } from "./Container.props";
import styles from "./Container.module.css";
import classNames from "classnames";

export const Container = ({
  children,
  className,
  width = "lg",
  ...props
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.container_sm]: width === "sm",
          [styles.container_lg]: width === "lg",
          [styles.container_xl]: width === "xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
