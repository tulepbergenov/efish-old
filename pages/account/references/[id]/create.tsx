import { PreLoaderV2 } from "@/components/ui/PreLoaderV2/PreLoaderV2";
import { TitleBack } from "@/components/ui/TitleBack/TitleBack";
import { AdminLayout } from "@/layouts";
import { Fragment, useEffect, useState } from "react";
import { ReferencesService } from "@/api/services/references";
import { IReference } from "@/interfaces/references.interface";

const EntryPageCreate = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [referenceData, setReferenceData] = useState<IReference>();

  useEffect(() => {
    ReferencesService.getReference(props.id)
      .then((res) => {
        setReferenceData(res.data);
        setIsLoading(true);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <TitleBack
        name="Создане справочника"
        href={`/account/references/${props.id}/list`}
      />
      {isLoading === true ? (
        <form>
          <fieldset className="grid max-w-[660px] grid-cols-[1fr_422px] items-center gap-[30px]">
            {referenceData &&
              referenceData.columns.map((column) => {
                return (
                  <Fragment key={column.id}>
                    <label className="text-[14px] font-semibold leading-[19px] text-[#0A091D]">
                      {column.name}
                    </label>
                    <input
                      type="text"
                      className="inline-block w-full rounded-[5px] border border-[#D3E7FB] px-[20px] py-[12px] text-[14px] leading-[19px] text-[#0A091D]"
                    />
                  </Fragment>
                );
              })}
            <button
              type="submit"
              className="cols-end-3 col-start-2 inline-block w-fit rounded-[44px] bg-[#5ABB5E] px-[30px] py-[14px] text-[14px] leading-[19px] text-white transition-colors duration-300 ease-in-out hover:bg-[#52A5FC]"
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      ) : (
        <PreLoaderV2 />
      )}
    </AdminLayout>
  );
};

export default EntryPageCreate;

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}
