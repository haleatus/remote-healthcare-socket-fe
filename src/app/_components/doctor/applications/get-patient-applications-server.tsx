import { getPatientApplications } from "@/app/actions/doctor/applications/get-patient-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import GetDoctorApplicationsClient from "@/components/doctor/applications/get-patient-application-client";
import Link from "next/link";
import React from "react";

const GetPatientApplicationServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  const currentDoctor = await getCurrentUserFromCookie();

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
  const patientApplicationsData = await getPatientApplications({ accessToken });
  return (
    <div>
      <GetDoctorApplicationsClient
        patientApplications={patientApplicationsData}
        accessToken={accessToken}
        currentDoctor={currentDoctor}
      />
    </div>
  );
};

export default GetPatientApplicationServer;
