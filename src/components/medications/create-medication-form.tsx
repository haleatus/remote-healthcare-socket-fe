"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { addMedicationAction } from "@/app/(doctor)/doc-meds/_server-actions/add-medication.action";

const CreateMedicationForm = ({
  reportId,
  userId,
  accessToken,
}: {
  reportId: number;
  userId: number;
  accessToken: string;
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Set a default expiration date 30 days from now
  const defaultExpirationDate = new Date();
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 30);

  // Format date as YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Medication states
  const [medication, setMedication] = useState({
    name: "",
    description: "",
    dosage: "",
    frequency: "",
    expirationDate: formatDateForInput(defaultExpirationDate),
    duration: "",
  });

  const handleMedicationChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setMedication((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      if (!user) {
        toast.error("User not found. Please try again.");
        setIsLoading(false);
        return;
      }

      try {
        // Convert date string to ISO format for the API
        const formattedExpirationDate = new Date(
          medication.expirationDate
        ).toISOString();

        const medicationResult = await addMedicationAction(
          {
            name: medication.name,
            description: medication.description,
            dosage: medication.dosage,
            frequency: medication.frequency,
            expirationDate: formattedExpirationDate,
            duration: medication.duration,
            docId: user.id,
            userId: userId,
            recordId: reportId,
          },
          accessToken
        );

        if (!medicationResult.success) {
          if (medicationResult.error) {
            setErrors(medicationResult.error.error || {});
            toast.error(
              medicationResult.error.message ||
                "An error occurred adding medication"
            );
          }
          setIsLoading(false);
          return;
        }
        toast.success("Medication Added Successfully!");
        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Error in submission:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, medication, router, user, userId, reportId]
  );

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
              <PlusCircle className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-blue-500">Add Medication</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-space-grotesk">
            Add Medication in Report {reportId}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="space-y-3">
            <div>
              <Label htmlFor="medication-name">Medication Name</Label>
              <Input
                id="medication-name"
                type="text"
                value={medication.name}
                onChange={handleMedicationChange("name")}
                required
                disabled={isLoading}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Enter medication name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="medication-description">
                Medication Description (Optional)
              </Label>
              <Input
                id="medication-description"
                type="text"
                value={medication.description}
                onChange={handleMedicationChange("description")}
                disabled={isLoading}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Enter medication description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="medication-dosage">Dosage</Label>
              <Input
                id="medication-dosage"
                type="text"
                value={medication.dosage}
                onChange={handleMedicationChange("dosage")}
                required
                disabled={isLoading}
                className={errors.dosage ? "border-red-500" : ""}
                placeholder="e.g., 500mg"
              />
              {errors.dosage && (
                <p className="text-red-500 text-sm mt-1">{errors.dosage}</p>
              )}
            </div>

            <div>
              <Label htmlFor="medication-frequency">Frequency</Label>
              <Input
                id="medication-frequency"
                type="text"
                value={medication.frequency}
                onChange={handleMedicationChange("frequency")}
                required
                disabled={isLoading}
                className={errors.frequency ? "border-red-500" : ""}
                placeholder="e.g., Twice a day"
              />
              {errors.frequency && (
                <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
              )}
            </div>

            <div>
              <Label htmlFor="medication-expiration">Expiration Date</Label>
              <Input
                id="medication-expiration"
                type="date"
                value={medication.expirationDate}
                onChange={handleMedicationChange("expirationDate")}
                required
                disabled={isLoading}
                className={errors.expirationDate ? "border-red-500" : ""}
              />
              {errors.expirationDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expirationDate}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="medication-duration">Duration</Label>
              <Input
                id="medication-duration"
                type="text"
                value={medication.duration}
                onChange={handleMedicationChange("duration")}
                required
                disabled={isLoading}
                className={errors.duration ? "border-red-500" : ""}
                placeholder="e.g., 7 days"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding medication..." : "Add Medication"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMedicationForm;
