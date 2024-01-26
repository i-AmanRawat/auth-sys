"use client";

import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";
import { newPassword } from "@/action/new-password";
import { useSearchParams } from "next/navigation";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("Missing token!");
      return;
    }

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setErrorMessage(data?.error);
        setSuccessMessage(data?.success);
      });
    });
  }

  return (
    <div>
      <CardWrapper
        headerLabel="Enter new password"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} type="submit" className=" w-full">
              Reset password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
