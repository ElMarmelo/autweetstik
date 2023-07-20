import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ImHome } from 'react-icons/im'


export function NavBar() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 px-2 py-4">
        <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
          <li>
            <Link href={"/"} className="flex justify-between">Home <ImHome className=" ml-2" /> </Link>
          </li>
          {user != null && (
            <li>
              <Link href={`/profiles/${user.id}`}>Profile</Link>
            </li>
          )}
          {user == null ? (
            <li>
              <Button onClick={() => void signIn()} variant={"secondary"}>Log In</Button>
            </li>
          ) : (
            <li>
              <Button onClick={() => void signOut()} variant={"ghostSecondary"}>Log Out</Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
