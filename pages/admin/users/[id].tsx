import { UsersService } from "@/api/services/userList";
import { Input } from "@/components/ui";
import { Heading } from "@/components/ui/Heading/Heading";
import { withAuth } from "@/hocs/withAuth";
import { IUserInfoResponse } from "@/interfaces/user-info.interface";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import { getToken } from "@/utilities";
import { useEffect, useState } from "react";

const UserPage = (props: any) => {
  const [userInfo, setUserInfo] = useState<IUserInfoResponse | null>(null);

  useEffect(() => {
    const token = getToken();

    if (token) {
      UsersService.getUserInfo(props.id, token)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <AdminLayout>
      <Heading
        as="h1"
        size="sm"
        uppercase
        line
        url="/admin"
        className="mb-[45px]"
      >
        Информация о пользователе
      </Heading>
      {Boolean(userInfo) && (
        <fieldset className="grid max-w-[660px] grid-cols-[206px_1fr] gap-[30px] text-[14px] font-semibold leading-[17px] text-[#0A091D]">
          <label>Роль</label>
          <Input
            type="text"
            value={userInfo?.role.description}
            disabled
            className="disabled:bg-white"
            style={{ boxShadow: "none" }}
          />
          <label>ФИО</label>
          <Input
            type="text"
            value={`${userInfo?.first_name} ${userInfo?.last_name}`}
            disabled
            className="disabled:bg-white"
            style={{ boxShadow: "none" }}
          />
          <label>Название структурного подразделения</label>
          <Input
            type="text"
            value={userInfo?.role.description}
            disabled
            className="disabled:bg-white"
            style={{ boxShadow: "none" }}
          />
          <label>ИИН</label>
          <Input
            type="text"
            value={userInfo?.iin_bin}
            disabled
            className="shadow-none disabled:bg-white"
            style={{ boxShadow: "none" }}
          />
          <label>Электронная почта</label>
          <Input
            type="text"
            value={userInfo?.email}
            disabled
            className="disabled:bg-white"
            style={{ boxShadow: "none" }}
          />
        </fieldset>
      )}
    </AdminLayout>
  );
};

export default withAuth(UserPage);

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
