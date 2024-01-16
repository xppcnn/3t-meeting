"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import LoginForm from "./LoginForm";
import { signIn } from "next-auth/react";

const LoginWrapper = () => {
  return (
    <Card className="w-[480px] rounded-[20px]">
      <CardHeader className="text-center">
        <CardTitle className=" text-lg">登 录</CardTitle>
        <CardDescription>欢迎来到 3T Meeting</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex-col w-full space-y-1">
        <div
          className="relative w-full text-xs text-[#ddd] text-center 
            before:absolute before:left-0 before:bottom-[50%] before:translate-y-[(-50%, -50%)] before:block before:h-[1px] before:w-[calc(50%-56px)] before:bg-[#ddd]
            after:absolute  after:right-0  after:bottom-[50%]  after:translate-y-[(-50%, -50%)]  after:block  after:h-[1px]  after:w-[calc(50%-56px)]  after:bg-[#ddd]
            "
        >
          其他登录方式
        </div>
        <div className="flex justify-between w-full px-4">
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() =>
              signIn("github", {
                redirect: true,
                callbackUrl: "/user-information",
              })
            }
          >
            <AiFillGithub className="text-lg" />
            Github
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <AiFillGoogleCircle className="text-lg" />
            Google
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginWrapper;
