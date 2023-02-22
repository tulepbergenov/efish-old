import { LangSwitcher } from "@/components";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Nav.module.css";
import { NavProps } from "./Nav.props";

export const Nav = ({ links }: NavProps) => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link, i) => (
          <li
            key={i}
            className={classNames(styles.item, {
              [styles.item_active]: router.pathname === link.url,
            })}
          >
            <Link
              href={link.url}
              className={classNames(styles.link, {
                [styles.link_active]: router.pathname === link.url,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
