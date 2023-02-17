import { Button, Heading } from "@/components/ui";
import { Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FormEDS } from "../FormEDS/FormEDS";
import { FormLogin } from "../FormLogin/FormLogin";
import styles from "./Tabs.module.css";

export const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <>
      <Heading as="h1" size="md" center={true} className={styles.title}>
        Авторизация
      </Heading>
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List as="section" className={styles.btns}>
          <Tab as={Fragment}>
            {({ selected }) => (
              <Button
                type="button"
                appearance={selected === true ? "blue" : "white"}
                className={styles.btn}
              >
                Вход по ЭЦП
              </Button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <Button
                type="button"
                appearance={selected === true ? "blue" : "white"}
                className={styles.btn}
              >
                Вход по логину
              </Button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels as="div">
          <Tab.Panel as="div">
            <Transition
              appear
              show={tabIndex == 0}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <FormEDS />
            </Transition>
          </Tab.Panel>
          <Tab.Panel as="div">
            <Transition
              appear
              show={tabIndex == 1}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <FormLogin />
            </Transition>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <Link href="#" className={styles.linkRecovery}>
        Забыли пароль?
      </Link>
    </>
  );
};
