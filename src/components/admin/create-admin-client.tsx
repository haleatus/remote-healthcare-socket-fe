/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthErrorResponse } from "@/core/interface/auth.interface";
import { createAdmin } from "@/app/(admin)/admin/create-admin/_server-actions/create-admin.action";

export default function CreateAdminClient({
  adminAccessToken,
}: {
  adminAccessToken: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await createAdmin(
        {
          name,
          email,
          password,
        },
        adminAccessToken
      );

      if (result.success && result.data) {
        toast.success("Successfully created an admin! Redirecting...");
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        // Redirect after a short delay
        setTimeout(() => router.push("/admin/admins"), 1000);
      } else if (result.error) {
        // Handle field-specific errors
        const error = result.error as AuthErrorResponse;
        setErrors(error.error);

        // Show error toast
        if (error.error.password) {
          toast.error(error.error.password);
        } else if (error.error.email) {
          toast.error(error.error.email.toLowerCase());
        } else if (error.error.name) {
          toast.error(error.error.name);
        } else {
          toast.error(error.message);
        }
      }
    } catch (error: any) {
      console.log("Error in Signup Client : ", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="flex-grow container mx-auto px-4 font-space-grotesk md:w-1/2">
        <div
          className={`max-w-full flex items-center flex-col mx-auto p-8 rounded-lg transition-all duration-300 ${
            errors.email || errors.name || errors.password || errors.other
              ? "border border-red-600"
              : ""
          }`}
        >
          <h1 className="text-2xl font-bold font-sans mb-6 text-primary">
            CREATE ADMIN
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:w-[400px] lg:w-[500px]"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className={errors.name ? "border-red-500" : "border-black"}
                placeholder="Enter admins' name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className={errors.email ? "border-red-500" : "border-black"}
                placeholder="Enter admins' email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.toLowerCase()}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className={errors.password ? "border-red-500" : "border-black"}
                placeholder="Enter admins' password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading ? "creating Admin..." : "Create Admin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
