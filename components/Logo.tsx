import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image src="/logo-sm.png" alt="logo" width={40} height={40} />
      3T Meeting
    </div>
  );
};

export default Logo;
