import { ReferenceCreatePageContent } from "@/components/pages/references/ReferenceCreatePage/ReferenceCreatePage";
import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";

const ReferencesCreatePage = () => {
  return (
    <AdminLayout>
      <ReferenceCreatePageContent />
    </AdminLayout>
  );
};

export default withAuth(ReferencesCreatePage);
