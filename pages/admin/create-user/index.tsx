import { UsersService } from "@/api/services/userList";
import { Button } from "@/components/ui/Button/Button";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/Input/Input";
import { formCreateUserSchema } from "@/constants/form-create-user.schema";
import { withAuth } from "@/hocs/withAuth";
import { ICreateUserForm } from "@/interfaces";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { getToken } from "@/utilities";
import { Listbox, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./create-user.module.css";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { UserService } from "@/api/services/user";
import { IUserRole } from "@/interfaces/user-roles.interface";
import { Oval } from "react-loader-spinner";

const schema = yup.object().shape(formCreateUserSchema);

const PageCreateUser: NextPage = () => {
  const [roles, setRoles] = useState<IUserRole[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      UserService.getUserRoles(token).then((res) => {
        setRoles(res.data);
        setIsLoading(true);
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICreateUserForm>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: ICreateUserForm) => {
    const token = getToken();

    const submitData: any = { ...data };
    submitData.role_id = roles.filter((role) => {
      if (role.description === submitData.role) {
        return {
          role,
        };
      }
    })[0].id;
    delete submitData.role;
    delete submitData.passwordRepeat;
    submitData.avatar = null;
    console.log(submitData);

    if (token) {
      UsersService.createUser(submitData, token)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setTimeout(() => {
            router.push("/admin");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.error_message);
          toast.error(err.response.data.error_message);
        });
    }
  };

  return (
    <AdminLayout>
      <Heading
        as="h1"
        size="sm"
        uppercase
        line
        url="/admin"
        className="mb-[45px]"
      >
        Добавление пользователя
      </Heading>
      {isLoading === true ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-[30px] grid max-w-[660px] grid-cols-[206px_1fr] gap-[34px_31px] text-[14px] font-normal leading-[17px] text-[#0A091D]">
            {roles.length > 0 && (
              <>
                <label className="self-center font-semibold">Роль</label>
                <div className="flex w-full flex-col">
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Listbox
                        as="div"
                        className="relative"
                        value={value}
                        onChange={onChange}
                      >
                        {({ open }) => (
                          <>
                            <Listbox.Button
                              as="button"
                              type="button"
                              className="relative inline-block w-full rounded-[5px] border border-[#D3E7FB] py-[13px] pl-[20px] pr-[64px] text-start"
                            >
                              <span>{Boolean(value) ? value : "Роль"}</span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={classNames(
                                  "absolute top-2/4 right-[20px] -translate-y-2/4 transition-transform duration-300 ease-in-out",
                                  {
                                    ["rotate-180"]: open === true,
                                  }
                                )}
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#52A5FC"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                              <Listbox.Options
                                as="ul"
                                className={`absolute z-10 w-full translate-y-[10px] rounded-[5px] border border-[#D3E7FB] bg-white ${
                                  roles.length > 6 &&
                                  "h-[calc(6*42px)] overflow-y-scroll"
                                }`}
                              >
                                {roles.map((role) => (
                                  <Listbox.Option
                                    as="li"
                                    key={role.id}
                                    value={role.description}
                                    className={({ active }) =>
                                      `w-full ${
                                        active ? "bg-[#D3E7FB]" : "bg-white"
                                      }`
                                    }
                                  >
                                    <button
                                      type="button"
                                      className="h-[42px] w-full px-[20px] text-start transition-colors duration-300 ease-in-out hover:bg-[#D3E7FB]"
                                    >
                                      {role.description}
                                    </button>
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </>
                        )}
                      </Listbox>
                    )}
                  />
                  {errors.role?.message && (
                    <p className={styles.error}>Вы не выбрали роль</p>
                  )}
                </div>
              </>
            )}
            <label className="self-center font-semibold">Фамилия</label>
            <div className="flex w-full flex-col">
              <Input type="text" {...register("last_name")} />
              {errors.last_name?.message && (
                <p className={styles.error}>Вы не ввели фамилию</p>
              )}
            </div>
            <label className="self-center font-semibold">Имя</label>
            <div className="flex w-full flex-col">
              <Input type="text" {...register("first_name")} />
              {errors.first_name?.message && (
                <p className={styles.error}>Вы не ввели имя</p>
              )}
            </div>
            <label className="self-center font-semibold">Отчество</label>
            <div className="flex w-full flex-col">
              <Input type="text" {...register("middle_name")} />
              {errors.middle_name?.message && (
                <p className={styles.error}>Вы не ввели отчество</p>
              )}
            </div>
            <label className="self-center font-semibold">ИИН</label>
            <div className="flex w-full flex-col">
              <Input
                type="text"
                {...register("iin_bin", {
                  valueAsNumber: true,
                })}
                max={12}
              />
              {errors.iin_bin?.message && (
                <p className={styles.error}>{errors.iin_bin?.message}</p>
              )}
            </div>
            <label className="self-center font-semibold">
              Электронная почта
            </label>
            <div className="flex w-full flex-col">
              <Input type="email" {...register("email")} />
              {errors.email?.message && (
                <p className={styles.error}>Неверно введён электронный адрес</p>
              )}
            </div>
            <label className="self-center font-semibold">Пароль</label>
            <div className="flex w-full flex-col">
              <Input fShowHide {...register("password")} />
              {errors.password?.message && (
                <p className={styles.error}>{errors.password?.message}</p>
              )}
            </div>
            <label className="self-center font-semibold">Повтор пароля</label>
            <div className="flex w-full flex-col">
              <Input fShowHide {...register("passwordRepeat")} />
              {errors.passwordRepeat?.message && (
                <p className={styles.error}>Пароль не совпадает</p>
              )}
            </div>
            <Button
              type="submit"
              icon={<AiOutlinePlusCircle />}
              bg="green"
              textSize="sm"
              className="col-start-2 col-end-3"
            >
              Добавить
            </Button>
          </fieldset>
        </form>
      ) : (
        <div className="flex max-w-[660px] items-center justify-center">
          <Oval
            height={80}
            width={80}
            color="#52A5FC"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#C1DFFF"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AdminLayout>
  );
};

export default withAuth(PageCreateUser);
