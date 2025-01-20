import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUser } from "@/app/actions/user/get-current-user.action";
import CreateUserApplicationClient from "@/components/user/applications/create-user-application-clent";
import Link from "next/link";
import React from "react";

const CreateUserApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();
  const userData = await getCurrentUser();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }

  if (userData && userData?.isAdmin) {
    return null;
  }

  return (
    <div>
      <CreateUserApplicationClient accessToken={accessToken} />
    </div>
  );
};

export default CreateUserApplicationServer;
