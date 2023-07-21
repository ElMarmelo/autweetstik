import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { RiHome2Fill, RiUserFill } from 'react-icons/ri'


export function NavBar() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 px-2 py-4">
        <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
          <li>
            <Link href={"/"} className={navLinkStyles}> Inicio <RiHome2Fill className=" ml-2" /> </Link>
          </li>
          {user != null && (
            <li>
              <Link href={`/profiles/${user.id}`} className={navLinkStyles}> Perfil <RiUserFill className="ml-2" /> </Link>
            </li>
          )}
          {user == null ? (
            <div className="pl-2">
              <li>
                <Button onClick={() => void signIn()} variant={"secondary"}>Iniciar Sesión</Button>
              </li>
            </div>
          ) : (
            <div className="pl-2">
              <li>
                <Button onClick={() => void signOut()} variant={"ghostSecondary"}>Cerrar Sesión</Button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}


const navLinkStyles = "flex justify-between text-2xl font-semibold px-5 py-2 hover:bg-au-gray-100/30 rounded-lg"