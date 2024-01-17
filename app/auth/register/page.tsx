import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <CardWrapper label="注册">
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
