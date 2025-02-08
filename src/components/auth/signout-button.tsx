"use client";

import { userSignOut } from "@/app/actions/auth/user.action";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { IoLogOut } from "react-icons/io5";
import { useAdmin } from "@/context/admin-context";
import { useUser } from "@/context/user-context";

const SignoutButton = () => {
  const router = useRouter();
  const { refetchUser } = useUser();
  const { refetchAdmin } = useAdmin();

  const handleSignOut = async () => {
    const result = await userSignOut();
    if (result.success) {
      toast.success("Sign out successful! Redirecting...");
      // Reset user and admin context
      await refetchUser();
      await refetchAdmin();
      // Redirect to login page or update UI
      router.push("/signin");
    } else {
      // Handle error
      toast.error(result.error?.message);
    }
  };
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSignOut}
            className="bg-red-500 text-white rounded-full size-9 hover:bg-red-700 transition-colors duration-300"
          >
            <IoLogOut size={22} className="pl-[1px]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-red-600">SignOut</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SignoutButton;
