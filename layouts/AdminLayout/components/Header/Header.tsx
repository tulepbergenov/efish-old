import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import classNames from "classnames";
import { LangSwitcher, Logo } from "@/components";
import { Notification, User } from "./components";

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={classNames(styles.header, className)}>
      <Logo />
      <div className={styles.nav}>
        <LangSwitcher appirience="buttons" />
        <Notification />
        <User />
      </div>
    </header>
  );
};
