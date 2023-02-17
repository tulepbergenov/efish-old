import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";
import { CatalogsPage } from "@/components/pages/catalogs/CatalogsPage/CatalogsPage";

const Catalogs: NextPage = () => {
  return (
    <AdminLayout>
      <CatalogsPage />
    </AdminLayout>
  );
};

export default withAuth(Catalogs);
