import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { DesktopNavbar } from "../components/DesktopNavbar";
import { useEffect, useState } from "react";
import { MobileNavbar } from "~/components/MobileNavbar";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Autweetstik</title>
        <meta name="description" content="Twitter but barely works lmao" />
      </Head>
      <div className="flex items-start bg-au-dark-900 text-au-gray-100">
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        <div className="min-h-screen flex-grow border-x sm:pr-4">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
