import { InputProps } from "./Input.props";
import classNames from "classnames";
import styles from "./Input.module.css";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, border = true, customPaddingX = false, ...props }, ref) => {
    return (
      <input
        className={classNames(
          styles.input,
          {
            [styles.input_border]: border === true,
            [styles.input_px]: customPaddingX === false,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
