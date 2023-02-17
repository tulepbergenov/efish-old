import { LANGS } from "@/constants";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LangSwitcherProps } from "./LangSwitcher.props";
import styles from "./LangSwitcher.module.css";
import classNames from "classnames";
import { ArrowIcon } from "@/assets/icons";

export const LangSwitcher = ({ appirience, className }: LangSwitcherProps) => {
  const [selectedLang, setSelectedLang] = useState(LANGS[0]);

  if (appirience === "select") {
    return (
      <Listbox
        as="div"
        value={selectedLang}
        onChange={setSelectedLang}
        className={classNames(styles.select, className)}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              as="button"
              type="button"
              className={styles.selectBtn}
            >
              <span>{selectedLang.name}</span>
              <ArrowIcon
                className={classNames(styles.arrow, {
                  [styles.arrow_active]: open === true,
                })}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options as="ul" className={styles.list}>
                {LANGS.map((lang) => (
                  <Listbox.Option key={lang.id} as="li" value={lang}>
                    <button type="button">{lang.name}</button>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    );
  }

  if (appirience === "buttons") {
    return (
      <section className={classNames(styles.btns, className)}>
        {LANGS.map((lang, i) => (
          <button
            key={i}
            type="button"
            className={classNames(styles.btn, {
              [styles.btn_active]: selectedLang === LANGS[i],
            })}
            onClick={() => setSelectedLang(LANGS[i])}
          >
            {lang.nameShort}
          </button>
        ))}
      </section>
    );
  }

  return null;
};
