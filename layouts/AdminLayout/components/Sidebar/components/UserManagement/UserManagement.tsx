import {
  ArrowIcon,
  DocumentDone,
  DocumentSubmit,
  UsersIcon,
} from "@/assets/icons";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import styles from "./UserManagement.module.css";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";

export const UserManagement = () => {
  const [height, setHeight] = useState<any>(0);
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.btn}>
        <Link
          href="/admin"
          className={classNames(styles.link, {
            ["bg-[#52A5FC]"]: router.pathname === "/admin",
            ["bg-white text-[#0A091D]"]: router.pathname !== "/admin",
          })}
        >
          <UsersIcon
            className={classNames(styles.linkIcon, {
              ["text-[#52A5FC]"]: router.pathname !== "/admin",
            })}
          />
          <span className={styles.label}>Управление пользователями</span>
        </Link>
        <button
          aria-expanded={height !== 0}
          aria-controls="example-panel"
          type="button"
          className={classNames(styles.arrowBtn, {
            ["bg-[#52A5FC]"]: router.pathname === "/admin",
            ["bg-white text-[#0A091D]"]: router.pathname !== "/admin",
          })}
          onClick={() => setHeight(height === 0 ? "auto" : 0)}
        >
          <ArrowIcon
            className={classNames(
              "rotate-180 transition-transform duration-200 ease-in-out",
              {
                ["rotate-0"]: height === 0,
              }
            )}
          />
        </button>
      </div>
      <AnimateHeight id="example-panel" duration={300} height={height}>
        <ul>
          <li>
            <Link href="#" className={styles.menuItem}>
              <DocumentSubmit />
              <span className={styles.menuLabel}>Заявки на регистрацию</span>
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.menuItem}>
              <DocumentDone />
              <span className={styles.menuLabel}>Заявки на восстановление</span>
            </Link>
          </li>
        </ul>
      </AnimateHeight>
    </div>
  );
};
