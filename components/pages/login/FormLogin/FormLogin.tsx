import { EyeClose, EyeOpen, LockIcon, UserIcon } from "@/assets/icons";
import { Button, Input } from "@/components/ui";
import classNames from "classnames";
import { useContext, useState } from "react";
import styles from "./FormLogin.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData } from "@/interfaces";
import { AuthService } from "../../../../api/services/user";
import { useRouter } from "next/router";
import { UserContext } from "@/context/user";
import { UsersService } from "@/api/services/userList";
import { formSchema } from "@/constants";
import { getToken, setToken } from "@/utilities";

const schema = yup.object().shape(formSchema);

export const FormLogin = () => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useContext(UserContext);
  const { setUsers } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);

    AuthService.login(data)
      .then((res) => {
        setToken(res.data.access_token);
        setUserData(res.data.data);
        router.push("/admin");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });

    const token = getToken();

    if (token) {
      UsersService.getUserList(token)
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.inps}>
        <div
          className={classNames(styles.inpItem, {
            [styles.inpItem_error]: errors.email,
          })}
        >
          <UserIcon className={styles.icon} />
          <Input
            {...register("email")}
            border={false}
            customPaddingX={true}
            className={styles.inp}
            placeholder="Ваш логин"
          />
        </div>
        <div
          className={classNames(styles.inpItem, {
            [styles.inpItem_error]: errors.password,
          })}
        >
          <LockIcon className={styles.icon} />
          <Input
            {...register("password")}
            border={false}
            type={isShow === true ? "text" : "password"}
            customPaddingX={true}
            className={classNames(styles.inp, styles.inp_show, {
              [styles.inp_error]: errors.password,
            })}
            placeholder="Ваш пароль"
          />
          <button
            type="button"
            className={styles.iconShow}
            onClick={() => setIsShow(!isShow)}
          >
            {isShow === true ? <EyeClose /> : <EyeOpen />}
          </button>
        </div>
        <div>
          {errors.email?.message && (
            <p className={styles.error}>Вы ввели неверный адрес почты!</p>
          )}
          {errors.password?.message && (
            <p className={styles.error}>Вы ввели неверный пароль!</p>
          )}
        </div>
      </fieldset>
      <Button type="submit" appearance="blue" className={styles.btn}>
        {isLoading ? "Loading..." : "Войти"}
      </Button>
    </form>
  );
};
