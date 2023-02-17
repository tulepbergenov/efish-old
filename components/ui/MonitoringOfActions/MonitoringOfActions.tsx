import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MonitoringOfActionsProps } from "./MonitoringOfActions.props";

export const MonitoringOfActions = ({
  setIsOpen,
  first_name,
  middle_name,
  last_name,
}: MonitoringOfActionsProps) => {
  const [afterDate, afterStartDate] = useState();
  const [beforeDate, beforeStartDate] = useState();

  return (
    <div className="w-[538px] overflow-hidden rounded-[10px]">
      <div className="flex flex-col items-center bg-[#52A5FC] py-[17px] text-[16px] leading-[20px] text-white">
        <p>Мониторинг действий пользователя:</p>
        <p className="font-bold">
          {first_name} {last_name} {middle_name}
        </p>
      </div>
      <div className="bg-white px-[60px] pt-[30px] pb-[50px]">
        <p className="mb-[15px] font-semibold">Выберите период:</p>
        <div className="mb-[30px] flex items-center">
          <div className="mr-[26px] flex items-center">
            <p className="mr-[20px]">c</p>
            <DatePicker
              className="w-full"
              selected={afterDate}
              onChange={(date) => afterStartDate(date)}
              customInput={<CustomInputBtn />}
            />
          </div>
          <div className="flex items-center">
            <p className="mr-[20px]">до</p>
            <DatePicker
              className="w-full"
              selected={beforeDate}
              onChange={(date) => beforeStartDate(date)}
              customInput={<CustomInputBtn />}
            />
          </div>
        </div>
        <p className="mb-[15px] font-semibold">Сформировать</p>
        <section className="flex items-center gap-x-[10px] text-white">
          <button
            type="button"
            className="transtions-colors inline-block rounded-[100px] border border-[#5ABB5E] bg-[#5ABB5E] py-[14px] px-[29px] duration-300 ease-in-out hover:bg-white hover:text-[#5ABB5E]"
          >
            xls.
          </button>
          <button
            type="button"
            className="transtions-colors inline-block rounded-[100px] border border-[#5ABB5E] bg-[#5ABB5E] py-[14px] px-[29px] duration-300 ease-in-out hover:bg-white hover:text-[#5ABB5E]"
          >
            pdf.
          </button>
          <button
            type="button"
            className="transtions-colors inline-block rounded-[100px] border border-[#5ABB5E] bg-[#5ABB5E] px-[29px] py-[14px] duration-300 ease-in-out hover:bg-white hover:text-[#5ABB5E]"
          >
            docx.
          </button>
          <button
            type="button"
            className="inline-block rounded-[100px] bg-[#0A091D] px-[30px] py-[15px] text-white"
            onClick={() => setIsOpen(false)}
          >
            Закрыть
          </button>
        </section>
      </div>
    </div>
  );
};

const CustomInputBtn = forwardRef(({ value, onClick }, ref) => (
  <button
    className="relative flex min-h-[43px] min-w-[170px] items-center rounded-[5px] border border-[#D3E7FB] bg-white py-[10px] pl-[13px] pr-[60px]"
    onClick={onClick}
    ref={ref}
  >
    <span>{value ? <>{value.replace(/\//g, ".")}</> : ""}</span>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-2/4 right-[20px] -translate-y-2/4"
    >
      <path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="#52A5FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke="#52A5FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke="#52A5FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        stroke="#52A5FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
));
