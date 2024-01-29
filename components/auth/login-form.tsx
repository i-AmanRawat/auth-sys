"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { Login } from "@/action/login";

export function LoginForm() {
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl");
  const urlError =
    searchParam.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(() => {
      Login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setErrorMessage(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccessMessage(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setErrorMessage("Something went wrong!");
        });
    });
  }

  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Two Factor Code</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="123456"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </>
              )}

              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="joe.dev@example.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

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
                          <Button
                            size="sm"
                            variant="link"
                            className="p-0 font-normal"
                          >
                            <Link href="/auth/reset">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={errorMessage || urlError} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} type="submit" className=" w-full">
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
