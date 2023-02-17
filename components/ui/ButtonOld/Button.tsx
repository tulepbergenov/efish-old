import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import classNames from "classnames";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      icon,
      positionIcon = "right",
      appearance = "blue",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.btn,
          {
            [styles.icon]: icon,
            [styles.icon_left]: positionIcon === "left",
            [styles.icon_right]: positionIcon === "right",
            [styles.btn_blue]: appearance === "blue",
            [styles.btn_white]: appearance === "white",
          },
          className
        )}
        {...props}
      >
        {icon ? (
          <>
            {positionIcon == "left" && <>{icon}</>}
            <span>{children}</span>
            {positionIcon == "right" && <>{icon}</>}
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
