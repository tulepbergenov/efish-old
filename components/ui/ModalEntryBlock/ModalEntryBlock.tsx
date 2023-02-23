import { ReferencesService } from "@/api/services/references";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const ModalEntryBlock = ({
  setIsOpen,
  columnId,
  entryId,
  setEntryData,
  setData,
  toast,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<boolean>>;
  setEntryData: Dispatch<SetStateAction<boolean>>;
  columnId: any;
  entryId: any;
  toast: any;
}) => {
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteEntry = () => {
    ReferencesService.deleteEntry(columnId, entryId)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setIsDelete(true);

          ReferencesService.getEntryList(columnId)
            .then((res) => {
              const sortData = res.data.data.sort((a, b) => a.id - b.id);
              setIsOpen(false);
              setEntryData(sortData as any);
              setData(sortData as any);
            })
            .catch((err) => {
              console.error(err);
            });
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error_message);
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
      });
  };

  return (
    <>
      <div className="w-[538px]">
        <div
          className={classNames("py-[17px] text-white", {
            ["bg-[#5ABB5E]"]: isDelete === true,
            ["bg-[#F19797] "]: isDelete !== true,
          })}
        >
          <p className="text-center">Вы уверены что хотите удалить данные?</p>
        </div>
        <div className="flex items-center justify-center gap-x-[46px] pt-[37px] pb-[49px]">
          {isDelete ? (
            <p className="text-[#5ABB5E]">Вы успешно удалили запись</p>
          ) : (
            <>
              <button
                type="button"
                className="grid w-fit grid-cols-[20px_1fr] gap-x-[10px] font-medium text-[#F19797]"
                onClick={handleDeleteEntry}
              >
                <AiOutlinePlusCircle className="h-auto w-[20px] rotate-45" />
                <span>Удалить</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#52A5FC]"
              >
                Отмена
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
