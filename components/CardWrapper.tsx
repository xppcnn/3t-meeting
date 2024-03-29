"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Header from "./auth/Header";
import BackButton from "./auth/BackButton";

const CardWrapper = ({
  children,
  label,
  showOthers = true,
  backButtonLabel,
  backButtonUrl,
}: {
  children: React.ReactNode;
  label: string;
  showOthers: boolean;
  backButtonLabel: string;
  backButtonUrl: string;
}) => {
  return (
    <Card className="w-[480px] rounded-[20px]">
      <CardHeader className="text-center">
        <CardTitle className=" text-lg">
          <Header label={label} />
        </CardTitle>
        <CardDescription>欢迎来到 3T Meeting</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showOthers && (
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
                  callbackUrl: "/user-center",
                })
              }
            >
              <AiFillGithub className="text-lg" />
              Github
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <AiFillGoogleCircle
                className="text-lg"
                onClick={() =>
                  signIn("google", {
                    redirect: true,
                    callbackUrl: "/user-center",
                  })
                }
              />
              Google
            </div>
          </div>
        </CardFooter>
      )}

      <CardFooter>
        <BackButton
          backButtonLabel={backButtonLabel}
          backButtonUrl={backButtonUrl}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
