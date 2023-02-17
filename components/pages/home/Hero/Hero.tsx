import { Container } from "@/components/ui";
import { getToken } from "@/utilities";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { FiUser } from "react-icons/fi";
import { UsersService } from "@/api/services/userList";
import { UserContext } from "@/context/user";

export const Hero = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>();
  const { setUsers } = useContext(UserContext);

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();

    if (token) {
      UsersService.getUserList(token)
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });

      router.push("/admin");
      return;
    }

    router.push("/login");
  };

  return (
    <section className={styles.wrapper}>
      <Container width="lg">
        <div className={styles.body}>
          <h1 className={styles.title}>
            Мониторинг рыб и других водных животных
          </h1>
          <p className={styles.desc}>
            Предназначена для своевременного сбора и обработки информации о
            добытой, закупленной, искусственно выращенной рыбе или других водных
            животных
          </p>
          <Link
            href="/login"
            className="inline-block rounded-[44px] bg-[#52A5FC] py-[16px] px-[29px] text-[16px] font-medium leading-[20px] text-white shadow-[0px_8px_50px_rgba(82,165,252,0.7)]"
            onClick={(e) => handleClick(e)}
          >
            <span>Войти в систему</span>
            <FiUser className="ml-[10px] inline text-[20px]" />
          </Link>
        </div>
      </Container>
    </section>
  );
};
