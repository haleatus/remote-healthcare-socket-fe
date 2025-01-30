"use client";

import type React from "react";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Search } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { createDoctorApplication } from "@/app/actions/doctor/applications/create-doctor-application.action";
import type { IUser } from "@/core/types/user.interface";

const CreateDoctorApplicationBaseClient = ({
  allUsersData,
  accessToken,
  docId,
}: {
  allUsersData: IUser[];
  accessToken: string;
  docId: number;
}) => {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = useMemo(() => {
    return allUsersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
    );
  }, [allUsersData, searchTerm]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      if (!date) {
        setErrors((prev) => ({ ...prev, date: "Please select a date" }));
        setIsLoading(false);
        return;
      }

      if (userId === null) {
        setErrors((prev) => ({ ...prev, userId: "Please select a user" }));
        setIsLoading(false);
        return;
      }

      createDoctorApplication(
        {
          userId: userId,
          docId: docId,
          note: note,
          date: date,
          requestByDoc: true,
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Application For Patient Created Successfully!");
            setNote("");
            setUserId(null);
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
          router.refresh();
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

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    []
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const handleUserSelect = useCallback((id: number) => {
    setUserId(id);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-[7px] h-10 bg-blue-400 text-white flex items-center justify-center"
              >
                <PlusCircle className="h-5 w-5" /> Create Application
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
            <Label htmlFor="user-search">Search User</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="user-search"
                placeholder="Search by name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                  userId === user.id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleUserSelect(user.id)}
              >
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">ID: {user.id}</span>
              </div>
            ))}
          </ScrollArea>
          {errors.userId && (
            <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
          )}

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
            <Input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              min={today}
              required
              disabled={isLoading}
              className={errors.date ? "border-red-500" : ""}
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

export default CreateDoctorApplicationBaseClient;
