import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getUserReports } from "@/app/actions/user/reports/get-user-reports.action";
import GetUserReportsClient from "@/components/user/reports/get-user-reports-client";
import Link from "next/link";
import React from "react";

const GetDoctorReportsServer = async () => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }
  const userReportsData = await getUserReports(accessToken);

  return (
    <div>
      {userReportsData ? (
        <GetUserReportsClient reports={userReportsData} />
      ) : (
        <div>No reports available</div>
      )}
    </div>
  );
};

export default GetDoctorReportsServer;
