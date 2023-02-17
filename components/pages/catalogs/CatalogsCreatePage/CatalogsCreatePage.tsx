import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./CatalogsCreatePage.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CatalogsCreatePage = () => {
  const [plan, setPlan] = useState("startup");

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <Link href="/admin/catalogs" className={styles.titleLink}>
          <IoIosArrowBack className={styles.titleLinkIcon} />
        </Link>
        <h1 className={styles.titleLabel}>Создание справочника</h1>
      </div>
      <form>
        <fieldset className={styles.form}>
          <label className={styles.label}>Название</label>
          <input type="text" placeholder="Водоемы" className={styles.input} />
          <fieldset className={styles.inputs}>
            <label className={styles.label}>Столбцы в таблице</label>
            <fieldset className={styles.inputsInner}>
              <input type="text" placeholder="ID" className={styles.input} />
              <input
                type="text"
                placeholder="Наименование"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Псевдоним"
                className={styles.input}
              />
              <div className={styles.examplesWrapper}>
                <input
                  type="text"
                  placeholder="Пример"
                  className={styles.input}
                />
                <button className={styles.examplesBtnCreate}>
                  <span className={styles.exampleBtnCreateTooltip}>
                    Довить поле
                  </span>
                  <AiOutlinePlusCircle
                    className={styles.examplesBtnCreateIcon}
                  />
                </button>
              </div>
            </fieldset>
          </fieldset>
          <fieldset className={styles.inputs}>
            <label className={styles.label}>Название</label>
            <RadioGroup
              value={plan}
              onChange={setPlan}
              className="rounded-[5px] border border-[#D3E7FB] px-[20px] py-[23px]"
            >
              <RadioGroup.Option value="startup">
                {({ checked }) => (
                  <span className={checked ? "bg-blue-200" : ""}>Startup</span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="business">
                {({ checked }) => (
                  <span className={checked ? "bg-blue-200" : ""}>Business</span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="enterprise">
                {({ checked }) => (
                  <span className={checked ? "bg-blue-200" : ""}>
                    Enterprise
                  </span>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </fieldset>
          <button type="button" className={styles.btnCreate}>
            Создать
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CatalogsCreatePage;
