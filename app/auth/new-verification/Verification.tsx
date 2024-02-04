"use client";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/auth";
import { useAction } from "@/hooks/useAction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Skeleton } from "@/components/ui/skeleton";

const Verification = () => {
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
  }, [searchParams, execute]);
  return (
    <div className="flex  justify-center items-center">
      {isLoading && <BeatLoader />}
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
    </div>
  );
};

export default Verification;

export function VerificationSkeleton() {
  return <Skeleton className="h-10 w-full"></Skeleton>;
}
