"use client";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addFriendAction } from "@/lib/actions/friend";
import { UserPlus } from "lucide-react";
import { useActionState } from "react";

export default function AddFriendDialog() {
  const [state, action, pending] = useActionState(addFriendAction, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Send a request to connect with your friends.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                defaultValue={state?.data.email}
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={pending}
              />
              <FieldDescription>
                {state?.errors?.email ? (
                  <span className="text-red-500">{state.errors.email[0]}</span>
                ) : null}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Or Name</FieldLabel>
              <Input
                defaultValue={state?.data.name}
                id="name"
                name="name"
                disabled={pending}
              />
              <FieldDescription>
                {state?.errors?.name ? (
                  <span className="text-red-500">{state.errors.name[0]}</span>
                ) : null}
              </FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton>Search Friend</SubmitButton>
            <Button variant="outline">Add request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
