import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { RiHome2Fill, RiUserFill } from "react-icons/ri";
import { ImInfinite } from "react-icons/im";

export function DesktopNavbar() {
  const session = useSession();
  const user = session.data?.user;
  const navLinkStyles =
    "flex justify-between text-2xl font-semibold px-5 py-2 hover:bg-au-gray-100/30 rounded-full transition inline-flex items-center";
  return (
    <div className="flex h-screen">
      <nav className="top-0 px-2 py-4">
        <h2 className="m-2 inline-flex justify-center rounded-full p-5 text-3xl font-semibold transition hover:cursor-pointer hover:bg-au-gray-100/30">
          Autweetstik <ImInfinite className="ml-2" />{" "}
        </h2>
        <ul className="flex flex-col items-center gap-4 whitespace-nowrap">
          <li>
            <Link href={"/"} className={navLinkStyles}>
              {" "}
              Inicio <RiHome2Fill className="ml-2" />{" "}
            </Link>
          </li>
          {user != null && (
            <li>
              <Link href={`/profiles/${user.id}`} className={navLinkStyles}>
                {" "}
                Perfil <RiUserFill className="ml-2" />{" "}
              </Link>
            </li>
          )}
          {user == null ? (
            <li>
              <Button onClick={() => void signIn()} variant={"secondary"}>
                Iniciar Sesión
              </Button>
            </li>
          ) : (
            <li>
              <Button onClick={() => void signOut()} variant={"ghostSecondary"}>
                Cerrar Sesión
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
