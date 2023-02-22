import { LangSwitcherProps } from "./LangSwitcher.props";
import styles from "./LangSwitcher.module.css";
import classNames from "classnames";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";

const LANGS = [
  { id: "kaz", name: "Каз", nameShort: "Kz" },
  { id: "rus", name: "Рус", nameShort: "Ru" },
];

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const [selectedLang, setSelectedLang] = useLocalStorage("LANG", LANGS[1]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const render = setTimeout(() => {
      setIsLoading(true);
    }, 300);

    return () => clearTimeout(render);
  }, []);

  return (
    <section className={classNames(styles.btns, className)}>
      {isLoading === true && (
        <>
          {LANGS.map((lang) => (
            <button
              key={lang.id}
              type="button"
              className={classNames(styles.btn, {
                [styles.btn_active]: selectedLang.id === lang.id,
              })}
              onClick={() => setSelectedLang(lang)}
            >
              {lang.nameShort}
            </button>
          ))}
        </>
      )}
    </section>
  );
};
