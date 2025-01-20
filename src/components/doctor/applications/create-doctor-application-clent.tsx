"use client";

import React, { useState, useCallback } from "react";
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
import { createDoctorApplication } from "@/app/actions/doctor/applications/create-doctor-application.action";
import DatePicker from "react-datepicker";

const CreateDoctorApplicationClient = ({
  accessToken,
  userId,
  docId,
}: {
  accessToken: string;
  userId: number;
  docId: number;
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      if (!date) {
        setErrors({ date: "Please select a date" });
        setIsLoading(false);
        return;
      }

      createDoctorApplication(
        { userId, docId, note, date: date.toString(), requestByDoc: true },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Application For Patient Created Successfully!");
            setNote("");
            setOpen(false);
            router.refresh();
          } else if (result.error) {
            setErrors(result.error.error || {});
            toast.error(result.error.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error in Doctor Create Application:", error);
          toast.error("An unexpected error occurred. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [date, userId, docId, note, accessToken, router]
  );

  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNote(e.target.value);
    },
    []
  );

  const handleDateChange = useCallback((date: Date | null) => {
    setDate(date);
  }, []);

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
                className="rounded-full w-10 h-10 bg-blue-400 text-white"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Application For this patient</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Application For Patient</DialogTitle>
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
              placeholder="Enter your issue here"
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note}</p>
            )}
          </div>
          <div>
            <Label htmlFor="date">Visit Date</Label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              required
              disabled={isLoading}
              className={`w-full p-2 border rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
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

export default CreateDoctorApplicationClient;
