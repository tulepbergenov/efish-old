import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import {
  IoIosArrowBack,
  IoMdClose,
  IoMdAddCircleOutline,
} from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import type { IModulesResponse } from "@/interfaces/modules.interface";
import { ReferencesService } from "@/api/services/references";
import { BsCheckLg } from "react-icons/bs";
import { RoleService } from "@/api/services/roles";
import { IRoleResponse } from "@/interfaces/roles.interface";
import { Modal } from "@/components/ui/Modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { AddCreateRefRoles } from "@/components/ui/AddCreateRefRoles/AddCreateRefRoles";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { referenceCreateSchema } from "@/constants/reference-create-schema";
import * as yup from "yup";
import { IReferenceCreate } from "@/interfaces/reference-create-schema";
import { PreLoader } from "@/components/ui/PreLoader/PreLoader";

const schema = yup.object().shape(referenceCreateSchema);

const ReferencesCreatePage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReferenceCreate>({
    resolver: yupResolver(schema),
    defaultValues: {
      columns: [],
      roles: [],
      mudules: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modules, setModules] = useState<IModulesResponse>();
  const [roles, setRoles] = useState<IRoleResponse>();
  // const [selectedModules, setSelectedModules] = useState<string[]>([]);
  // const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  // const [columnValue, setColumnValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | any>();

  useEffect(() => {
    ReferencesService.getModules()
      .then((res) => {
        setModules(res.data);
      })
      .catch((err) => console.error(err));

    RoleService.getRoles()
      .then((res) => {
        setRoles(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [fields]);

  const getNameRole = (id: number): string | undefined => {
    if (roles) {
      const searchIdArr = roles.findIndex((el) => el.id === id);

      return roles[searchIdArr].description;
    }
  };
  //
  //   const handleToggleModule = (value: string) => {
  //     if (modules) {
  //       if (selectedModules.some((el) => el === value)) {
  //         setSelectedModules(selectedModules.filter((el) => el !== value));
  //       } else {
  //         setSelectedModules([...selectedModules, value]);
  //       }
  //     }
  //   };
  //
  //   const handleToggleRole = (id: number) => {
  //     if (roles) {
  //       const searchItemId = roles.filter((el) => {
  //         if (el.id === id) {
  //           return { id };
  //         }
  //       })[0].id;
  //
  //       if (selectedRoles.some((el) => el === searchItemId)) {
  //         setSelectedRoles(selectedRoles.filter((el) => el !== searchItemId));
  //       } else {
  //         setSelectedRoles([...selectedRoles, searchItemId]);
  //       }
  //     }
  //   };

  //   const handleKeyAddColumn = (e: KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter" && columnValue !== "") {
  //       append({ value: columnValue });
  //       e.preventDefault();
  //       setColumnValue("");
  //     }
  //   };
  //
  //   const handleAddColumn = () => {
  //     if (columnValue !== "") {
  //       append({ value: columnValue });
  //       setColumnValue("");
  //     }
  //   };

  return (
    <AdminLayout>
      <div className="pb-[168px]">
        {isLoading === true ? (
          <>
            <div className="mb-[45px] grid grid-cols-[23px_1fr] items-center gap-x-[19px]">
              <Link href="/admin/references">
                <IoIosArrowBack className="h-auto w-full text-[#52A5FC]" />
              </Link>
              <h1 className="relative flex flex-col gap-y-[3px] pl-[17px] text-[18px] font-semibold uppercase leading-[22px] before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
                Создание справочника
              </h1>
            </div>
            <form>
              <fieldset className="grid max-w-[660px] grid-cols-[1fr_422px] items-center gap-[30px]">
                <label className="text-[14px] font-semibold leading-[17px]">
                  Название
                </label>
                <input
                  type="text"
                  className="inline-block w-full rounded-[5px] border border-[#D3E7FB] px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                  {...register("name")}
                />
                <label className="self-start pt-[13px] text-[14px] font-semibold leading-[17px]">
                  Столбцы в таблице
                </label>
                <div></div>
                {/* <fieldset className="flex w-full flex-col gap-y-[30px]">
                  <AnimatePresence>
                    {fields.map((field, index) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={field.id}
                        className="relative w-full"
                      >
                        <input
                          type="text"
                          className="inline-block w-full rounded-[5px] border border-[#D3E7FB] px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                          {...register(`column.${index}.value`)}
                        />
                        <div className="group absolute top-2/4 -right-[40px] z-10 -translate-y-2/4">
                          <button
                            type="button"
                            className="inline-block"
                            onClick={() => remove(index)}
                          >
                            <AiOutlinePlusCircle className="h-auto w-[24px] rotate-45 text-[#F19797] transition-colors duration-300 ease-in-out hover:text-[#5ABB5E]" />
                          </button>
                          <span className="pointer-events-none invisible absolute top-2/4 left-[50px] inline-block -translate-y-[15px] whitespace-nowrap rounded-[10px] bg-[#0A091D] py-[5px] px-[15px] text-[12px] leading-[15px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:left-[40px] group-hover:opacity-100">
                            Удалить
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="relative w-full">
                    <input
                      ref={inputRef}
                      value={columnValue}
                      onChange={(e) => setColumnValue(e.target.value)}
                      type="text"
                      className="inline-block w-full rounded-[5px] border border-[#D3E7FB] px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                      onKeyDown={handleKeyAddColumn}
                    />
                    <div className="group absolute top-2/4 -right-[40px] z-10 -translate-y-2/4">
                      <button
                        type="button"
                        className="inline-block"
                        onClick={handleAddColumn}
                      >
                        <AiOutlinePlusCircle className="h-auto w-[24px] text-[#52A5FC] transition-colors duration-300 ease-in-out hover:text-[#5ABB5E]" />
                      </button>
                      <span className="pointer-events-none invisible absolute top-2/4 left-[50px] inline-block -translate-y-[15px] whitespace-nowrap rounded-[10px] bg-[#0A091D] py-[5px] px-[15px] text-[12px] leading-[15px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:left-[40px] group-hover:opacity-100">
                        Добавить поле
                      </span>
                    </div>
                  </div>
                </fieldset> */}
                <label className="self-start pt-[13px] text-[14px] font-semibold leading-[17px]">
                  Модули
                </label>
                <section className="grid grid-cols-[1fr_17px] items-center gap-[15px] rounded-[5px] border border-[#D3E7FB] py-[22px] px-[20px]">
                  {/* {modules &&
                    modules.map((module) => (
                      <Fragment key={module.value}>
                        <p className="text-[14px] leading-[17px] text-[#0A091D]">
                          {module.name}
                        </p>
                        <button
                          type="button"
                          className={classNames(
                            "flex h-full w-full items-center justify-center rounded-[6px] border bg-white transition-colors duration-300 ease-in-out",
                            {
                              ["border-[#52A5FC] text-[#52A5FC] hover:border-[#F19797] hover:text-[#F19797]"]:
                                selectedModules.some(
                                  (el) => el === module.value
                                ) === true,
                              ["border-[#0A091D] hover:border-[#52A5FC]"]:
                                selectedModules.some(
                                  (el) => el === module.value
                                ) === false,
                            }
                          )}
                          onClick={() => handleToggleModule(module.value)}
                        >
                          {selectedModules.some(
                            (el) => el === module.value
                          ) && <BsCheckLg className="h-auto w-[10px]" />}
                        </button>
                      </Fragment>
                    ))} */}
                </section>
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
                    {/* <AnimatePresence>
                      {selectedRoles.length > 0 &&
                        selectedRoles.map((role) => (
                          <motion.button
                            key={role}
                            type="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex w-fit items-center gap-x-[10px] rounded-[44px] bg-[#52A5FC] px-[15px] py-[5px] text-center text-[12px] leading-[15px] text-white transition-colors duration-300 ease-in-out hover:bg-[#F19797]"
                            onClick={() => handleToggleRole(role)}
                          >
                            <span>{getNameRole(role)}</span>
                            <IoMdClose />
                          </motion.button>
                        ))}
                    </AnimatePresence> */}
                  </section>
                </div>
                <button
                  type="submit"
                  className="col-start-2 col-end-3 inline-block w-fit rounded-[44px] bg-[#5ABB5E] px-[30px] pt-[16px] pb-[14px] text-[14px] leading-[17px] text-white transition-colors duration-300 ease-in-out hover:bg-[#52A5FC]"
                >
                  Сохранить
                </button>
              </fieldset>
            </form>
          </>
        ) : (
          <div className="flex w-full justify-center">
            <PreLoader />
          </div>
        )}
      </div>
      {/* {roles && (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
          <AddCreateRefRoles
            onToggleRole={handleToggleRole}
            setIsOpen={setIsOpen}
            roles={roles}
            selectedRoles={selectedRoles}
          />
        </Modal>
      )} */}
    </AdminLayout>
  );
};

export default ReferencesCreatePage;
