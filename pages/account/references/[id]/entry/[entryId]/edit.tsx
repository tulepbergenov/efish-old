import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { useRouter } from "next/router";

const Hello1 = (props: any) => {
  const router = useRouter();
  const { entryId, id } = router.query;

  return (
    <AdminLayout>
      {id}Entry page {entryId}
    </AdminLayout>
  );
};

export default Hello1;
