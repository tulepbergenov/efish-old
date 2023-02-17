import { EmailIcon, LocationIcon, PhoneIcon } from "@/assets/icons";
import { Container, Heading } from "@/components/ui";
import Link from "next/link";
import styles from "./Contacts.module.css";

export const Contacts = () => {
  return (
    <section className={styles.wrapper}>
      <Container width="lg">
        <Heading size="lg" uppercase={true} as="h1" className={styles.title}>
          Контакты
        </Heading>
        <ul className={styles.list}>
          <li className={styles.item}>
            <LocationIcon className={styles.icon} />
            <h2 className={styles.label}>Адрес</h2>
            <p>г.Нур-Султан, ул. Хусейн бен Талал 25/1</p>
          </li>
          <li className={styles.item}>
            <PhoneIcon className={styles.icon} />
            <h2 className={styles.label}>Телефон</h2>
            <ul className={styles.numbers}>
              <li>
                <Link href="tel:+77172797722">+7 (71-72) 79-77-22</Link>
              </li>
              <li>
                <Link href="tel:+77172797720">+7 (71-72) 79-77-20 </Link>
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <EmailIcon className={styles.icon} />
            <h2 className={styles.label}>Электронная почта</h2>
            <Link href="mailto:info@fish.kz">info@fish.kz</Link>
          </li>
        </ul>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A35692a0cc856648403a5d81dc34ca500dc54e6bc477f9637c18c3d6f7ed432cc&amp;source=constructor"
          width="100%"
          height="467"
          frameBorder="0"
        ></iframe>
      </Container>
    </section>
  );
};
