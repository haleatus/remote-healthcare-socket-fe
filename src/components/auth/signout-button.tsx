"use client";

import { userSignOut } from "@/app/actions/auth/user.action";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

const SignoutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await userSignOut();
    if (result.success) {
      toast.success("Sign out successful! Redirecting...");
      // Redirect to login page or update UI
      router.push("/signin");
    } else {
      // Handle error
      toast.error(result.error?.message);
    }
  };
  return (
    <div>
      <Button onClick={handleSignOut}>
        <LogOutIcon />
      </Button>
    </div>
  );
};

export default SignoutButton;
