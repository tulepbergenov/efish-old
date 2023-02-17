import { LoginLayoutProps } from "./LoginLayout.props";
import styles from "./LoginLayout.module.css";
import { LangSwitcher, Logo } from "@/components";
import { Container } from "@/components/ui";

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <LangSwitcher appirience="buttons" className={styles.langs} />
        <Logo className={styles.logo} />
        <Container width="sm">{children}</Container>
      </section>
    </main>
  );
};
