import { getUserApplications } from "@/app/actions/user/applications/get-user-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUser } from "@/app/actions/user/get-current-user.action";
import GetDoctorApplicationsClient from "@/components/doctor/applications/get-doctor-application-client";
import Link from "next/link";
import React from "react";

const GetDoctorApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  const currentDoctor = await getCurrentUser();

  if (!currentDoctor) {
    return (
      <div className="flex flex-col">
        <span>Unauthorized, to access you need to be a doctor</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }

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
      <GetDoctorApplicationsClient
        userApplications={userApplicationData}
        accessToken={accessToken}
        currentDoctor={currentDoctor}
      />
    </div>
  );
};

export default GetDoctorApplicationServer;
