import styles from "./CatalogsPage.module.css";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useState } from "react";

const CatalogsData = [
  { name: "Управление справочниками" },
  { name: "Рыбы" },
  { name: "Орудия вылова" },
];

export const CatalogsPage = () => {
  const [catalogs, setCatalogs] = useState<any[]>([]);

  useEffect(() => {
    console.log("Axios Request");
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Управление справочниками</h1>
      <ul className={styles.catalogsList}>
        {CatalogsData.map((catalog, i) => (
          <li key={i}>
            <article className={styles.catalogsItem}>
              <h2>{catalog.name}</h2>
              <Link href="#" className={styles.catalogsLink}>
                Перейти в {catalog.name}
              </Link>
              <Link href="#edit" className={styles.catalogsBtnEdit}>
                <FiEdit3 className={styles.catalogsBtnEditIcon} />
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <Link href="/admin/catalogs/create" className={styles.btnCreateCatalog}>
        <span>Создать справочник</span>
        <AiOutlinePlusCircle className={styles.btnCreateCatalogIcon} />
      </Link>
    </div>
  );
};
