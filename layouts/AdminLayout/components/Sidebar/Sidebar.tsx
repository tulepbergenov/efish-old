import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { DirectoryIcon, UserRoleIcon } from "@/assets/icons";
import classNames from "classnames";
import { UserManagement } from "./components/UserManagement/UserManagement";
import { useRouter } from "next/router";

export const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  // const [currentPath, setCurrentPath] = useState<string>();

  //   useEffect(() => {
  //     const currentPathname = new URL(router.asPath, location.href).pathname;
  //     console.log(router.pathname, currentPathname);
  //
  //     setCurrentPath(currentPathname);
  //   }, []);

  return (
    <aside className={classNames(className, styles.sidebar)}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <UserManagement />
          </li>
          <li className={styles.item}>
            <Link
              href="/admin/references"
              className={classNames(styles.link, {
                [styles.link_active]: router.pathname !== "/admin",
              })}
            >
              <DirectoryIcon />
              <span className={styles.label}>Управление справочниками</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="#" className={styles.link}>
              <UserRoleIcon />
              <span className={styles.label}>Управление ролями</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
