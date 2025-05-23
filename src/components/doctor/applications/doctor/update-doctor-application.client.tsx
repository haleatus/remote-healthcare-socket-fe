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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateDoctorApplication } from "@/app/(doctor)/(applications)/approved-applications/_server-actions/update-doctor-application.action";
import { ReportStatusEnum } from "@/core/enums/report.enum";

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const UpdateDoctorApplicationClient = ({
  id,
  accessToken,
  initialNote,
  initialTitle,
  initialDate,
  initialStatus,
  docId,
}: {
  id: number;
  accessToken: string;
  initialTitle: string;
  initialNote: string;
  initialDate: string;
  initialStatus: string;
  docId: number;
}) => {
  const [date, setDate] = useState(formatDateForInput(initialDate));
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState(initialNote);
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      updateDoctorApplication(
        {
          docId: docId,
          id: id,
          title: title,
          note: note,
          date: date,
          status: status,
          requestByDoc: true,
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Application Updated Successfully!");
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
    [docId, id, note, date, title, status, accessToken, router]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );
  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNote(e.target.value);
    },
    []
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    []
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-6 text-blue-500 hover:text-black"
            >
              <Edit className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-blue-700 font-space-grotesk">Update Application</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-md font-sans">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Application Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              disabled={isLoading}
              className={errors.title ? "border-red-500" : ""}
              placeholder="Enter your title here"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
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

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              disabled={isLoading}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ReportStatusEnum).map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating application..." : "Update Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDoctorApplicationClient;
