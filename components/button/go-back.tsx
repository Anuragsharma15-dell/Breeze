"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type GoBackProps = {
  className?: string;
};



export const GoBack = ({ className }: GoBackProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className={className}
    >
      Go Back
    </Button>
  );
};
