"use client";

import ActionButton from "@/components/ActionButton";
import SubmitButton from "@/components/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { requestFriendAction, searchFriendAction } from "@/lib/actions/friend";
import { Send, UserPlus } from "lucide-react";
import { startTransition, useActionState } from "react";

export default function AddFriendDialog() {
  const [state, action, pending] = useActionState(
    searchFriendAction,
    undefined,
  );

  const onClose = () => {
    startTransition(() => {
      action(undefined);
    });
  };

  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
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
            {state?.target ? (
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={state.target?.image || "/rabbit.png"}
                    alt={state.target?.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {state.target?.name}
                  </span>
                  <span className="truncate text-xs">
                    {state.target?.email}
                  </span>
                </div>
              </div>
            ) : null}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton>Search Friend</SubmitButton>
            <ActionButton
              data={state?.target?.id}
              actionFn={requestFriendAction}
              endIcon={<Send />}
            >
              Add request
            </ActionButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
