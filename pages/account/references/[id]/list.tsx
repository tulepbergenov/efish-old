import { ReferencesService } from "@/api/services/references";
import { PreLoaderV2 } from "@/components/ui/PreLoaderV2/PreLoaderV2";
import { TitleBack } from "@/components/ui/TitleBack/TitleBack";
import { withAuth } from "@/hocs/withAuth";
import { IReference } from "@/interfaces/references.interface";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSearch, FiEdit3 } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import classNames from "classnames";
import {
  IoMdArrowDropdown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { Listbox, Transition } from "@headlessui/react";
import { IEntryList } from "@/interfaces/entry-list.interface";
import { formatDate } from "@/utilities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import useDebounce from "@/hooks/use-debounce";
import { Tooltip } from "@/components/ui";
import { Modal } from "@/components/ui/Modal/Modal";
import { ModalEntryBlock } from "@/components/ui/ModalEntryBlock/ModalEntryBlock";

const pageSizes = [5, 10, 15];

const List = (props: any) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [referenceData, setReferenceData] = useState<IReference>();
  const [data, setData] = useState<IEntryList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [entryData, setEntryData] = useState<IEntryList[]>([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectBlockId, setSelectBlockId] = useState<number | any>();

  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    ReferencesService.getReference(props.id)
      .then((res) => {
        setReferenceData(res.data);
      })
      .catch((err) => console.error(err));

    ReferencesService.getEntryList(props.id)
      .then((res) => {
        const sortData = res.data.data.sort((a, b) => a.id - b.id);

        setEntryData(sortData);
        setData(sortData);
        setisLoading(true);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.data.error_message) {
          toast.error(err.response.data.error_message);
          setTimeout(() => {
            router.push("/account/references");
          }, 3000);
        }
      });
  }, []);

  const paginate = (
    items: IEntryList[],
    pageNumber: number,
    pageSize: number
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;

    return [...items].splice(startIndex, pageSize);
  };

  const deb = useDebounce(searchValue, 500);
  const listRef = useRef<HTMLUListElement | any>(null);

  useEffect(() => {
    if (entryData) {
      setData(
        data.filter((user) =>
          user.values[0].value.toLowerCase().includes(deb.toLowerCase())
        )
      );
    }
  }, [deb, entryData]);

  const dataCrop = paginate(data, currentPage, pageSize);

  const pageCount = Math.ceil(data.length / pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 200);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 200);
  };

  const firstItem = dataCrop?.[0]?.id;
  const lastItem = dataCrop?.[dataCrop.length - 1]?.id;

  useEffect(() => {
    setCurrentPage(1);

    if (listRef.current) {
      window.scrollTo(0, listRef.current?.lastElementChild?.offsetTop);
    }
  }, [pageSize]);

  useEffect(() => {
    if (searchValue === "") {
      setData(entryData);
    }
  }, [searchValue]);

  const handleCleanSearch = () => {
    setSearchValue("");

    if (entryData) {
      setData(entryData);
    }
  };

  const getEntryIndex = (id: any) => {
    return data.findIndex((item) => item.id === id);
  };

  return (
    <AdminLayout>
      <ToastContainer
        position="top-right"
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
      <>
        {isLoading ? (
          <>
            <TitleBack
              href="/account/references"
              name="Управление справочниками"
              subName={referenceData?.name}
            />
            <div className="mb-[35px] flex items-center justify-between">
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="inline-block w-full rounded-[5px] border border-[#D3E7FB] py-[12px] pl-[20px] pr-[62px] text-[14px] leading-[19px] text-[#0A091D] xl:w-[300px] 2xl:w-[422px]"
                  placeholder="Поиск справочника"
                />
                <FiSearch
                  className={classNames(
                    "absolute right-[20px] top-2/4 h-auto w-[22px] -translate-y-2/4 text-[#52A5FC] transition-all duration-300 ease-in-out",
                    {
                      ["-top-[15px] opacity-0"]: searchValue !== "",
                      ["top-2/4"]: searchValue === "",
                    }
                  )}
                />
                <button
                  type="button"
                  onClick={handleCleanSearch}
                  className={classNames(
                    "absolute top-2/4 -translate-y-2/4 opacity-0 transition-all duration-300 ease-in-out",
                    {
                      ["pointer-events-auto visible right-[16px] opacity-100"]:
                        searchValue !== "",
                      ["pointer-events-none invisible right-[0px] opacity-0"]:
                        searchValue === "",
                    }
                  )}
                >
                  <BiPlus className="h-auto w-[28px] rotate-45 text-[#52A5FC]" />
                </button>
              </div>
              <Link
                href={`/account/references/${props.id}/create`}
                className="grid w-fit grid-cols-[1fr_15px] items-center gap-x-[10px] rounded-[44px] bg-[#52A5FC] py-[14px] px-[30px] text-[14px] leading-[19px] text-white transition-colors duration-300 ease-in-out hover:bg-[#5ABB5E]"
              >
                <span>Добавить</span>
                <AiOutlinePlusCircle className="h-auto w-full" />
              </Link>
            </div>
            <div className="mb-[30px]">
              {data.length > 0 ? (
                <table className="w-full table-auto border-collapse text-sm text-[#0A091D]">
                  <thead>
                    <tr>
                      <th className="rounded-[10px_0_0_10px] bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-left text-[12px] uppercase leading-[15px]">
                        ID
                      </th>
                      {entryData[0].values.map((column) => (
                        <th
                          key={column.id}
                          className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-start text-[12px] uppercase leading-[15px]"
                        >
                          {column.column.name}
                        </th>
                      ))}
                      <th className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-right text-[12px] uppercase leading-[15px]">
                        Дата создания
                      </th>
                      <th className="bg-[#F7FBFF] px-[20px] pt-[14px] pb-[12px] text-right text-[12px] uppercase leading-[15px] last:rounded-[0_10px_10px_0]">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] leading-[17px]" ref={listRef}>
                    {dataCrop.map((entry) => (
                      <tr key={entry.id} className="group">
                        <td className="rounded-[10px_0_0_10px] px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                          {entry.id}
                        </td>
                        {data[getEntryIndex(entry.id)].values.map((value) => (
                          <td
                            key={value.id}
                            className="px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]"
                          >
                            {value.value}
                          </td>
                        ))}
                        <td className="px-[20px] pt-[14px] pb-[12px] text-end group-even:bg-[#FBFBFB]">
                          <div className="pr-[20px]">
                            {formatDate(entry.created_at)}
                          </div>
                        </td>
                        <td className="px-[20px] pt-[14px] pb-[12px] group-even:bg-[#FBFBFB]">
                          <div className="flex w-full justify-end gap-x-[9px] pr-[13px]">
                            <Tooltip label="Редактировать">
                              <Link
                                href={`/account/references/${props.id}/entry/${entry.id}/edit`}
                              >
                                <FiEdit3 className="h-[18px] w-auto text-[#52A5FC] transition-colors duration-300 ease-in-out hover:text-[#5ABB5E]" />
                              </Link>
                            </Tooltip>
                            <Tooltip label="Удалить">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectBlockId(entry.id);
                                }}
                              >
                                <AiOutlinePlusCircle className="h-[18px] w-auto rotate-45 text-[#F19797] transition-colors duration-300 ease-in-out hover:text-[#5ABB5E]" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">Записи отсуствуют</p>
              )}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ModalEntryBlock setIsOpen={setIsOpen} id={selectBlockId} />
            </Modal>
            {data.length > 0 && (
              <div className="flex items-center gap-x-[30px] text-[14px] leading-none">
                <p>
                  Общее кол-во справочников: <span>{entryData.length}</span>
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
                      из <span>{data.length}</span>
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
            )}
          </>
        ) : (
          <PreLoaderV2 />
        )}
      </>
    </AdminLayout>
  );
};

export default withAuth(List);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
