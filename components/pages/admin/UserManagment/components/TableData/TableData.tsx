import {
  CloseFillIcon,
  EditIcon,
  EyeOpen,
  StatisticsIcon,
} from "@/assets/icons";
import { formatDate, FormatStatus } from "@/utilities";
import { FC, memo, useState } from "react";
import { TableDataProps } from "./TableData.props";
import styles from "./TableData.module.css";
import classNames from "classnames";
import { Modal } from "@/components/ui/Modal/Modal";
import { MonitoringOfActions } from "@/components/ui/MonitoringOfActions/MonitoringOfActions";
import { Tooltip } from "@/components/ui";
import { BlockUser } from "@/components/ui/BlockUser/BlockUser";
import Link from "next/link";
import { useRouter } from "next/router";

const TableData: FC<TableDataProps> = ({
  id,
  first_name,
  last_name,
  middle_name,
  created_at,
  role,
  is_deleted,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBlockOpen, SetIsBlockOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleUserInfo = (e: any) => {
    e.preventDefault();
    router.push(`/admin/users/${id}`);
  };

  return (
    <>
      <tr className={styles.tr}>
        <td className={styles.td}>{id}</td>
        <td className={styles.td}>
          <p className={styles.name}>
            <span>{first_name}</span>
            <span>{last_name}</span>
            {Boolean(middle_name) && <span>{middle_name}</span>}
          </p>
        </td>
        <td className={classNames(styles.itemJCenter, styles.td)}>
          <div className="-translate-x-[30px]">
            <button type="button" onClick={() => setIsOpen(true)}>
              <StatisticsIcon className="text-[#52A5FC]" />
            </button>
          </div>
        </td>
        <td className={styles.td}>{formatDate(created_at)}</td>
        <td className={styles.td}>{role.description}</td>
        <td className={styles.td}>
          <FormatStatus value={is_deleted} />
        </td>
        <td className={styles.td}>
          <section className={styles.icons}>
            <Tooltip label="Посмотреть">
              <button type="button" onClick={handleUserInfo}>
                <EyeOpen
                  className={classNames(styles.btnIcon, styles.btnIcon_info)}
                />
              </button>
            </Tooltip>
            <Tooltip label="Редактировать пользователя">
              <Link href={`/admin/edituser/${id}`}>
                <EditIcon
                  className={classNames(styles.btnIcon, styles.btnIcon_update)}
                />
              </Link>
            </Tooltip>
            <Tooltip label="Заблокировать">
              <button type="button" onClick={() => SetIsBlockOpen(true)}>
                <CloseFillIcon
                  className={classNames(styles.btnIcon, styles.btnIcon_delete)}
                />
              </button>
            </Tooltip>
          </section>
        </td>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <MonitoringOfActions
            setIsOpen={setIsOpen}
            first_name={first_name}
            last_name={last_name}
            middle_name={middle_name}
          />
        </Modal>
        <Modal isOpen={isBlockOpen} setIsOpen={SetIsBlockOpen}>
          <BlockUser id={id} role={role.name} setIsOpen={SetIsBlockOpen} />
        </Modal>
      </tr>
    </>
  );
};

export default memo(TableData);
