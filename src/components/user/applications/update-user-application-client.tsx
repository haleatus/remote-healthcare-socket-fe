"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserApplication } from "@/app/actions/user/applications/update-user-application.action";

const UpdateUserApplicationClient = ({
  id,
  accessToken,
  initialNote,
}: {
  id: number;
  accessToken: string;
  initialNote: string;
}) => {
  const [note, setNote] = useState(initialNote);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      updateUserApplication({ id, note }, accessToken)
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Note Updated Successfully!");
            setNote("");
            setOpen(false);
            router.refresh();
          } else if (result.error) {
            setErrors(result.error.error || {});
            toast.error(result.error.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error updating application:", error);
          toast.error("An unexpected error occurred. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [id, note, accessToken, router]
  );

  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNote(e.target.value);
    },
    []
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full size-6 bg-blue-200 hover:bg-black text-black hover:text-white"
              >
                <Edit className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update Application</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Application Note</Label>
            <Input
              id="note"
              type="text"
              value={note}
              onChange={handleNoteChange}
              required
              disabled={isLoading}
              className={errors.note ? "border-red-500" : ""}
              placeholder="Enter your note here"
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating note..." : "Update Note"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserApplicationClient;
