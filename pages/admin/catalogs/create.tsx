import CatalogsCreatePage from "@/components/pages/catalogs/CatalogsCreatePage/CatalogsCreatePage";
import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";

const CatalogsCreate: NextPage = () => {
  return (
    <AdminLayout>
      <CatalogsCreatePage />
    </AdminLayout>
  );
};

export default withAuth(CatalogsCreate);
