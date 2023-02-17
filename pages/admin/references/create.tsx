import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { useState } from "react";
import { PreLoader } from "@/components/ui/PreLoader/PreLoader";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const ReferenceCreatePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AdminLayout>
      <div className="mb-[165px]">
        {isLoading === true ? (
          <div className="mb-[45px] grid grid-cols-[23px_1fr] items-center gap-x-[19px]">
            <Link href="/admin/references">
              <IoIosArrowBack className="h-auto w-full text-[#52A5FC]" />
            </Link>
            <h1 className="relative flex flex-col gap-y-[3px] pl-[17px] text-[18px] font-semibold uppercase leading-[22px] before:absolute before:top-2/4 before:left-0 before:h-full before:w-[3.6px] before:-translate-y-2/4 before:bg-[#52A5FC] before:content-['']">
              Создание справочника
            </h1>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <PreLoader />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(ReferenceCreatePage);
