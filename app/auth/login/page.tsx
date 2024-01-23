import React from "react";
import CardWrapper from "@/components/CardWrapper";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <CardWrapper
      label="登录"
      backButtonLabel="未注册，去注册"
      backButtonUrl="/auth/register"
      showOthers
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
