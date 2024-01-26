"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return <Button onClick={() => signOut()} variant="ghost" className="px-0">退出登录</Button>;
};

export default LogoutBtn;
