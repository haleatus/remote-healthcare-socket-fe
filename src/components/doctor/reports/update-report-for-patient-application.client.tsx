"use client";

import { updateReportForApplicationAction } from "@/app/(doctor)/(reports)/patient-logs/_server-actions/update-report-for-application.action";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/user-context";
import { ReportStatusEnum } from "@/core/enums/report.enum";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

const UpdateReportForPatientApplicationClient = ({
  accessToken,
  reportId,
  initialProblem,
  initialSolution,
  initialStatus,
  onClose,
}: {
  accessToken: string;
  reportId: number;
  initialProblem: string;
  initialSolution: string;
  initialStatus: string;
  onClose?: () => void;
}) => {
  const { user } = useUser();

  const [problem, setProblem] = useState(initialProblem);
  const [solution, setSolution] = useState(initialSolution);
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

      updateReportForApplicationAction(
        {
          docId: user.id, // Current Loggedin Doctor ID
          id: reportId,
          problem: problem,
          solution: solution,
          status: status,
        },
        accessToken
      )
        .then((result) => {
          if (result.success && result.data) {
            toast.success("Report Updated Successfully!");
            setOpen(false);
            router.refresh();
            if (onClose) {
              onClose();
            }
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
    [accessToken, onClose, problem, reportId, router, solution, status, user]
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
          <p className="text-blue-500">Update Report</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Report</DialogTitle>
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
            {isLoading ? "Updating report..." : "Update Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReportForPatientApplicationClient;
