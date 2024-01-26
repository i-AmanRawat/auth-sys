"use client";

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export async function NewVerificationForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMessage("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setErrorMessage(data.error);
        setSuccessMessage(data.success);
      })
      .catch(() => {
        setErrorMessage("Something went wrong!");
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
