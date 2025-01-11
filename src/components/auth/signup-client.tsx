/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { AuthErrorResponse } from "@/core/types/auth.interface";
import { userSignUp } from "@/app/actions/auth/user.action";

export default function SignUpClient() {
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
      const result = await userSignUp({
        name,
        email,
        password,
      });

      if (result.success && result.data) {
        toast.success("Signup successful! Redirecting...");
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        // Redirect after a short delay
        setTimeout(() => router.push("/signin"), 1000);
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
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow container mx-auto px-4 py-8 font-space-grotesk md:w-1/2">
        <div
          className={`max-w-full mx-auto bg-white p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl transition-all duration-300 ${
            errors.email || errors.name || errors.password || errors.other
              ? "border border-red-600"
              : ""
          }`}
        >
          <h1 className="text-3xl font-bold mb-6 text-primary">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Enter your name"
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
                className={errors.email ? "border-red-500" : ""}
                placeholder="Enter your email"
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
                className={errors.password ? "border-red-500" : ""}
                placeholder="Enter your password"
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <div className="flex justify-center items-center h-full">
          <Image
            src="/auth-images/Balloonbox.png" // Replace with your image path
            alt="Illustration"
            className="object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
