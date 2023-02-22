import { ReferencesService } from "@/api/services/references";
import { withAuth } from "@/hocs/withAuth";
import { IReferenceResponse } from "@/interfaces/reference.interface";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoIosArrowBack,
  IoMdAddCircleOutline,
  IoMdClose,
} from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { IModulesResponse } from "@/interfaces/modules.interface";
import classNames from "classnames";
import { returnModule } from "@/utilities";
import { RoleService } from "@/api/services/roles";
import { IRoleResponse } from "@/interfaces/roles.interface";
import { Modal } from "@/components/ui/Modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { AddRoles } from "@/components/ui/AddRoles/AddRoles";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ReferenceEditPage: NextPage = (props: any) => {
  const [reference, setReference] = useState<IReferenceResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<IModulesResponse>();
  const [allRoles, setAllRoles] = useState<IRoleResponse>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newColumns, setNewColumns] = useState<string[]>([]);
  const [newColumnInput, setNewColumnInput] = useState<string>("");

  useEffect(() => {
    ReferencesService.getReference(props.id)
      .then((res) => {
        setReference(res.data);
        if (res) {
          setTimeout(() => {
            setIsLoading(true);
          }, 2400);
        }
      })
      .catch((err) => console.error(err));

    ReferencesService.getModules()
      .then((res) => {
        setModules(res.data);
      })
      .catch((err) => console.error(err));

    RoleService.getRoles()
      .then((res) => {
        setAllRoles(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteRole = (id: any) => {
    if (reference) {
      const currRole = reference.roles.findIndex((role) => role.id === id);

      if (reference.roles[currRole].id === id) {
        setReference({
          ...reference,
          roles: reference.roles.filter((role) => role.id !== id),
        });
      }
    }
  };

  const handleAddRole = (id: any) => {
    if (allRoles) {
      const newItem = allRoles.find((role) => role.id === id);

      setReference({
        ...reference,
        roles: [...reference.roles, newItem],
      });
    }
  };

  const lockRoleItem = (id: any) => {
    if (reference) {
      const currRole = reference.roles.findIndex((role) => role.id === id);

      if (allRoles) {
        if (reference.roles[currRole]?.id === id) {
          return true;
        }
      }
    }

    return false;
  };

  const handleToggleModule = (value: string) => {
    if (reference) {
      if (reference.modules.some((el) => el === value)) {
        setReference({
          ...reference,
          modules: reference.modules.filter((el) => el !== value),
        });
      } else {
        setReference({ ...reference, modules: [...reference.modules, value] });
      }
    }
  };

  const handleCreateKeyTable = (e: any) => {
    if (e.key === "Enter" && newColumnInput !== "") {
      setNewColumns([...newColumns, newColumnInput]);
      setNewColumnInput("");
    }
  };

  const handleCreateTable = () => {
    if (newColumnInput !== "") {
      setNewColumns([...newColumns, newColumnInput]);
      setNewColumnInput("");
    }
  };

  const handleDeleteNewColumn = (id: any) => {
    if (newColumns) {
      setNewColumns((prevCols) => prevCols.filter((col) => col !== id));
    }
  };

  const handleDeleteRefCol = (id: any) => {
    if (reference) {
      setReference({
        ...reference,
        columns: reference.columns.filter((el) => el.id !== id),
      });
    }
  };

  return (
    <AdminLayout>
      {reference && allRoles && modules && isLoading === true ? (
        <>
          <div className="mb-[45px] grid grid-cols-[23px_1fr] items-center gap-x-[19px]">
            <Link href="/account/references">
              <IoIosArrowBack className="h-auto w-full text-[#52A5FC]" />
            </Link>
            <h1 className="relative flex flex-col gap-y-[3px] pl-[17px] font-semibold uppercase before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
              <span className="text-[18px] leading-[22px]">
                Редактирование справочника
              </span>
              <span className="text-[14px] leading-[17px] text-[#52A5FC]">
                {reference.name}
              </span>
            </h1>
          </div>
          <form className="max-w-[660px]">
            <fieldset className="grid grid-cols-[1fr_422px] items-center gap-[30px]">
              <label className="text-[14px] font-semibold leading-[17px]">
                Название
              </label>
              <input
                type="text"
                className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                defaultValue={reference.name}
              />
              <label className="self-start pt-[13px] text-[14px] font-semibold leading-[17px]">
                Столбцы в таблице
              </label>
              <fieldset className="flex w-full flex-col gap-y-[30px]">
                {reference.columns.map((column) => (
                  <div key={column.id} className="relative">
                    <input
                      type="text"
                      className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                      defaultValue={column.name}
                    />
                    <div className="group absolute top-2/4 -right-[35px] z-10 -translate-y-2/4">
                      <button
                        type="button"
                        className="inline-block"
                        onClick={() => handleDeleteRefCol(column.id)}
                      >
                        <AiOutlinePlusCircle className="h-auto w-[24px] rotate-45 text-[#F19797]" />
                      </button>
                      <span className="pointer-events-none invisible absolute top-2/4 z-10 inline-block translate-x-[20px] -translate-y-[15px] whitespace-nowrap rounded-[10px] bg-[#0A091D] py-[5px] px-[15px] text-[12px] leading-[15px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-x-[10px] group-hover:opacity-100">
                        Удалить
                      </span>
                    </div>
                  </div>
                ))}
                {newColumns &&
                  newColumns.map((column) => (
                    <div key={column} className="relative">
                      <input
                        type="text"
                        className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                        defaultValue={column}
                      />
                      <div className="group absolute top-2/4 -right-[35px] z-10 -translate-y-2/4">
                        <button
                          type="button"
                          className="inline-block"
                          onClick={() => handleDeleteNewColumn(column)}
                        >
                          <AiOutlinePlusCircle className="h-auto w-[24px] rotate-45 text-[#F19797]" />
                        </button>
                        <span className="pointer-events-none invisible absolute top-2/4 z-10 inline-block translate-x-[20px] -translate-y-[15px] whitespace-nowrap rounded-[10px] bg-[#0A091D] py-[5px] px-[15px] text-[12px] leading-[15px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-x-[10px] group-hover:opacity-100">
                          Удалить
                        </span>
                      </div>
                    </div>
                  ))}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={newColumnInput}
                    onChange={(e) => setNewColumnInput(e.target.value)}
                    className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                    placeholder="Введите название новой колонки"
                    onKeyDown={handleCreateKeyTable}
                  />
                  <div className="group absolute top-2/4 -right-[35px] z-10 -translate-y-2/4">
                    <button
                      type="button"
                      className="inline-block"
                      onClick={handleCreateTable}
                    >
                      <AiOutlinePlusCircle className="h-auto w-[24px] text-[#52A5FC]" />
                    </button>
                    <span className="pointer-events-none invisible absolute top-2/4 z-10 inline-block translate-x-[20px] -translate-y-[15px] whitespace-nowrap rounded-[10px] bg-[#0A091D] py-[5px] px-[15px] text-[12px] leading-[15px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-x-[10px] group-hover:opacity-100">
                      Добавить поле
                    </span>
                  </div>
                </div>
              </fieldset>
              <label className="self-start pt-[13px] text-[14px] font-semibold leading-[17px]">
                Модули
              </label>
              <ul className="flex flex-col gap-y-[15px] rounded-[5px] border border-[#D3E7FB] bg-white py-[12px] px-[20px] text-[14px] leading-[17px]">
                {modules?.map((module) => (
                  <li
                    key={module.value}
                    className="grid w-full grid-cols-[1fr_17px] gap-x-[15px]"
                  >
                    <p
                      className={classNames({
                        ["text-[#52A5FC]"]:
                          module.value ===
                          returnModule(reference, module.value),
                      })}
                    >
                      {module.name}
                    </p>
                    <button
                      type="button"
                      className={classNames(
                        "flex h-[17px] w-full items-center justify-center rounded-[6px] border bg-white transition-colors duration-300 ease-in-out",
                        {
                          ["border-[#52A5FC] text-[#52A5FC] hover:border-[#F19797] hover:text-[#F19797]"]:
                            module.value ===
                            returnModule(reference, module.value),
                          ["border-[#0A091D] hover:border-[#52A5FC]"]:
                            module.value !==
                            returnModule(reference, module.value),
                        }
                      )}
                      onClick={() => handleToggleModule(module.value)}
                    >
                      {module.value ===
                        returnModule(reference, module.value) && (
                        <BsCheckLg className="h-auto w-[10px]" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="col-start-2 col-end-3">
                <button
                  type="button"
                  className="group mb-[15px] flex items-center gap-x-[10px]"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="text-[14px] font-semibold leading-[17px]">
                    Роль
                  </span>
                  <IoMdAddCircleOutline className="h-auto w-[20px] text-[#52A5FC] transition-colors duration-300 ease-in-out group-hover:text-[#5ABB5E]" />
                </button>
                <section className="flex flex-wrap items-center gap-[5px]">
                  <AnimatePresence>
                    {reference.roles.map((role) => (
                      <motion.button
                        key={role.id}
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex w-fit items-center gap-x-[10px] rounded-[44px] bg-[#52A5FC] px-[15px] py-[5px] text-center text-[12px] leading-[15px] text-white transition-colors duration-300 ease-in-out hover:bg-[#F19797]"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <span>{role.description}</span>
                        <IoMdClose />
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </section>
              </div>
              <button
                type="button"
                className="col-start-2 col-end-2 inline-block w-fit rounded-[44px] bg-[#5ABB5E] px-[30px] pt-[16px] pb-[14px] text-[14px] leading-[17px] text-white transition-colors duration-300 ease-in-out hover:bg-[#52A5FC]"
              >
                Сохранить
              </button>
            </fieldset>
          </form>
        </>
      ) : (
        <div className="flex w-full justify-center">
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
      {allRoles && reference && (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
          <AddRoles
            onAddRole={handleAddRole}
            lockRoleItem={lockRoleItem}
            setIsOpen={setIsOpen}
            roles={allRoles}
          />
        </Modal>
      )}
    </AdminLayout>
  );
};

export default withAuth(ReferenceEditPage);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
