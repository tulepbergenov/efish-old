import { ReferencesService } from "@/api/services/references";
import { withAuth } from "@/hocs/withAuth";
import { IReferenceResponse } from "@/interfaces/reference.interface";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { IModulesResponse } from "@/interfaces/modules.interface";
import classNames from "classnames";
import { returnModule } from "@/utilities";

const ReferencePage: NextPage = (props: any) => {
  const [reference, setReference] = useState<IReferenceResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<IModulesResponse>();

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
  }, []);

  return (
    <AdminLayout>
      {reference && isLoading === true ? (
        <>
          <div className="mb-[45px] grid grid-cols-[23px_1fr] items-center gap-x-[19px]">
            <Link href="/account/references">
              <IoIosArrowBack className="h-auto w-full text-[#52A5FC]" />
            </Link>
            <h1 className="relative flex flex-col gap-y-[3px] pl-[17px] font-semibold uppercase before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
              <span className="text-[18px] leading-[22px]">
                Просмотр справочника
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
                disabled
                className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                defaultValue={reference.name}
              />
              <label className="self-start pt-[13px] text-[14px] font-semibold leading-[17px]">
                Столбцы в таблице
              </label>
              <fieldset className="flex w-full flex-col gap-y-[30px]">
                {reference.columns.map((column) => (
                  <input
                    key={column.id}
                    type="text"
                    disabled
                    className="inline-block w-full rounded-[5px] border border-[#D3E7FB] bg-white px-[20px] pt-[13px] pb-[11px] text-[14px] leading-[17px]"
                    defaultValue={column.name}
                  />
                ))}
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
                      disabled
                      className={classNames(
                        "flex h-[17px] w-full items-center justify-center rounded-[6px] border bg-white",
                        {
                          ["border-[#52A5FC] text-[#52A5FC]"]:
                            module.value ===
                            returnModule(reference, module.value),
                          ["border-[#0A091D]"]:
                            module.value !==
                            returnModule(reference, module.value),
                        }
                      )}
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
                <p className="mb-[15px] text-[14px] font-semibold leading-[17px]">
                  Разрешения
                </p>
                <ul className="flex flex-wrap items-center gap-[5px]">
                  {reference.roles.map((role) => (
                    <li
                      key={role.id}
                      className="inline-block rounded-[44px] bg-[#52A5FC] py-[5px] px-[15px] text-center text-[12px] leading-[15px] text-white"
                    >
                      {role.description}
                    </li>
                  ))}
                </ul>
              </div>
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
    </AdminLayout>
  );
};

export default withAuth(ReferencePage);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
