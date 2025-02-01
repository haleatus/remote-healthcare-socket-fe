"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
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
import { declinePatientApplicationAction } from "@/app/(doctor)/(applications)/patient-applications/_server-actions/decline-patient-application.action";

const DeclinePatientApplicationClient = ({
  applicationId,
  accessToken,
  docId,
  patientsNote,
}: {
  applicationId: number;
  accessToken: string;
  docId: number;
  patientsNote: string;
}) => {
  const [note, setNote] = useState(patientsNote);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      declinePatientApplicationAction(
        {
          id: applicationId,
          docId: docId,
          status: "CANCELLED",
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Application For Patient Declined Successfully!");
            setNote("");
            setOpen(false);
          } else if (result.error) {
            setErrors(result.error.error || {});
            toast.error(result.error.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error in Doctor Declining Application:", error);
          toast.error("An unexpected error occurred. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
          router.refresh();
        });
    },
    [docId, accessToken, router, applicationId]
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
                className="rounded-full w-10 h-10 bg-red-400 text-red-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Decline this Application</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Decline Application For Patient</DialogTitle>
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
              disabled={true}
              className={errors.note ? "border-red-500" : ""}
              placeholder="Enter your issue here"
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Declining application..." : "Decline Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeclinePatientApplicationClient;
