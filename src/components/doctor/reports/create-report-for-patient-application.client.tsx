"use client";

import { createReportForApplicationAction } from "@/app/(doctor)/(reports)/patient-logs/_server-actions/create-report-for-application.action";
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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
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
  const router = useRouter();

  console.log("UserID", userId);
  console.log("AccessToken", accessToken);
  console.log("ApplicationID", applicationId);
  console.log("err", errors);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      if (!user) {
        toast.error("User not found. Please try again.");
        setIsLoading(false);
        return;
      }

      createReportForApplicationAction(
        {
          docId: user.id, // Current Loggedin Doctor ID
          userId: userId,
          appointmentId: applicationId,
          problem: problem,
          solution: solution,
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Report Created Successfully!");
            setOpen(false);
            router.refresh();
          } else if (result.error) {
            setErrors(result.error.error || {});
            toast.error(result.error.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error creating report:", error);
          toast.error("An unexpected error occurred. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [accessToken, applicationId, problem, router, solution, user, userId]
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
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-emerald-500">Add Report To This Application</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Report For This Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="problem">{"What's the solution?"}</Label>
            <Input
              id="problem"
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating report..." : "Create Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportForPatientApplicationClient;
