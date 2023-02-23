import { Dispatch, SetStateAction } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const ModalEntryBlock = ({
  setIsOpen,
  id,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: any;
}) => {
  return (
    <div className="w-[538px]">
      <div className="bg-[#F19797] py-[17px] text-white">
        <p className="text-center">Вы уверены что хотите удалить данные?</p>
      </div>
      <div className="flex items-center justify-center gap-x-[46px] pt-[37px] pb-[49px]">
        <button
          type="button"
          className="grid w-fit grid-cols-[20px_1fr] gap-x-[10px] font-medium text-[#F19797]"
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
      </div>
    </div>
  );
};
