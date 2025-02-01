import { getPatientReportsAction } from "@/app/(doctor)/(reports)/patient-logs/_server-actions/get-patient-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import GetPatientReportsClient from "@/components/doctor/reports/get-patient-reports.client";
import Link from "next/link";
import React from "react";

const GetPatientReportsServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }
  const userReportsData = await getPatientReportsAction(accessToken);

  return (
    <div>
      {userReportsData ? (
        <GetPatientReportsClient
          reports={userReportsData}
          accessToken={accessToken}
        />
      ) : (
        <div>No reports available</div>
      )}
    </div>
  );
};

export default GetPatientReportsServer;
