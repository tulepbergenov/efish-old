import { ReferencesService } from "@/api/services/references";
import { PreLoaderV2 } from "@/components/ui/PreLoaderV2/PreLoaderV2";
import { TitleBack } from "@/components/ui/TitleBack/TitleBack";
import { IEntryResponse } from "@/interfaces/entry-interface";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AdminLayout } from "../../../../../../layouts";

const EntryPageEdit = (props: any) => {
  const router = useRouter();
  const [entryData, setEntryData] = useState<IEntryResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ReferencesService.getEntry(props.id, props.entryId)
      .then((res) => {
        setEntryData(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <TitleBack
        name="Редактирование справочника"
        href={`/account/references/${props.id}/list`}
      />
      {isLoading === true ? (
        <form>
          <fieldset className="grid max-w-[660px] grid-cols-[1fr_422px] items-center gap-[30px]">
            {entryData &&
              entryData.values.map((value) => {
                return (
                  <Fragment key={value.id}>
                    <label className="text-[14px] font-semibold leading-[19px] text-[#0A091D]">
                      {value.column.name}
                    </label>
                    <input
                      type="text"
                      defaultValue={value.value}
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

export default EntryPageEdit;

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;
  const entryId = query.entryId;

  return {
    props: {
      id,
      entryId,
    },
  };
}
