import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";

export const MobileNavbar = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full bg-au-dark-900">
      <div className="mx-auto flex h-full max-w-lg items-center justify-around">
        <NavLink href="/" icon={<VscHome size={30} />} label="Inicio" />
        {user && (
          <IconHoverEffect>
            <NavLink
              href={`/profiles/${user.id}`}
              icon={<VscAccount size={30} />}
              label="Perfil"
            />
          </IconHoverEffect>
        )}
        {user ? (
          <IconHoverEffect>
            <ButtonWithIcon
              onClick={() => signOut()}
              icon={<VscSignOut size={30} />}
              label="Logout"
            />
          </IconHoverEffect>
        ) : (
          <IconHoverEffect>
            <ButtonWithIcon
              onClick={() => signIn()}
              icon={<VscSignIn size={30} />}
              label="Login"
            />
          </IconHoverEffect>
        )}
      </div>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => (
  <Link href={href} className="px-5 text-white">
    <div className="flex flex-col items-center">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  </Link>
);

interface ButtonWithIconProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  onClick,
  icon,
  label,
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center px-5 text-white focus:outline-none"
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);
