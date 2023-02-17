import { LandingLayoutProps } from "./LandingLayout.props";
import styles from "./LandingLayout.module.css";
import { Footer, Header } from "./components";

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.main}>{children}</main>
      <Footer className={styles.footer} />
    </>
  );
};
