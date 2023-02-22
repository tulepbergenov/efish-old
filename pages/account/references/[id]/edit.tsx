import { ReferenceEditPageContent } from "@/components/pages/references/ReferenceEditPage/ReferenceEditPageContent";
import { withAuth } from "@/hocs/withAuth";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";

const ReferenceEdit = (props: any) => {
  return (
    <AdminLayout>
      <ReferenceEditPageContent {...props} />
    </AdminLayout>
  );
};

export default withAuth(ReferenceEdit);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
