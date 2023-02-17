import { UsersService } from "@/api/services/userList";
import { Heading } from "@/components/ui/Heading/Heading";
import { withAuth } from "@/hocs/withAuth";
import { IUserInfoResponse } from "@/interfaces/user-info.interface";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { getToken } from "@/utilities";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../../../components/ui/Input/Input";
import { Button } from "../../../components/ui/Button/Button";
import Link from "next/link";
import styles from "./edituser.module.css";
import { UserService } from "@/api/services/user";
import { IUserRole } from "@/interfaces/user-roles.interface";
import { IoIosArrowDown } from "react-icons/io";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { formUserEditSchema } from "@/constants/form-user-edit.schema";
import { IFormUserEdit } from "@/interfaces/form-user-edit.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

const schema = yup.object().shape(formUserEditSchema);

const UserPage = (props: any) => {
  const [userInfo, setUserInfo] = useState<IUserInfoResponse>();
  const [roles, setRoles] = useState<IUserRole[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      UserService.getUserRoles(token)
        .then((response) => {
          setRoles(response.data);
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });

      UsersService.getUserInfo(props.id, token)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IFormUserEdit>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setValue("role", userInfo.role.description);
      setValue("first_name", userInfo?.first_name);
      setValue("last_name", userInfo.last_name);
      setValue(
        "middle_name",
        Boolean(userInfo.middle_name) ? userInfo.middle_name : ""
      );
      setValue("email", userInfo.email);
      setValue("iin_bin", userInfo.iin_bin);
    }
  }, [userInfo]);

  const onSubmit = (data: IFormUserEdit) => {
    const submitData: any = { ...data };
    submitData.middle_name = data.middle_name === "" ? null : data.middle_name;
    submitData.avatar = null;
    submitData.role_id = roles.filter(
      (role) => role.description === data.role
    )[0].id;
    delete submitData.role;

    const token = getToken();

    if (token) {
      UserService.editUser(props.id, submitData, token)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          if (res) {
            setTimeout(() => {
              router.push("/admin");
            }, 3000);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.error_message);
        });
    }
  };

  useEffect(() => {
    console.log("HOOK FORM ERRORS", errors);
  }, [errors]);

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
        Редактирование пользователя
      </Heading>
      {isLoading === true ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset}>
            <label>Роль</label>
            <div className="flex w-full flex-col">
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Listbox
                    as="div"
                    value={value}
                    onChange={onChange}
                    className="relative text-[14px] font-normal leading-[17px]"
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Button
                          as="button"
                          type="button"
                          className="relative flex w-full items-center rounded-[5px] border border-[#D3E7FB] py-[13px] pl-[20px] pr-[64px] text-start"
                        >
                          <span>
                            {Boolean(value)
                              ? value
                              : userInfo?.role.description}
                          </span>
                          <IoIosArrowDown
                            className={classNames(
                              "absolute top-2/4 right-[20px] h-auto w-[20px] -translate-y-2/4 text-[#52A5FC] transition-transform duration-300 ease-in-out",
                              {
                                ["rotate-180"]: open === true,
                              }
                            )}
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
                          <Listbox.Options
                            as="ul"
                            className={`absolute z-10 w-full translate-y-[10px] overflow-hidden rounded-[5px] border border-[#D3E7FB] bg-white ${
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
                                  active ? "bg-[#D3E7FB]" : "bg-white"
                                }
                              >
                                <button
                                  type="button"
                                  className="h-[42px] w-full px-[20px] text-start"
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
            </div>
            <label>Фамилия</label>
            <Input
              type="text"
              {...register("last_name")}
              defaultValue={userInfo?.last_name}
            />
            <label>Имя</label>
            <Input
              type="text"
              {...register("first_name")}
              defaultValue={userInfo?.first_name}
            />
            <label>Отчество</label>
            <Input
              type="text"
              {...register("middle_name")}
              defaultValue={userInfo?.middle_name}
            />
            <label>ИИН</label>
            <Input
              type="text"
              {...register("iin_bin")}
              defaultValue={userInfo?.iin_bin}
            />
            <label>Электронная почта</label>
            <Input
              type="text"
              {...register("email")}
              defaultValue={userInfo?.email}
            />
            <label>Пароль</label>
            <div className="flex w-full flex-col">
              <Input fShowHide {...register("password")} />
              {errors.password?.message && (
                <p className={styles.error}>{errors.passwordRepeat?.message}</p>
              )}
            </div>
            <label>Повтор пароля</label>
            <div className="flex w-full flex-col">
              <Input fShowHide {...register("passwordRepeat")} />
              {errors.passwordRepeat?.message && (
                <p className={styles.error}>{errors.passwordRepeat?.message}</p>
              )}
            </div>
            <div className={styles.btns}>
              <Button type="submit" bg="green" textSize="sm">
                Сохранить
              </Button>
              <Link href="/admin" className={styles.link}>
                Назад
              </Link>
            </div>
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

export default withAuth(UserPage);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
