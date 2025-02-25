"use client";

import { createReportForApplicationAction } from "@/app/(doctor)/(reports)/patient-logs/_server-actions/create-report-for-application.action";
import { addMedicationAction } from "@/app/(doctor)/doc-meds/_server-actions/add-medication.action";
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
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { IoDocument } from "react-icons/io5";
import { toast } from "sonner";

const CreateReportForPatientApplicationClient = ({
  userId,
  accessToken,
  applicationId,
}: {
  accessToken: string;
  userId: number;
  applicationId: number;
}) => {
  const { user } = useUser();

  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [includeMedication, setIncludeMedication] = useState(false);
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
        // Create report first
        const reportResult = await createReportForApplicationAction(
          {
            docId: user.id, // Current Loggedin Doctor ID
            userId: userId,
            appointmentId: applicationId,
            problem: problem,
            solution: solution,
          },
          accessToken
        );

        if (!reportResult.success || !reportResult.data) {
          if (reportResult.error) {
            setErrors(reportResult.error.error || {});
            toast.error(
              reportResult.error.message || "An error occurred creating report"
            );
          }
          setIsLoading(false);
          return;
        }

        // If medication should be added and report was successful
        if (includeMedication && reportResult.data) {
          const recordId = reportResult.data.data.id;

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
              recordId: recordId,
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
        }

        toast.success(
          includeMedication
            ? "Report and Medication Created Successfully!"
            : "Report Created Successfully!"
        );
        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Error in submission:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      accessToken,
      applicationId,
      includeMedication,
      medication,
      problem,
      router,
      solution,
      user,
      userId,
    ]
  );

  const handleProblemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProblem(e.target.value);
    },
    []
  );

  const handleSolutionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSolution(e.target.value);
    },
    []
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
              className="rounded-full size-6 text-emerald-500 hover:text-black"
            >
              <IoDocument className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-emerald-500">Add Report To This Application</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-space-grotesk">
            Create Report For This Application
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <Label htmlFor="problem">What was the problem?</Label>
            <Input
              id="problem"
              type="text"
              value={problem}
              onChange={handleProblemChange}
              required
              disabled={isLoading}
              className={errors.problem ? "border-red-500" : ""}
              placeholder="Enter the problem here"
            />
            {errors.problem && (
              <p className="text-red-500 text-sm mt-1">{errors.problem}</p>
            )}
          </div>
          <div>
            <Label htmlFor="solution">{"What's the solution?"}</Label>
            <Input
              id="solution"
              type="text"
              value={solution}
              onChange={handleSolutionChange}
              required
              disabled={isLoading}
              className={errors.solution ? "border-red-500" : ""}
              placeholder="Enter the solution here"
            />
            {errors.solution && (
              <p className="text-red-500 text-sm mt-1">{errors.solution}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="include-medication"
              checked={includeMedication}
              onCheckedChange={setIncludeMedication}
            />
            <Label htmlFor="include-medication">Add medication</Label>
          </div>

          {includeMedication && (
            <div className="border p-4 rounded-md space-y-3">
              <h3 className="font-medium">Medication Information</h3>

              <div>
                <Label htmlFor="medication-name">Medication Name</Label>
                <Input
                  id="medication-name"
                  type="text"
                  value={medication.name}
                  onChange={handleMedicationChange("name")}
                  required={includeMedication}
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
                  required={includeMedication}
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
                  required={includeMedication}
                  disabled={isLoading}
                  className={errors.frequency ? "border-red-500" : ""}
                  placeholder="e.g., Twice a day"
                />
                {errors.frequency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.frequency}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="medication-expiration">Expiration Date</Label>
                <Input
                  id="medication-expiration"
                  type="date"
                  value={medication.expirationDate}
                  onChange={handleMedicationChange("expirationDate")}
                  required={includeMedication}
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
                  required={includeMedication}
                  disabled={isLoading}
                  className={errors.duration ? "border-red-500" : ""}
                  placeholder="e.g., 7 days"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? includeMedication
                ? "Creating report & medication..."
                : "Creating report..."
              : includeMedication
              ? "Create Report & Medication"
              : "Create Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportForPatientApplicationClient;
