import { UserContext } from "@/context/user";
import { IUserData } from "@/interfaces/user.interface";
import { IUserTableData } from "@/interfaces/users.interface";
import "@/styles/globals.css";
import { getToken } from "@/utilities";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { AuthService } from "../api/services/user";

export default function App({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState<IUserData>();
  const [users, setUsers] = useState<IUserTableData[]>();
  const [token, setToken] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false);

  const memoStore = useMemo(() => {
    return {
      userData,
      setUserData,
      users,
      setUsers,
      token,
      setToken,
      roles,
      setRoles,
      isUsersLoading,
      setIsUsersLoading,
    };
  }, [userData, users, token, roles, isUsersLoading]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setToken(token);

      AuthService.getUserData(token)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>eFish</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <UserContext.Provider value={memoStore}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </AnimatePresence>
    </>
  );
}