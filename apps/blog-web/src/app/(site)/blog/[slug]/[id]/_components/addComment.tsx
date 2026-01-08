import { Dialog } from "@radix-ui/react-dialog";
import {
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import { useActionState, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentActions";
import { type SessionUser } from "@/lib/session";
import { type CommentType } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentType[];
        count: number;
      },
      Error
    >
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (state?.message && state?.ok === true) {
      toast.success("Success", { description: state?.message });
      setShow(false);
    }
    if (state?.message && state?.ok === false) {
      toast.error("Oops!", { description: state?.message });
    }
    if (state?.ok) props.refetch();
  }, [state]);

  return (
    <>
      <Toaster richColors={true} />
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button>Leave Your Comment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Write Your Comment</DialogTitle>
          <form action={action} className={cn(props.className)}>
            <input hidden name="postId" defaultValue={props.postId} />
            <Label htmlFor="comment">Your Comment</Label>
            <div className="border-t border-x rounded-t-md">
              <Textarea
                className="border-none active:outline-none focus-visible:ring-0 shadow-none"
                name="content"
              />
              {!!state?.errors?.content && (
                <p className="text-red-500 animate-shake">
                  {state.errors.content}
                </p>
              )}
            </div>
            <p className="border rounded-b-md p-2">
              <span className="text-slate-400">Write as </span>
              <span className="text-slate-700">{props.user.name}</span>
            </p>
            <SubmitButton className="mt-2">Submit</SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddComment;
