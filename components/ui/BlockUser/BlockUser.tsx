import { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./BlockUser.module.css";
import { BlockUserProps } from "./BlockUser.props";
import classNames from "classnames";
import { UsersService } from "@/api/services/userList";
import { getToken } from "@/utilities";
import { useRouter } from "next/router";

export const BlockUser = ({ role, setIsOpen, id }: BlockUserProps) => {
  const btnCloseRef = useRef<HTMLButtonElement>(null);
  const [isBlock, setIsBlock] = useState(false);
  const router = useRouter();

  const handleDeleteUser = () => {
    console.log(id);
    const token = getToken();

    if (token) {
      UsersService.blockUser(id, token)
        .then((res) => {
          console.log(res);
          setIsBlock(true);
          setTimeout(() => {
            setIsOpen(false);
            router.push("/admin");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.title, {
          [styles.title_complete]: isBlock === true,
        })}
      >
        <p>
          Вы уверены что хотите заблокировать пользователя <br />
          <span className={styles.role}>«{role}»</span>
        </p>
      </div>
      <section className={styles.btns}>
        {isBlock === false ? (
          <>
            <button
              type="button"
              className={styles.btnBlock}
              onClick={handleDeleteUser}
            >
              <AiOutlineCloseCircle className={styles.icon} />
              <span>Заблокировать</span>
            </button>
            <button
              ref={btnCloseRef}
              type="button"
              className={styles.btnClose}
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </button>
          </>
        ) : (
          <p className="text-[#5ABB5E]">
            Вы успешно заблокировали роль «{role}»
          </p>
        )}
      </section>
    </div>
  );
};
