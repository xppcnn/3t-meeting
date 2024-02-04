// "use client";
import React, { Suspense } from "react";
import CardWrapper from "@/components/CardWrapper";
import LoginForm, { LoginFormSkeleton } from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <CardWrapper
      label="登录"
      backButtonLabel="未注册，去注册"
      backButtonUrl="/auth/register"
      showOthers
    >
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </CardWrapper>
  );
};

export default LoginPage;
