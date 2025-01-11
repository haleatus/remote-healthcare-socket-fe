"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

export default function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "unauthorized") {
      toast.error("You are not signed in yet.");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing in:", { email, password });
    // Here you would typically handle the sign-in logic
    // For now, we'll just redirect to the home page
    router.push("/");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow container mx-auto px-4 py-8 font-sans md:w-1/2">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
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
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
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
