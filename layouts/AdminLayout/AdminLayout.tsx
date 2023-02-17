import styles from "./AdminLayout.module.css";
import { AdminLayoutProps } from "./AdminLayout.props";
import { Header, Sidebar } from "./components";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear", delay: 0.5 }}
        className={styles.main}
      >
        <section className={styles.content}>{children}</section>
      </motion.main>
    </div>
  );
};
