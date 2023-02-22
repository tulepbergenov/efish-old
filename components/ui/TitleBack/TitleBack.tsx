import classNames from "classnames";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export const TitleBack = ({
  href,
  name,
  className,
}: {
  className?: string;
  href: string;
  name: string;
}) => {
  return (
    <div
      className={classNames(
        "mb-[45px] grid grid-cols-[23px_1fr] items-center gap-x-[19px]",
        className
      )}
    >
      <Link href={href}>
        <IoIosArrowBack className="h-auto w-full text-[#52A5FC]" />
      </Link>
      <h1 className="relative flex flex-col gap-y-[3px] pl-[17px] text-[18px] font-semibold uppercase leading-[22px] before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
        {name}
      </h1>
    </div>
  );
};
