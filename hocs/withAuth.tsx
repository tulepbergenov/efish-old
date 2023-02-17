import { FC, useEffect, useState } from "react";
import { getToken } from "@/utilities";
import Router from "next/router";

export const withAuth = <T extends Record<string, unknown>>(Component: FC) => {
  return (props: T): JSX.Element | null => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
      const token = getToken();

      if (!token) {
        Router.push("/login");
        return;
      }

      setAuth(true);
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
};
