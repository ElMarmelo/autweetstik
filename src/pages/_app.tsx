import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { NavBar } from "../components/NavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Autweetstik</title>
        <meta name="description" content="Twitter but barely works lmao" />
      </Head>
      <div className="flex items-start bg-au-dark-900 text-au-gray-100">
        <NavBar />
        <div className="min-h-screen flex-grow border-x sm:pr-4">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
