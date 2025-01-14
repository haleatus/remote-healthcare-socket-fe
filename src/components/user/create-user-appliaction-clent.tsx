/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createUserApplication } from "@/app/actions/user/applications/create-user-application.action";
import { ApplicationErrorResponse } from "@/core/types/application.interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CreateUserApplicationClient = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const [note, setNote] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await createUserApplication({ note }, accessToken);

      if (result.success && result.data) {
        toast.success("Appliaction Created Successfully! Redirecting...");
        // Reset form
        setNote("");
        // Force a refresh of the server components
        router.refresh();
      } else if (result.error) {
        // Handle field-specific errors
        const error = result.error as ApplicationErrorResponse;
        setErrors(error.error);

        // Show error toast

        toast.error(error.message);
      }
    } catch (error: any) {
      console.log("Error in User Create Application Client : ", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>Create User Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="note">Appliaction Note</Label>
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
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading ? "Creating application..." : "Create Application"}
        </Button>
      </form>
    </div>
  );
};

export default CreateUserApplicationClient;
