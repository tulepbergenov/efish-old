import classNames from "classnames";
import { FC, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styles from "./InputNew.module.css";
import { InputNewProps } from "./InputNew.props";

export const InputNew: FC<InputNewProps> = ({
  textSize,
  border,
  showPassword = false,
  type,
  className,
  placeholder,
  id,
  autoComplete,
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toogleShowPassword = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  if (showPassword === true) {
    return (
      <div className={styles.inputWrapper}>
        <input
          id={id}
          autoComplete={autoComplete}
          type={
            showPassword === true
              ? isShowPassword === false
                ? "password"
                : "text"
              : type
          }
          placeholder={placeholder}
          className={classNames(
            styles.input,
            {
              [styles.input_textSm]: textSize === "sm",
              [styles.input_textMd]: textSize === "md",
              [styles.input_border]: border === true,
              [styles.input_password]: showPassword === true,
            },
            className
          )}
        />
        <button
          type="button"
          onClick={toogleShowPassword}
          className={styles.eye}
        >
          {isShowPassword === false ? (
            <BsEye className={styles.eye_icon} />
          ) : (
            <BsEyeSlash className={styles.eye_icon} />
          )}
        </button>
      </div>
    );
  }

  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={classNames(
        styles.input,
        {
          [styles.input_textSm]: textSize === "sm",
          [styles.input_textMd]: textSize === "md",
          [styles.input_border]: border === true,
        },
        className
      )}
    />
  );
};
