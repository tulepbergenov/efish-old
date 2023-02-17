import { Container } from "@/components/ui";
import classNames from "classnames";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import { Logo } from "@/components";
import { Nav } from "./components";
import { LINKS } from "@/constants";

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header className={classNames(styles.header, className)} {...props}>
      <Container width="lg">
        <div className={styles.body}>
          <Logo />
          <Nav links={LINKS} />
        </div>
      </Container>
    </header>
  );
};
