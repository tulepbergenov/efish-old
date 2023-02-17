import { Settings } from "@/components/pages/admin/Settings/Settings";
import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import type { NextPage } from "next";

const SettingsPage: NextPage = () => {
  return (
    <AdminLayout>
      <Settings />
    </AdminLayout>
  );
};

export default withAuth(SettingsPage);
