"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/lib/actions/auth";
import { InfoState } from "@/lib/types/formState";
import { redirect } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(signInAction, undefined);

  useEffect(() => {
    if (state?.message === InfoState.SUCCESS) {
      toast.success("Login successful!");
      redirect("/");
    } else if (state?.errors)
      toast.info("Please fix the errors and try again.");
    else if (state?.message) toast.error(state?.message);
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          defaultValue={state?.data.email}
          name="email"
          id="email"
          type="email"
          placeholder="m@example.com"
          disabled={isPending}
        />
        <FieldDescription>
          {state?.errors?.email ? (
            <span className="text-red-500">{state.errors.email[0]}</span>
          ) : null}
        </FieldDescription>
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <div className="relative">
          <Input
            name="password"
            defaultValue={state?.data.password}
            id="password"
            type={showPassword ? "text" : "password"}
            disabled={isPending}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
        <FieldDescription>
          {state?.errors?.password ? (
            <span className="text-red-500">{state.errors.password[0]}</span>
          ) : null}
        </FieldDescription>
      </Field>
      <Field>
        <SubmitButton>Login</SubmitButton>
        <FieldDescription className="text-center">
          <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
        </FieldDescription>
      </Field>
    </form>
  );
}
