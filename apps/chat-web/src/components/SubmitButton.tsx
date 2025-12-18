"use client";

import { useFormStatus } from "react-dom";

import { LoaderCircle, MousePointerClick } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button color="blue" type="submit" disabled={pending} {...props}>
      {children}
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <MousePointerClick />
      )}
    </Button>
  );
};

export default SubmitButton;
