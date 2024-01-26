import React from "react";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";

const Header = () => {
  return (
    <nav className="h-[60px] w-full flex flex-shrink-0 items-center justify-between border-solid border-b-[1px] border-[rgb(211, 214, 219)] px-8 box-border">
      <Logo />
      <AvatarDropdown />
    </nav>
  );
};

export default Header;
