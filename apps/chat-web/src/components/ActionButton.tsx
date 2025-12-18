'use client";';

import { LoaderCircle } from "lucide-react";
import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { useActionState, useEffect } from "react";
import { Button, type ButtonProps } from "./ui/button";

type ActionButtonProps<T, F> = {
  actionFn: (state: T, payload: F) => Promise<T> | T;
  data: F | undefined;
  initialState?: Awaited<T>;
  endIcon?: ReactNode;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  onSuccess?: () => void;
};

export default function ActionButton<
  T extends { success: boolean; error: string | null },
  F,
>({
  actionFn,
  data,
  initialState = { success: false, error: null } as Awaited<T>,
  onSuccess,
  endIcon = null,
  className,
  children,
  ...props
}: PropsWithChildren<ActionButtonProps<T, F> & ButtonProps>) {
  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <Button
      formAction={() => formAction(data!)}
      type="submit"
      disabled={isPending || !!!data}
      className={className}
      {...props}
    >
      {children}
      {isPending ? <LoaderCircle className="animate-spin" /> : endIcon}
    </Button>
  );
}
