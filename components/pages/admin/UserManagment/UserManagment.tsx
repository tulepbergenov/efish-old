import { UserService } from "@/api/services/user";
import { UsersService } from "@/api/services/userList";
import { Heading } from "@/components/ui/Heading/Heading";
import { UserContext } from "@/context/user";
import useDebounce from "@/hooks/use-debounce";
import { IUserRole } from "@/interfaces/user-roles.interface";
import { IUserTableData } from "@/interfaces/users.interface";
import { getToken } from "@/utilities";
import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import TableData from "./components/TableData/TableData";
import TableDataLoader from "./components/TableData/TableData.loader";
import { TableFooterController } from "./TableFooterController.loader";
import { TableHeaderController } from "./TableHeaderController.loader";

const TITLES = [
  "ID",
  "ФИО",
  "Мониторинг действий",
  "Дата регистрации",
  "Роль",
  "Статус",
  "Действия",
];

const people = [
  { id: 1, name: 5 },
  { id: 2, name: 10 },
  { id: 3, name: 15 },
];

export const UserManagment: FC = () => {
  const { isUsersLoading, setIsUsersLoading, setUsers, users } =
    useContext(UserContext);
  const [tableUsers, setTableUsers] = useState<IUserTableData[] | null>(null);
  const [selectedRole, setSelectedRole] = useState<IUserRole | any>("");
  const [search, setSearch] = useState<string>("");
  const [selectedPageSize, setSelectedPageSize] = useState(people[0]);
  const [lastIdItemUsers, setLastIdItemUsers] = useState<number>(0);
  const [lastIdItemCurrItems, setLastIdItemCurrItems] = useState<number>(0);
  const [firstIdItemCurrItems, setFirstIdItemCurrItems] = useState<number>(0);
  const [roles, setRoles] = useState<IUserRole[]>([]);

  const filteringUsers = tableUsers?.filter((user) => {
    if (selectedRole?.id === "all") {
      return user;
    }

    if (user.role.id === selectedRole?.id) {
      return user;
    }
  });

  const deb = useDebounce(search, 500);

  useEffect(() => {
    if (tableUsers) {
      setTableUsers(
        users!.filter(
          (user) =>
            user.first_name.toLowerCase().includes(deb.toLowerCase()) ||
            user.last_name.toLowerCase().includes(deb.toLowerCase())
        )
      );
    }
  }, [deb, users]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(selectedPageSize.name);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteringUsers?.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentItems);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole, selectedPageSize]);

  const onResetSearch = () => {
    setSearch("");

    if (users) {
      setTableUsers(users);
    }
  };

  useEffect(() => {
    if (users?.length) {
      setLastIdItemUsers(users[users.length - 1].id);
    }
  }, [users, selectedRole, roles]);

  useEffect(() => {
    if (currentItems?.length) {
      setLastIdItemCurrItems(currentItems[currentItems.length - 1].id);
      setFirstIdItemCurrItems(currentItems[0].id);
    }
  }, [currentItems, selectedRole, roles]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      UserService.getUserRoles(token).then((res) => {
        const resRoles = res.data;
        const allItem = {
          id: "all",
          name: "all_roles",
          description: "Все роли",
          accesses: [],
          status: "active",
          created_at: "2023-01-04T10:40:10.000000Z",
          updated_at: "2023-01-04T10:40:10.000000Z",
        };
        resRoles.unshift(allItem);

        setRoles(resRoles);
      });

      UsersService.getUserList(token)
        .then((res) => {
          setIsUsersLoading(true);

          const sortUsers = res.data.data.sort((a, b) => a.id - b.id);
          setUsers(sortUsers);
          setTableUsers(sortUsers);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0]);
    }
  }, [roles]);

  console.log("last id user", lastIdItemUsers);
  console.log("curritem first", firstIdItemCurrItems);
  console.log("curritem last", lastIdItemCurrItems);
  console.log(currentItems);

  return (
    <>
      <Heading as="h1" line uppercase size="sm" className="mb-[47px]">
        Управление пользователями
      </Heading>
      {isUsersLoading === true ? (
        <div className="mb-[35px] flex items-center justify-between">
          <div className="flex items-center gap-x-[20px]">
            <div className="relative">
              <input
                type="text"
                className="inline-block w-[422px] rounded-[5px] border border-[#D3E7FB] bg-white pb-[12px] pt-[13px] pl-[20px] pr-[64px] text-[14px] leading-[19px] text-[#0A091D] placeholder:text-[#0A091D]"
                placeholder="Поиск пользователя"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search.length > 0 ? (
                <button
                  type="button"
                  className="absolute top-2/4 right-[20px] h-[24px] w-[24px] -translate-y-2/4 text-[#52A5FC]"
                  onClick={onResetSearch}
                >
                  x
                </button>
              ) : (
                <FiSearch className="absolute top-2/4 right-[20px] h-[24px] w-[24px] -translate-y-2/4 text-[#52A5FC]" />
              )}
            </div>
            {Boolean(roles) && (
              <Listbox
                as="div"
                value={selectedRole}
                onChange={setSelectedRole}
                className="relative"
              >
                {({ open }) => (
                  <>
                    <Listbox.Button
                      as="button"
                      type="button"
                      className="relative inline-block w-[328px] rounded-[5px] border border-[#D3E7FB] bg-white pb-[12px] pt-[13px] pl-[20px] pr-[64px] text-start text-[14px] leading-[19px] text-[#0A091D] placeholder:text-[#0A091D]"
                    >
                      <span>
                        {selectedRole === ""
                          ? "Все"
                          : selectedRole?.description}
                      </span>
                      <BsChevronDown
                        className={classNames(
                          "absolute top-2/4 right-[26px] h-auto w-[17px] -translate-y-2/4 text-[#52A5FC] transition-transform duration-300 ease-in-out",
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
                        className={`absolute z-10 flex w-[328px] translate-y-[5px] flex-col gap-y-[5px] overflow-hidden rounded-[5px] border border-[#D3E7FB] bg-white text-[14px] leading-[19px] text-[#0A091D] ${
                          roles.length > 6 &&
                          "h-[calc(6*42px)] overflow-y-scroll"
                        }`}
                      >
                        {roles?.map((role) => (
                          <Listbox.Option
                            as="li"
                            key={role.id}
                            value={role}
                            className="w-full"
                          >
                            <button
                              type="button"
                              className="h-[42px] w-full px-[20px] text-start hover:bg-[#D3E7FB]"
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
          </div>
          <Link
            href="/admin/create-user"
            className="flex items-center gap-x-[10px] rounded-[44px] bg-[#52A5FC] py-[15px] px-[30px] text-[14px] leading-[19px] text-white transition-colors duration-300 ease-in-out hover:bg-[#1A8BFF]"
          >
            <span>Создать нового пользователя</span>
            <AiOutlinePlusCircle className="h-[15px] w-[15px]" />
          </Link>
        </div>
      ) : (
        <TableHeaderController />
      )}
      <div className="md:overflow-x-auto lg:overflow-visible">
        <table className="min-w-full text-sm">
          {isUsersLoading === true && (
            <thead>
              <tr>
                {TITLES.map((item, i) => (
                  <th
                    key={i}
                    className="whitespace-nowrap bg-[#F7FBFF] px-[20px] py-[12px] text-left text-[12px] font-semibold uppercase leading-[15px] text-gray-900 first:rounded-[10px_0_0_10px] last:rounded-[0px_10px_10px_0]"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {isUsersLoading === true ? (
            <>
              {Boolean(users) && (
                <tbody>
                  {currentItems?.map((user) => (
                    <TableData key={user.id} {...user} />
                  ))}
                </tbody>
              )}
            </>
          ) : (
            <TableDataLoader />
          )}
        </table>
      </div>
      {isUsersLoading === true ? (
        <div className="mt-[29px] flex items-center gap-x-[30px] text-[14px] leading-[19px]">
          <p>
            Общее кол-во дел: <output>{users?.length}</output>
          </p>
          <Listbox
            className="relative"
            as="div"
            value={selectedPageSize}
            onChange={setSelectedPageSize}
          >
            <Listbox.Button
              as="button"
              type="button"
              className="flex items-center"
            >
              <span>
                <span>Строк на странице: </span>
                {selectedPageSize.name}
              </span>
              <GoTriangleDown className="ml-[10px] h-auto w-[7px]" />
            </Listbox.Button>
            <Listbox.Options
              as="ul"
              className="absolute top-0 right-0 flex translate-y-[20px] flex-col"
            >
              {people.map((person) => (
                <Listbox.Option as="li" key={person.id} value={person}>
                  <button
                    type="button"
                    onClick={() => setPageSize(person.name)}
                    className="h-[10px] w-[10px]"
                  >
                    {person.name}
                  </button>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <div className="flex items-center">
            <p className="flex items-center">
              <span>
                <>
                  {firstIdItemCurrItems} - {lastIdItemCurrItems}
                </>
              </span>
              <span className="px-[3px]">из</span>
              <output>{filteringUsers?.length}</output>
            </p>
            <section className="flex items-center pl-[15px]">
              <button
                type="button"
                className="flex items-center justify-center"
                disabled={currentPage === 1}
                onClick={handlePrev}
              >
                <BsChevronLeft className="h-[15px] w-[15px]" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center"
                disabled={lastIdItemUsers === lastIdItemCurrItems}
                onClick={handleNext}
              >
                <BsChevronRight className="h-[15px] w-[15px]" />
              </button>
            </section>
          </div>
        </div>
      ) : (
        <TableFooterController />
      )}
    </>
  );
};
