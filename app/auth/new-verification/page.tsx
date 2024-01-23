"use client";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/auth";
import CardWrapper from "@/components/CardWrapper";
import { useAction } from "@/hooks/useAction";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const NewVerificationPage = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const { execute, isLoading } = useAction(newVerification, {
    onError(error) {
      setError(error);
    },
    onSuccess(_, msg) {
      setSuccess(msg);
    },
  });

  useEffect(() => {
    execute({ token: searchParams.get("token") || "" });
  }, []);
  return (
    <CardWrapper
      label="邮箱验证"
      backButtonLabel="返回登录"
      backButtonUrl="/auth/login"
      showOthers={false}
    >
      <div className="flex  justify-center items-center">
        {isLoading && <BeatLoader />}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationPage;
