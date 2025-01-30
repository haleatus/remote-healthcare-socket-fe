import { getUserApplications } from "@/app/actions/user/applications/get-user-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import GetUserApplicationsClient from "@/components/user/applications/get-user-application-client";
import Link from "next/link";
import React from "react";

const GetUserApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();
  const userData = await getCurrentUserFromCookie();

  if (!accessToken || !userData) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }
  const userApplicationData = await getUserApplications({ accessToken });

  return (
    <div>
      <GetUserApplicationsClient
        userData={userData}
        userApplications={userApplicationData}
        accessToken={accessToken}
      />
    </div>
  );
};

export default GetUserApplicationServer;
