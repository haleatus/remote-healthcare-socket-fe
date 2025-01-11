/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { userSignUp } from "@/app/actions/auth/user.action";
import { toast } from "sonner";

// Define the state type explicitly
type SignupState = {
  success?: boolean;
  error?: string | null;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  data?: any;
};

export default function SignUpClient() {
  const router = useRouter();

  // Provide explicit type for initial state
  const initialState: SignupState = {
    success: false,
    error: null,
    fieldErrors: {},
  };

  // Type the action and state explicitly
  const [state, formAction, isPending] = useActionState(
    userSignUp as (prevState: SignupState, formData: FormData) => SignupState,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => router.push("/signin"), 1000); // Redirect to home after 1 seconds
    } else if (state.error) {
      console.log("state.error", state);
      toast.error(state.error); // Show error message
    }
  }, [state, router]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow container mx-auto px-4 py-8 font-sans md:w-1/2">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-primary">Sign Up</h1>
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
              />
              {state.fieldErrors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.fieldErrors.name[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
              />
              {state.fieldErrors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
              />
              {state.fieldErrors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {state.fieldErrors.password[0]}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign Up"}
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
