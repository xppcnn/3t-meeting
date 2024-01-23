import CardWrapper from "@/components/CardWrapper";
import React from "react";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <CardWrapper
      label="注册"
      backButtonLabel="已有账号？去登录"
      backButtonUrl="/auth/login"
      showOthers
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
