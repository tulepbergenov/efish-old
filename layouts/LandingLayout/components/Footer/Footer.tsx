import { Container } from "@/components/ui";
import styles from "./Footer.module.css";
import { FooterProps } from "./Footer.props";
import classNames from "classnames";
import { LINKS } from "../../../../constants/index";
import Link from "next/link";
import { Logo } from "@/components";

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={classNames(styles.footer, className)} {...props}>
      <Container width="lg">
        <div className={styles.body}>
          <Logo appearance="gray" />
          <ul className={styles.list}>
            {LINKS.map((link, i) => (
              <li key={i} className={styles.item}>
                <Link href={link.url} className={styles.link}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};
