import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  backButtonLabel: string;
  backButtonUrl: string;
}
const BackButton = ({ backButtonLabel, backButtonUrl }: BackButtonProps) => {
  return (
    <Button variant="ghost" size="sm" className="font-normal w-full" asChild>
      <Link href={backButtonUrl}>{backButtonLabel}</Link>
    </Button>
  );
};

export default BackButton;
