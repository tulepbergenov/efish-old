import { PreLoaderV2 } from "@/components/ui/PreLoaderV2/PreLoaderV2";
import { TitleBack } from "@/components/ui/TitleBack/TitleBack";
import { AdminLayout } from "@/layouts";
import { Fragment, useEffect, useState } from "react";
import { ReferencesService } from "@/api/services/references";
import { IReference } from "@/interfaces/references.interface";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { convertToFormData } from "@/utilities/form-data";
import { useRouter } from "next/router";
import { IEntryListResponse } from "@/interfaces/entry-list.interface";
import { IEntryResponse } from "@/interfaces/entry-interface";

export const entrySchema = yup.object().shape({
  values: yup.array(
    yup.object().shape({
      id: yup.string(),
      columnId: yup.number(),
      value: yup.string().required("Вы не ввели имя столбца"),
      name: yup.string(),
    })
  ),
});

const schema = entrySchema;

interface IEntry {
  columnId: number;
  value: string;
  name: string;
}

export interface IEntryData {
  values: IEntry[];
}

const EntryPageCreate = (props: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [referenceData, setReferenceData] = useState<IReference>();
  const [entryData, setEntryData] = useState<IEntryResponse>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IEntryData>({
    resolver: yupResolver(schema),
  });

  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: "values",
  });

  useEffect(() => {
    ReferencesService.getEntry(props.id, props.entryId)
      .then((res) => {
        setEntryData(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });

    ReferencesService.getReference(props.id)
      .then((res) => {
        setReferenceData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data: IEntryData) => {
    const submitData = convertToFormData(data.values as any);

    ReferencesService.createEntry(submitData, props.id)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);

        setTimeout(() => {
          router.push(`/account/references/${props.id}/list`);
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.error_message);

        console.log(err);
      });

    console.log(submitData);
  };

  const getIndex = (columnId: any) => {
    if (entryData) {
      return entryData?.values.findIndex((col) => col.column_id === columnId);
    }
  };

  useEffect(() => {
    if (referenceData) {
      const mValues: any = referenceData.columns.map((column) => {
        return {
          columnId: column.id,
          value: entryData?.values[getIndex(column.id)].value,
          name: column.name,
        };
      });

      setValue("values", mValues as any);
    }
  }, [referenceData, entryData]);

  return (
    <AdminLayout>
      <TitleBack
        name="Редактирование справочника"
        subName={referenceData?.name}
        href={`/account/references/${props.id}/list`}
      />
      {isLoading === true ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="grid max-w-[660px] grid-cols-[1fr_422px] items-center gap-[30px]">
            {valueFields.map((column, index) => {
              return (
                <Fragment key={column.id}>
                  <label
                    className={classNames(
                      "text-[14px] font-semibold leading-[19px] text-[#0A091D]"
                    )}
                  >
                    {column.name}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register(`values.${index}.value`, {
                        required: true,
                      })}
                      className={classNames(
                        "inline-block w-full rounded-[5px] border border-[#D3E7FB] px-[20px] py-[12px] text-[14px] leading-[19px] text-[#0A091D]"
                      )}
                    />
                    {errors.values && (
                      <p className="absolute left-0 -bottom-[20px] text-[14px] leading-[19px] text-[#F19797]">
                        {errors.values[index]?.value?.message}
                      </p>
                    )}
                  </div>
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
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
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
  const entryId = query.entryId;

  return {
    props: {
      id,
      entryId,
    },
  };
}
