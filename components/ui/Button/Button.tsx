import { forwardRef } from "react";
import { IButton } from "./Button.interface";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, type, icon, textSize = "md", bg = "blue" }, ref) => {
    if (icon) {
      return (
        <button
          ref={ref}
          type={type}
          className={classNames(
            styles.btn,
            styles.btn_icon,
            {
              [styles.btn_textSm]: textSize === "sm",
              [styles.btn_textMd]: textSize === "md",
              [styles.btn_bgBlue]: bg === "blue",
              [styles.btn_bgWhite]: bg === "white",
              [styles.btn_bgGreen]: bg === "green",
              [styles.btn_bgBlack]: bg === "black",
            },
            className
          )}
        >
          <span>{children}</span>
          {icon}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classNames(
          styles.btn,
          {
            [styles.btn_textSm]: textSize === "sm",
            [styles.btn_textMd]: textSize === "md",
            [styles.btn_bgBlue]: bg === "blue",
            [styles.btn_bgWhite]: bg === "white",
            [styles.btn_bgGreen]: bg === "green",
            [styles.btn_bgBlack]: bg === "black",
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);
