"use client";

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

export async function NewVerificationForm() {
  const [errorMessage, setErrorMesssage] = useState<string | undefined>();
  const [successMessage, setSuccessMesssage] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMesssage("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setErrorMesssage(data.error);
        setSuccessMesssage(data.success);
      })
      .catch(() => {
        setErrorMesssage("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        {!successMessage && !errorMessage && <BeatLoader />}
        <FormSuccess message={successMessage} />
        <FormError message={errorMessage} />
      </div>
    </CardWrapper>
  );
}
