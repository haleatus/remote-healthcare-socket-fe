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
import { createDoctorApplication } from "@/app/(doctor)/(applications)/approved-applications/_server-actions/create-doctor-application.action";
import type { IUser } from "@/core/interface/user.interface";

const CreateDoctorApplicationBaseClient = ({
  allUsersData,
  accessToken,
  docId,
  allDoctorsData,
}: {
  allUsersData: IUser[];
  accessToken: string;
  docId: number;
  allDoctorsData: IUser[];
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const router = useRouter();

  const filteredUsers = useMemo(() => {
    return allUsersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
    );
  }, [allUsersData, searchTerm]);

  const filteredDoctors = useMemo(() => {
    return allDoctorsData.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
        doctor.id.toString().includes(doctorSearchTerm)
    );
  }, [allDoctorsData, doctorSearchTerm]);

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

      if (!selectedUser) {
        setErrors((prev) => ({ ...prev, userId: "Please select a user" }));
        setIsLoading(false);
        return;
      }

      const finalDoctorId = selectedDoctor ? selectedDoctor.id : docId;

      createDoctorApplication(
        {
          userId: selectedUser.id,
          docId: finalDoctorId,
          title: title,
          note: note,
          date: date,
          requestByDoc: true,
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Application For Patient Created Successfully!");
            setTitle("");
            setNote("");
            setSelectedUser(null);
            setSelectedDoctor(null);
            setDate("");
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
    [
      date,
      selectedUser,
      selectedDoctor,
      docId,
      title,
      note,
      accessToken,
      router,
    ]
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen) {
      setTitle("");
      setNote("");
      setSelectedUser(null);
      setSelectedDoctor(null);
      setDate("");
      setSearchTerm("");
      setDoctorSearchTerm("");
      setErrors({});
    }
    setOpen(newOpen);
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
                className="rounded-[7px] h-10 bg-blue-400 text-white flex items-center justify-center font-space-grotesk"
              >
                <PlusCircle className="h-5 w-5" /> Create Application
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Application For Patient</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono">
            Create Application For Patient
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="grid grid-cols-2 gap-4">
            {/* Patient Selection Section */}
            <div className="space-y-2">
              <Label htmlFor="user-search">Search Patient</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-search"
                  placeholder="Search by name, email or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <ScrollArea className="h-48 w-full rounded border border-black">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-1.5 cursor-pointer hover:bg-blue-200 ${
                      selectedUser?.id === user.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.id} |</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                ))}
              </ScrollArea>
              {errors.userId && (
                <p className="text-red-500 text-sm">{errors.userId}</p>
              )}
              {selectedUser ? (
                <div className="p-1.5 bg-blue-100 rounded text-sm">
                  <p className="font-medium">
                    Selected: {selectedUser.id} | {selectedUser.name}
                  </p>
                </div>
              ) : (
                <div className="p-1.5 bg-red-100 rounded text-sm">
                  <p className="font-medium">No Patient Selected</p>
                </div>
              )}
            </div>

            {/* Doctor Selection Section */}
            <div className="space-y-2">
              <Label htmlFor="doctor-search">Search Doctor (Optional)</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="doctor-search"
                  placeholder="Search by name, email or ID"
                  value={doctorSearchTerm}
                  onChange={(e) => setDoctorSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <ScrollArea className="h-48 w-full rounded border border-black">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`flex items-center justify-between p-1.5 cursor-pointer hover:bg-blue-200 ${
                      selectedDoctor?.id === doctor.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{doctor.id} |</span>
                      <span className="font-medium">{doctor.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {doctor.email}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              {selectedDoctor ? (
                <div className="p-1.5 bg-blue-100 rounded text-sm">
                  <p className="font-medium">
                    Selected: {selectedDoctor.id} | {selectedDoctor.name}
                  </p>
                </div>
              ) : (
                <div className="p-1.5 bg-yellow-100 rounded text-sm">
                  <p className="font-medium">
                    Using Current Doctor (ID: {docId})
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Visit Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
                disabled={isLoading}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Application Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
                className={errors.titile ? "border-red-500" : ""}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Application Note</Label>
              <Input
                id="note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                disabled={isLoading}
                className={errors.note ? "border-red-500" : ""}
                placeholder="Enter issue"
              />
              {errors.note && (
                <p className="text-red-500 text-sm">{errors.note}</p>
              )}
            </div>
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
