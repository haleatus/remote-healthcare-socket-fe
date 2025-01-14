import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import CreateUserApplicationClient from "@/components/user/create-user-appliaction-clent";
import Link from "next/link";
import React from "react";

const CreateUserApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }

  return (
    <div>
      <CreateUserApplicationClient accessToken={accessToken} />
    </div>
  );
};

export default CreateUserApplicationServer;
