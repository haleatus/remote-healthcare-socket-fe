"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { userSignIn } from "@/app/actions/auth/user.action";
import { AuthErrorResponse } from "@/core/types/auth.interface";
import { ShieldCheck, UserPlus } from "lucide-react";
import { Separator } from "../ui/seperator";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "unauthorized") {
      toast.error("You are not signed in yet.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await userSignIn({
        email,
        password,
      });

      if (result.success && result.data) {
        toast.success("Sign in successful! Redirecting...");
        // Reset form
        setEmail("");
        setPassword("");
        // Redirect to home or the intended destination
        const redirectTo = searchParams.get("redirectTo") || "/";
        setTimeout(() => router.push(redirectTo), 1000);
      } else if (result.error) {
        // Handle field-specific errors
        console.log("Full error response:", result.error);
        const error = result.error as AuthErrorResponse;
        setErrors(error.error);

        // // For debugging
        // console.log("Full error response:", result.error);
        // console.log("Processed errors:", error);

        if (error.message === "Email Dosent Exist") {
          setErrors({ email: error.message });
        } else if (error.message === "Incorrect Email or Password") {
          setErrors({ other: error.message });
        }

        // Show error toast
        toast.error(error.message || "Invalid email or password");
      }
    } catch (error) {
      console.log("Error in Signin Client : ", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="flex-grow container mx-auto px-4 py-8 font-space-grotesk md:w-1/2">
        <div
          className={`max-w-full mx-auto bg-white p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl transition-all duration-300 ${
            errors.email || errors.password || errors.other
              ? "border border-red-600"
              : ""
          }`}
        >
          <h1 className="text-3xl font-bold mb-6 text-primary">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6">
            <Separator className="my-4" />
            <div className="flex flex-col space-y-4">
              <Link
                href="/signup"
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <UserPlus size={16} />
                <span>Don&apos;t have an account? Sign Up</span>
              </Link>
              <Link
                href="/admin-signin"
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ShieldCheck size={16} />
                <span>Sign In as Admin</span>
              </Link>
            </div>
          </div>
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

export default function SignInClient() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
