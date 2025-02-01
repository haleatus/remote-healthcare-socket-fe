import GetDoctorReportById from "@/app/(doctor)/doctor-reports/[id]/_server-components/get-doctor-report-by-id-server";
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
      <GetDoctorReportById id={idNumber} />
    </div>
  );
};

export default SpecificReportsPage;
