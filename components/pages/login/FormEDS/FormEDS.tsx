import { Button } from "@/components/ui";
import { ChangeEvent, FC, useRef } from "react";

export const FormEDS: FC = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const fileUploaded = e.target.files?.[0];
  };

  return (
    <form className="mb-[30px] flex flex-col items-center">
      <input
        type="file"
        className="hidden"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <button
        type="button"
        className="group mb-[30px] flex w-full items-center justify-center gap-x-[20px] rounded-[5px] bg-white py-[14px] text-[16px] leading-[21px] shadow-[0px_8px_50px_rgba(210,232,254,0.4)] transition-colors duration-300 ease-in-out hover:bg-[#52A5FC] hover:text-white"
        onClick={handleClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#52A5FC] transition-colors duration-300 ease-in-out group-hover:text-white"
        >
          <path
            d="M20.0001 16.2C20.7846 15.6572 21.3762 14.8791 21.6896 13.9781C22.0031 13.0771 22.022 12.0998 21.7438 11.1873C21.4656 10.2748 20.9047 9.47429 20.1419 8.9014C19.3791 8.32851 18.454 8.01285 17.5001 7.99999H15.7001C15.3978 6.98027 14.8671 6.04283 14.1484 5.25888C13.4296 4.47493 12.5416 3.86507 11.5519 3.47562C10.5622 3.08617 9.49676 2.92738 8.43649 3.01129C7.37622 3.09521 6.34901 3.41963 5.43288 3.95991C4.51674 4.5002 3.73577 5.24214 3.14926 6.1294C2.56276 7.01666 2.18615 8.0259 2.04804 9.08048C1.90993 10.1351 2.01394 11.2072 2.35218 12.2156C2.69042 13.224 3.25399 14.142 4.0001 14.9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 17L12 21L16 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Загрузите сертификат</span>
      </button>
      <Button appearance="blue" type="submit">
        Войти
      </Button>
    </form>
  );
};
