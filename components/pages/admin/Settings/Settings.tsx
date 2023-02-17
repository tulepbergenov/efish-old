import { InputNew } from "@/components/ui";
import { UserContext } from "@/context/user";
import { useContext } from "react";

export const Settings = () => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <h1 className="relative mb-[48px] pl-[15px] text-[18px] font-semibold uppercase leading-[24px] before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.60px]  before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
        Настройки
      </h1>
      <div className="mb-[25px] grid grid-cols-[24px_1fr] gap-x-[10px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="row-span-2"
        >
          <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke="#52A5FC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="#52A5FC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[18px] font-semibold leading-[22px]">
          {userData?.first_name}
        </p>
        <p className="text-[12px] leading-[15px] text-[#A1CAF3]">
          {userData?.role.name}
        </p>
      </div>
      <form className="max-w-[422px] pb-[70px]">
        <fieldset className="mb-[16px] flex flex-col gap-y-[14px]">
          <InputNew
            showPassword
            border
            textSize="sm"
            placeholder="Ваш старый пароль"
          />
          <InputNew
            showPassword
            border
            textSize="sm"
            placeholder="Ваш новый пароль"
          />
          <InputNew
            showPassword
            border
            textSize="sm"
            placeholder="Повторите новый пароль"
          />
        </fieldset>
        <p className="mb-[30px]">
          Новый пароль будет продублирован вам на почту.
        </p>
        <button
          type="submit"
          className="inline-block rounded-[44px] bg-[#5ABB5E] py-[15px] px-[30px] text-[14px] leading-[17px] text-white"
        >
          Сохранить
        </button>
      </form>
    </>
  );
};
