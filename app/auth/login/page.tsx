import React from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <CardWrapper label="登录">
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
