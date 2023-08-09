import React from "react";
import { RiHome2Fill, RiUserFill } from "react-icons/ri";

export const MobileNavbar = () => {
  const iconStyles = "px-5";
  return (
    <div className="boder fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-au-dark-900">
      <div className="mx-auto flex h-full max-w-lg flex-row justify-center">
        <button className={iconStyles}>
          <RiHome2Fill size={30} />
        </button>
        <button className={iconStyles}>
          <RiUserFill size={30} />
        </button>
      </div>
    </div>
  );
};
