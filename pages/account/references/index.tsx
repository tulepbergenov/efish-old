import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";
import { Fragment, useEffect, useRef, useState } from "react";
import { FiSearch, FiEdit3 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Listbox, Transition } from "@headlessui/react";
import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineEye } from "react-icons/ai";
import classNames from "classnames";
import Link from "next/link";
import { DirectoryIcon } from "@/assets/icons";
import { IReference } from "@/interfaces/references.interface";
import { ReferencesService } from "@/api/services/references";
import { Oval } from "react-loader-spinner";
import { formatDate } from "@/utilities";
import useDebounce from "@/hooks/use-debounce";
import { Tooltip } from "@/components/ui";
import { useRouter } from "next/router";

const filterOptions = [
  { id: 1, name: "Все", status: "all" },
  { id: 2, name: "Активные", status: "active" },
  { id: 3, name: "Заблокированные", status: "deleted" },
  { id: 3, name: "Новые", status: "new" },
];

const pageSizes = [5, 10, 15];

const ReferencesPage = (props: any) => {
  const [references, setReferences] = useState<IReference[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IReference[]>([]);
  const router = useRouter();

  useEffect(() => {
    ReferencesService.getReferences(props.page)
      .then((res) => {
        const sortData = res.data.data.sort((a, b) => a.id - b.id);
        setReferences(sortData);
        setUsers(sortData);
        if (res) {
          setTimeout(() => {
            setisLoading(true);
          }, 1000);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const renderStatus = (status: "new" | "active" | string) => {
    if (status === "active") {
      return <p className="text-[#5ABB5E]">Активный</p>;
    }

    if (status === "new") {
      return <p>Создана</p>;
    }

    return <p className="text-[#F19797]">Заблокирована</p>;
  };

  const paginate = (
    items: IReference[],
    pageNumber: number,
    pageSize: number
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;

    return [...items].splice(startIndex, pageSize);
  };

  const filteringReferences = users.filter((item) => {
    if (selectedFilter.status === "all") {
      return item;
    }

    if (item.status === selectedFilter.status) {
      return item;
    }
  });

  const deb = useDebounce(search, 500);

  useEffect(() => {
    if (references) {
      setUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(deb.toLowerCase())
        )
      );
    }
  }, [deb, references]);

  useEffect(() => {
    if (search === "") {
      setUsers(references);
    }
  }, [search]);

  const handleResetSearch = () => {
    setSearch("");

    if (references) {
      setUsers(references);
    }
  };

  const referCrop = paginate(filteringReferences, currentPage, pageSize);

  const pageCount = Math.ceil(filteringReferences.length / pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 200);
  };

  const handleNextPage = () => {
    // router.push(`/admin/references?page=${props.page + 1}`);
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 200);
  };

  const firstItem = referCrop?.[0]?.id;
  const lastItem = referCrop?.[referCrop.length - 1]?.id;

  const listRef = useRef<HTMLUListElement | any>(null);

  useEffect(() => {
    setCurrentPage(1);
    if (listRef.current) {
      window.scrollTo(0, listRef.current?.lastElementChild?.offsetTop);
    }
  }, [pageSize]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 50);
  }, [selectedFilter]);

  return (
    <AdminLayout>
      <div className="pb-[100px]">
        <h1 className="relative mb-[47px] pl-[17px] text-[18px] font-semibold uppercase leading-[22px] before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
          Управление справочниками
        </h1>
        {isLoading === true ? (
          <>
            <div className="mb-[34px] flex items-center justify-between gap-x-[20px]">
              <div className="flex items-center gap-x-[20px]">
                <div className="relative 2xl:w-[422px]">
                  <input
                    type="text"
                    placeholder="Поиск по наименованию"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white pt-[13px] pb-[11px] pl-[20px] pr-[64px] text-[14px] leading-[17px] placeholder:text-[#0A091D]"
                  />
                  <FiSearch
                    className={classNames(
                      "absolute top-2/4 right-[25px] z-10 h-[22px] w-auto -translate-y-2/4 text-[#52A5FC] transition-all duration-300 ease-in-out",
                      {
                        ["pointer-events-none invisible -top-[15px] opacity-0"]:
                          search !== "",
                      }
                    )}
                  />
                  <button
                    type="button"
                    className={classNames(
                      "absolute top-2/4 right-[25px] -translate-y-2/4 transition-all duration-300 ease-in-out",
                      {
                        ["pointer-events-none invisible right-[15px] opacity-0"]:
                          search === "",
                      }
                    )}
                    onClick={handleResetSearch}
                  >
                    <RxCross2 className="h-[22px] w-auto text-[#52A5FC]" />
                  </button>
                </div>
                <Listbox
                  as="div"
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                  className="relative text-[14px] leading-[17px]"
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button
                        as="button"
                        type="button"
                        className="relative rounded-[5px] border border-[#D3E7FB] bg-white pt-[13px] pb-[11px] pl-[20px] pr-[64px] text-start xl:w-[200px] 2xl:w-[328px]"
                      >
                        <span>{selectedFilter.name}</span>
                        <IoIosArrowDown
                          className={classNames(
                            "absolute top-2/4 right-[20px] h-[20px] w-auto -translate-y-2/4 text-[#52A5FC] transition-transform duration-300 ease-in-out",
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
                          as="section"
                          className="absolute z-10 translate-y-[10px] 2xl:w-full"
                        >
                          {filterOptions.map((filterOption) => (
                            <Listbox.Option
                              as="button"
                              type="button"
                              key={filterOption.id}
                              value={filterOption}
                              className="inline-block w-full border-l border-r border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-start first:rounded-[5px_5px_0_0] first:border-t last:rounded-[0_0_5px_5px] last:border-b hover:bg-[#D3E7FB]"
                            >
                              {filterOption.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </>
                  )}
                </Listbox>
              </div>
              <Link
                href="/account/references/create"
                className="grid grid-cols-[1fr_15px] items-center gap-x-[10px] rounded-[44px] bg-[#52A5FC] px-[30px] pt-[16px] pb-[14px] text-[14px] leading-[17px] text-white transition-colors duration-300 ease-in-out hover:bg-[#5ABB5E]"
              >
                <span>Создать</span>
                <AiOutlinePlusCircle className="h-[15px] w-auto" />
              </Link>
            </div>
            {referCrop.length > 0 ? (
              <>
                <div className="mb-[29px]">
                  <table className="w-full table-auto border-collapse text-sm text-[#0A091D]">
                    <thead>
                      <tr>
                        <th className="rounded-[10px_0_0_10px] bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-left text-[12px] uppercase leading-[15px]">
                          ID
                        </th>
                        <th className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-left text-[12px] uppercase leading-[15px]">
                          Наименование
                        </th>
                        <th className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-left text-[12px] uppercase leading-[15px]">
                          Дата создания
                        </th>
                        <th className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-left text-[12px] uppercase leading-[15px]">
                          Статус
                        </th>
                        <th className="rounded-[0_10px_10px_0] bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-right text-[12px] uppercase leading-[15px]">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody ref={listRef} className="text-[14px] leading-[17px]">
                      {referCrop.map((reference) => (
                        <tr key={reference.id} className="group">
                          <td className="rounded-[10px_0_0_10px] px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                            {reference.id}
                          </td>
                          <td className="px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                            {reference.name}
                          </td>
                          <td className="px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                            {formatDate(reference.created_at)}
                          </td>
                          <td className="px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                            {renderStatus(reference.status)}
                          </td>
                          <td className="rounded-[0_10px_10px_0] px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                            <section className="flex items-center justify-end gap-x-[9px]">
                              <Tooltip label="Справочник">
                                <Link
                                  href={`/account/references/${reference.id}/list`}
                                  className="inline-block"
                                >
                                  <DirectoryIcon className="h-[22px] w-[18px] text-[#52A5FC]" />
                                </Link>
                              </Tooltip>
                              <Tooltip label="Посмотреть">
                                <Link
                                  href={`/account/references/${reference.id}`}
                                  className="inline-block"
                                >
                                  <AiOutlineEye className="h-[22px] w-[21px] text-[#5ABB5E]" />
                                </Link>
                              </Tooltip>
                              <Tooltip label="Редактировать">
                                <Link
                                  href={`/account/references/${reference.id}/edit`}
                                  className="inline-block"
                                >
                                  <FiEdit3 className="h-[22px] w-[18px] text-[#52A5FC]" />
                                </Link>
                              </Tooltip>
                            </section>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="mb-[50px] text-center">
                Такие справочники отстуствуют
              </p>
            )}
            <div className="flex items-center gap-x-[30px] text-[14px] leading-none">
              <p>
                Общее кол-во справочников: <span>{users.length}</span>
              </p>
              <Listbox
                as="div"
                value={pageSize}
                onChange={setPageSize}
                className="relative"
              >
                <Listbox.Button
                  as="button"
                  type="button"
                  className="flex min-h-[20px] items-center text-start"
                >
                  <span className="mr-[4px]">Строк на странице:</span>
                  <span className="mr-[10px] w-[10px]">{pageSize}</span>
                  <IoMdArrowDropdown className="h-[17px] w-auto" />
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
                    as="section"
                    className="absolute right-[13px] top-[24px] z-10 flex flex-col"
                  >
                    {pageSizes.map((size) => (
                      <Listbox.Option
                        as="button"
                        type="button"
                        key={size}
                        value={size}
                        className="border-l border-r border-[#D3E7FB] bg-white px-[10px] pt-[6px] pb-[4px] text-start transition-colors duration-300 ease-in-out first:rounded-[5px_5px_0_0] first:border-t last:rounded-[0_0_5px_5px] last:border-b hover:bg-[#D3E7FB]"
                      >
                        {size}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
              <div className="flex items-center gap-x-[15px]">
                <div className="flex min-w-[80px] items-center justify-center">
                  <p>
                    <span>{firstItem}</span>-<span>{lastItem} </span>
                    из <span>{filteringReferences.length}</span>
                  </p>
                </div>
                <section className="flex items-center gap-x-[5px]">
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="transition-colors duration-300 ease-in-out disabled:text-gray-300"
                  >
                    <IoIosArrowBack className="h-[17px] w-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="transition-colors duration-300 ease-in-out disabled:text-gray-300"
                    disabled={currentPage === pageCount}
                  >
                    <IoIosArrowForward className="h-[17px] w-auto" />
                  </button>
                </section>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
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
      </div>
    </AdminLayout>
  );
};

export default withAuth(ReferencesPage);

export async function getServerSideProps(context: any) {
  let page = 1;

  if (context.query.page) {
    page = parseInt(context.query.page);
  }

  return {
    props: {
      page: page,
    },
  };
}
