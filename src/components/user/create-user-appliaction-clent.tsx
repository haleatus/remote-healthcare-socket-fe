"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
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
import { createUserApplication } from "@/app/actions/user/applications/create-user-application.action";

const CreateUserApplicationClient = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await createUserApplication({ note }, accessToken);

      if (result.success && result.data) {
        toast.success("Application Created Successfully!");
        setNote("");
        setOpen(false);
        router.refresh();
      } else if (result.error) {
        const error = result.error;
        setErrors(error.error);
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error in User Create Application:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 bg-blue-400 text-white"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Application</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Application Note</Label>
            <Input
              id="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              disabled={isLoading}
              className={errors.note ? "border-red-500" : ""}
              placeholder="Enter your issue here"
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating application..." : "Create Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserApplicationClient;
