import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getUserReportById } from "@/app/actions/user/reports/get-user-report-by-id.actions";
import GetReportByIdClient from "@/components/user/reports/get-reports-by-id";
import Link from "next/link";
import React from "react";

const GetUserReportById = async ({ id }: { id: number }) => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }
  const userReportData = await getUserReportById(accessToken, id);
  return (
    <div>
      <GetReportByIdClient report={userReportData} />
    </div>
  );
};

export default GetUserReportById;
