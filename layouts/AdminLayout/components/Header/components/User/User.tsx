import { ArrowIcon } from "@/assets/icons";
import { Fragment, useContext } from "react";
import styles from "./User.module.css";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import classNames from "classnames";
import { removeToken } from "@/utilities";
import { UserContext } from "@/context/user";
import { AuthService } from "@/api/services/user";

export const User = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    AuthService.logout()
      .then((res) => {
        console.log("Выход", res.data);
        setUserData(undefined);
        removeToken();
      })
      .catch((err) => console.error("Выход", err));
  };

  return (
    <Menu as="div" className={styles.wrapper}>
      {({ open }) => (
        <>
          <Menu.Button type="button" className={styles.btn}>
            <span className={styles.label}>{userData?.first_name}</span>
            <ArrowIcon
              className={classNames(
                "row-span-2 w-[12px] self-center transition-transform duration-200 ease-in-out",
                {
                  "rotate-180": open === true,
                }
              )}
            />
            <span className={styles.sublabel}>{userData?.role.name}</span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items as="ul" className={styles.list}>
              <Menu.Item as="li" className={styles.item}>
                <Link
                  href="/admin/settings"
                  className="grid grid-cols-[18px_1fr] items-center gap-x-[10px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.165 1.5H8.835C8.43718 1.5 8.05565 1.65804 7.77434 1.93934C7.49304 2.22064 7.335 2.60218 7.335 3V3.135C7.33473 3.39804 7.26529 3.65639 7.13365 3.88413C7.00202 4.11186 6.8128 4.30098 6.585 4.4325L6.2625 4.62C6.03447 4.75165 5.77581 4.82096 5.5125 4.82096C5.2492 4.82096 4.99053 4.75165 4.7625 4.62L4.65 4.56C4.3058 4.36145 3.89688 4.30758 3.513 4.41023C3.12913 4.51288 2.80166 4.76365 2.6025 5.1075L2.4375 5.3925C2.23895 5.7367 2.18508 6.14562 2.28773 6.5295C2.39038 6.91338 2.64115 7.24084 2.985 7.44L3.0975 7.515C3.32421 7.64588 3.51272 7.83382 3.64429 8.06012C3.77586 8.28643 3.84592 8.54323 3.8475 8.805V9.1875C3.84855 9.45182 3.77974 9.71171 3.64803 9.94088C3.51633 10.17 3.32641 10.3603 3.0975 10.4925L2.985 10.56C2.64115 10.7592 2.39038 11.0866 2.28773 11.4705C2.18508 11.8544 2.23895 12.2633 2.4375 12.6075L2.6025 12.8925C2.80166 13.2363 3.12913 13.4871 3.513 13.5898C3.89688 13.6924 4.3058 13.6386 4.65 13.44L4.7625 13.38C4.99053 13.2483 5.2492 13.179 5.5125 13.179C5.77581 13.179 6.03447 13.2483 6.2625 13.38L6.585 13.5675C6.8128 13.699 7.00202 13.8881 7.13365 14.1159C7.26529 14.3436 7.33473 14.602 7.335 14.865V15C7.335 15.3978 7.49304 15.7794 7.77434 16.0607C8.05565 16.342 8.43718 16.5 8.835 16.5H9.165C9.56283 16.5 9.94436 16.342 10.2257 16.0607C10.507 15.7794 10.665 15.3978 10.665 15V14.865C10.6653 14.602 10.7347 14.3436 10.8663 14.1159C10.998 13.8881 11.1872 13.699 11.415 13.5675L11.7375 13.38C11.9655 13.2483 12.2242 13.179 12.4875 13.179C12.7508 13.179 13.0095 13.2483 13.2375 13.38L13.35 13.44C13.6942 13.6386 14.1031 13.6924 14.487 13.5898C14.8709 13.4871 15.1983 13.2363 15.3975 12.8925L15.5625 12.6C15.7611 12.2558 15.8149 11.8469 15.7123 11.463C15.6096 11.0791 15.3588 10.7517 15.015 10.5525L14.9025 10.4925C14.6736 10.3603 14.4837 10.17 14.352 9.94088C14.2203 9.71171 14.1515 9.45182 14.1525 9.1875V8.8125C14.1515 8.54818 14.2203 8.28829 14.352 8.05912C14.4837 7.82995 14.6736 7.63966 14.9025 7.5075L15.015 7.44C15.3588 7.24084 15.6096 6.91338 15.7123 6.5295C15.8149 6.14562 15.7611 5.7367 15.5625 5.3925L15.3975 5.1075C15.1983 4.76365 14.8709 4.51288 14.487 4.41023C14.1031 4.30758 13.6942 4.36145 13.35 4.56L13.2375 4.62C13.0095 4.75165 12.7508 4.82096 12.4875 4.82096C12.2242 4.82096 11.9655 4.75165 11.7375 4.62L11.415 4.4325C11.1872 4.30098 10.998 4.11186 10.8663 3.88413C10.7347 3.65639 10.6653 3.39804 10.665 3.135V3C10.665 2.60218 10.507 2.22064 10.2257 1.93934C9.94436 1.65804 9.56283 1.5 9.165 1.5V1.5Z"
                      stroke="#52A5FC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                      stroke="#52A5FC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Настройки</span>
                </Link>
              </Menu.Item>
              <Menu.Item as="li" className={styles.item}>
                <Link
                  href="/login"
                  className="grid grid-cols-[18px_1fr] items-center gap-x-[10px]"
                  onClick={logout}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75"
                      stroke="#52A5FC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.75L15.75 9L12 5.25"
                      stroke="#52A5FC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.75 9H6.75"
                      stroke="#52A5FC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Выход</span>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
