import { forwardRef, useState } from "react";
import { IInput } from "./Input.interface";
import styles from "./Input.module.css";
import classNames from "classnames";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    { id, type, placeholder, icon, fShowHide = false, className, ...props },
    ref
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    if (icon) {
      return (
        <div className={classNames(styles.wrapper, className)}>
          <input
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            className={classNames(styles.inp, styles.inp_icon)}
            {...props}
          />
          {icon}
        </div>
      );
    }

    if (fShowHide) {
      return (
        <div className={classNames(styles.wrapper, className)}>
          <input
            id={id}
            ref={ref}
            type={isShowPassword ? "text" : "password"}
            placeholder={placeholder}
            className={classNames(styles.inp, styles.inp_password)}
            {...props}
          />
          <button
            type="button"
            aria-label={isShowPassword ? "Показать пароль" : "Скрыть пароль"}
            onClick={() => setIsShowPassword(!isShowPassword)}
            className={styles.btn}
          >
            {isShowPassword === false ? <BsEye /> : <BsEyeSlash />}
          </button>
        </div>
      );
    }

    return (
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={classNames(styles.inp, className)}
        {...props}
      />
    );
  }
);
