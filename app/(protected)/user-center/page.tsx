'use client'
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const UserInformationPage = () => {
  return (
    <div>
      UserInformationPage
      <Button onClick={() => signOut()}>退出</Button>
    </div>
  );
};

export default UserInformationPage;
