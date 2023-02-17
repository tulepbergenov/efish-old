import { UserManagment } from "@/components/pages/admin/UserManagment/UserManagment";
import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";

const AdminPage = () => {
  return (
    <AdminLayout>
      <UserManagment />
    </AdminLayout>
  );
};

export default withAuth(AdminPage);
