import GetUserReportById from "@/app/_components/user/reports/get-user-report-by-id-server";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SpecificReportsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const idNumber = parseInt(id);

  if (isNaN(idNumber)) {
    return <div>Invalid ID</div>;
  }

  return (
    <div>
      <GetUserReportById id={idNumber} />
    </div>
  );
};

export default SpecificReportsPage;
