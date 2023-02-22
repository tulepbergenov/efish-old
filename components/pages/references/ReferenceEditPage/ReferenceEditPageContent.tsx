import styles from "./ReferenceEditPageContent.module.css";
import classNames from "classnames";
import { TitleBack } from "@/components/ui/TitleBack/TitleBack";
import { referenceCreateSchema } from "../ReferenceCreatePage.schema";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { IRole } from "@/interfaces/roles.interface";
import { IModule } from "@/interfaces/modules.interface";
import { RoleService } from "@/api/services/roles";
import { ReferencesService } from "@/api/services/references";
import { Modal } from "@/components/ui/Modal/Modal";
import { PreLoader } from "@/components/ui/PreLoader/PreLoader";
import { IReference } from "@/interfaces/references.interface";

interface IData {
  id?: string;
  value: string;
}

interface IFormData {
  name: string;
  columns: IData[];
  modules: IData[];
  roles: IData[];
}

const schema = yup.object().shape(referenceCreateSchema);

export const ReferenceEditPageContent = (props: any) => {
  const [allRoles, setAllRoles] = useState<IRole[]>([]);
  const [allModules, setAllModules] = useState<IModule[]>([]);
  const [columnValue, setColumnValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reference, setReference] = useState<IReference>();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ReferencesService.getReference(props.id)
      .then((res) => {
        setReference(res.data);
      })
      .catch((err) => console.error(err));

    RoleService.getRoles()
      .then((res) => {
        setAllRoles(res.data);
        setTimeout(() => {
          setIsLoading(true);
        }, 1500);
      })
      .catch((err) => console.error(err));

    ReferencesService.getModules()
      .then((res) => {
        setAllModules(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      columns: undefined,
      roles: undefined,
      modules: undefined,
    },
  });

  const {
    fields: columnFields,
    append: appendColumn,
    remove: removeColumn,
  } = useFieldArray({
    control,
    name: "columns",
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  const {
    fields: roleFields,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    control,
    name: "roles",
  });

  const onSubmit = (data: IFormData) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("React Hook Form Erros", errors);
  }, [errors]);

  const getNameRole = (id: any) => {
    const index = allRoles.findIndex((role) => role.id === id);

    return allRoles[index].description;
  };

  const handleKeyAddColumn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") {
      return;
    }

    if (columnValue !== "") {
      e.preventDefault();
      appendColumn({
        value: columnValue,
      });

      setColumnValue("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [columnValue]);

  useEffect(() => {
    if (reference) {
      setValue("name", reference.name);

      const mRoles = reference.roles.map((role) => {
        return {
          value: role.id,
        };
      });

      setValue("roles", mRoles as any);

      const mColumns = reference.columns.map((column) => {
        return {
          value: column.name,
        };
      });

      setValue("columns", mColumns as any);

      const mModules = reference.modules.map((module) => {
        return {
          value: module,
        };
      });

      setValue("modules", mModules);
    }
  }, [reference]);

  return (
    <>
      {isLoading ? (
        <>
          <TitleBack
            className={styles.title}
            href="/account/references"
            name="Редактирование справочника"
            subName={reference?.name}
          />
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <fieldset className={styles.fieldset}>
              <label className={styles.label}>Название</label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  className={styles.input}
                />
                <p className="absolute -bottom-[20px] left-0 mt-[5px] text-[14px] leading-[19px] text-[#F19797]">
                  {errors.name?.message}
                </p>
              </div>
              <label
                className={classNames(styles.label, styles.label_alignTop)}
              >
                Столбцы в таблице
              </label>
              <fieldset className={styles.columns}>
                {columnFields.map((column, index) => (
                  <div key={column.id} className="relative">
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        {...register(`columns.${index}.value`, {
                          required: true,
                        })}
                        className={styles.input}
                      />
                      <div className={styles.btnDeleteWrapper}>
                        <button
                          type="button"
                          onClick={() => removeColumn(index)}
                          className={styles.btnDelete}
                        >
                          <AiOutlinePlusCircle
                            className={styles.btnDeleteIcon}
                          />
                        </button>
                        <span className={styles.btnDeleteTooltip}>
                          Удалить поле
                        </span>
                      </div>
                    </div>
                    {errors.columns && (
                      <p className="absolute left-0 -bottom-[20px] text-[14px] leading-[19px] text-[#F19797]">
                        {errors.columns[index]?.value?.message}
                      </p>
                    )}
                  </div>
                ))}
                <div className={styles.inputWrapper}>
                  <div className="relative">
                    <input
                      type="text"
                      value={columnValue}
                      onChange={(e) => setColumnValue(e.target.value)}
                      className={styles.input}
                      onKeyDown={handleKeyAddColumn}
                      ref={inputRef}
                    />
                    <div className={styles.btnAddWrapper}>
                      <button
                        type="button"
                        onClick={() => {
                          if (columnValue !== "") {
                            appendColumn({ value: columnValue });
                            setColumnValue("");
                          }
                        }}
                        className={styles.btnAdd}
                      >
                        <AiOutlinePlusCircle className={styles.btnAddIcon} />
                      </button>
                      <span className={styles.btnAddTooltip}>
                        Добавить поле
                      </span>
                    </div>
                  </div>
                  {errors.columns && (
                    <p className="text-[14px] leading-[19px] text-[#F19797]">
                      {errors.columns.message}
                    </p>
                  )}
                </div>
              </fieldset>
              <label
                className={classNames(styles.label, styles.label_alignTop)}
              >
                Модули
              </label>
              <div>
                <ul className={styles.modules}>
                  {allModules.length > 0 &&
                    allModules.map((module) => (
                      <li key={module.value} className={styles.module}>
                        <p
                          className={classNames(styles.moduleName, {
                            [styles.moduleName_active]: moduleFields.some(
                              (moduleF) => moduleF.value === module.value
                            ),
                          })}
                        >
                          {module.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              moduleFields.some(
                                (moduleF) =>
                                  moduleF.value === (module.value as any)
                              )
                            ) {
                              const index = moduleFields.findIndex(
                                (moduleF) =>
                                  moduleF.value === (module.value as any)
                              );

                              removeModule(index);
                            } else {
                              appendModule({ value: module.value as any });
                            }
                          }}
                          className={classNames(styles.moduleToggleBtn, {
                            [styles.moduleToggleBtn_active]: moduleFields.some(
                              (moduleF) => moduleF.value === module.value
                            ),
                          })}
                        >
                          <BsCheck />
                        </button>
                      </li>
                    ))}
                </ul>
                {errors.modules && (
                  <p className="col-start-2 col-end-3 text-[14px] leading-[19px] text-[#F19797]">
                    {errors.modules.message}
                  </p>
                )}
              </div>
              <div className="col-start-2 col-end-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className={styles.btnAddRole}
                >
                  <span>Роль</span>
                  <AiOutlinePlusCircle className={styles.btnAddRoleIcon} />
                </button>
                {errors.roles && (
                  <p className="mt-[10px] text-[14px] leading-[19px] text-[#F19797]">
                    {errors.roles.message}
                  </p>
                )}
              </div>
              <section className={styles.roles}>
                {roleFields.map((role, index) => (
                  <button
                    key={role.id}
                    name={`roles[${index}].id`}
                    type="button"
                    onClick={() => removeRole(index)}
                    className={styles.role}
                  >
                    <span>{getNameRole(role.value)}</span>
                    <AiOutlinePlusCircle className={styles.roleBtnDelete} />
                  </button>
                ))}
              </section>
              <button type="submit" className={styles.btnSubmit}>
                Создать
              </button>
            </fieldset>
          </form>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.modalBody}>
              {allRoles.length > 0 &&
                allRoles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    className={styles.modalRole}
                    onClick={() => {
                      if (
                        roleFields.some(
                          (roleF) => roleF.value === (role.id as any)
                        )
                      ) {
                        const index = roleFields.findIndex(
                          (roleF) => roleF.value === (role.id as any)
                        );

                        removeRole(index);
                      } else {
                        appendRole({ value: role.id as any });
                      }
                    }}
                  >
                    {role.description}
                  </button>
                ))}
            </div>
          </Modal>
        </>
      ) : (
        <div className="flex w-full justify-center">
          <PreLoader />
        </div>
      )}
    </>
  );
};
