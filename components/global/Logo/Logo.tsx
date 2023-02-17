import { LogoGrayIcon, LogoIcon } from "@/assets/icons";
import classNames from "classnames";
import Link from "next/link";
import styles from "./Logo.module.css";
import { LogoProps } from "./Logo.props";

export const Logo = ({ appearance = "color", className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={classNames(className, styles.logo, {
        [styles.logo_gray]: appearance === "gray",
      })}
    >
      {appearance === "color" ? (
        <LogoIcon className={styles.icon} />
      ) : (
        <LogoGrayIcon className={styles.icon} />
      )}
      <p className={styles.title}>Мониторинг рыб и других водных животных</p>
      <p className={styles.subtitle}>
        Министерство экологогии, геологии и природных ресурсов Республики
        Казахстан
      </p>
    </Link>
  );
};
