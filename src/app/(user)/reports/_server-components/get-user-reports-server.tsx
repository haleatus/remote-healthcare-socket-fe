import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getUserReports } from "@/app/(user)/reports/_server-actions/get-user-reports.action";
import GetUserReportsClient from "@/components/user/reports/get-user-reports-client";
import Link from "next/link";
import React from "react";
import NoReportsFound from "@/components/user/reports/no-reports-found";

const GetUserReportsServer = async () => {
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

  if (!userReportsData) {
    return <NoReportsFound />;
  }

  return (
    <div>
      <GetUserReportsClient reports={userReportsData} />
    </div>
  );
};

export default GetUserReportsServer;
