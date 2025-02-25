import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getUserReportById } from "@/app/(user)/reports/[id]/_server-actions/get-user-report-by-id.actions";
import GetReportByIdClient from "@/components/user/reports/get-reports-by-id-client";
import Link from "next/link";
import React from "react";
import { getMyMedicationsAction } from "@/app/actions/user/medications/get-my-medications.action";

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

  const { data: userReportData, error } = await getUserReportById(
    accessToken,
    id
  );

  const allMedication = await getMyMedicationsAction();

  console.log("am", allMedication);

  return (
    <div>
      <GetReportByIdClient
        report={userReportData}
        error={error}
        allMedication={allMedication}
      />
    </div>
  );
};

export default GetUserReportById;
