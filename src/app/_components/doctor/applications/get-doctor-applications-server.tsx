import { getUserApplications } from "@/app/actions/user/applications/get-user-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import GetUserApplicationsClient from "@/components/user/applications/get-user-application-client";
import Link from "next/link";
import React from "react";

const GetDoctorApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/admin-signin">Signin</Link>
      </div>
    );
  }
  const userApplicationData = await getUserApplications({ accessToken });
  return (
    <div>
      <GetUserApplicationsClient
        userApplications={userApplicationData}
        accessToken={accessToken}
      />
    </div>
  );
};

export default GetDoctorApplicationServer;
