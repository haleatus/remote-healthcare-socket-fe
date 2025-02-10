import GetUserReportById from "@/app/(user)/reports/[id]/_server-components/get-user-report-by-id-server";
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
    <div className="font-sans">
      <GetUserReportById id={idNumber} />
    </div>
  );
};

export default SpecificReportsPage;
