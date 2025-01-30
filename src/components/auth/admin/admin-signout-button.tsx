"use client";

import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoLogOut } from "react-icons/io5";
import { useAdmin } from "@/context/admin-context";
import { useUser } from "@/context/user-context";
import { adminSignOut } from "@/app/actions/auth/admin.action";

const AdminSignoutButton = () => {
  const router = useRouter();
  const { refetchAdmin } = useAdmin();
  const { refetchUser } = useUser();

  const handleSignOut = async () => {
    const result = await adminSignOut();
    if (result.success) {
      toast.success("Admin Sign out successful! Redirecting...");
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
            className="bg-red-500 text-black hover:text-white rounded-full size-7 p-0.5 hover:bg-red-800 transition-colors duration-300"
          >
            <IoLogOut size={22} className="pl-[1px]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-red-600">Admin SignOut</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AdminSignoutButton;
