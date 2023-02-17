import { NotificationIcon } from "@/assets/icons";
import Link from "next/link";
import styles from "./Notification.module.css";

export const Notification = () => {
  return (
    <>
      <Link href="/admin/notification" className={styles.btn}>
        <NotificationIcon className={styles.icon} />
        <span className={styles.counter}>3</span>
      </Link>
    </>
  );
};
