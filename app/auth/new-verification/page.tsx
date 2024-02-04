import CardWrapper from "@/components/CardWrapper";
import { Suspense } from "react";
import Verification, { VerificationSkeleton } from "./Verification";

const NewVerificationPage = () => {
  return (
    <CardWrapper
      label="邮箱验证"
      backButtonLabel="返回登录"
      backButtonUrl="/auth/login"
      showOthers={false}
    >
      <Suspense fallback={<VerificationSkeleton />}>
        <Verification />
      </Suspense>
    </CardWrapper>
  );
};

export default NewVerificationPage;
