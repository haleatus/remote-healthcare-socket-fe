import GetApplicationByDoctorServer from "@/app/(doctor)/(applications)/approved-applications/_server-components/get-application-by-doctor.server";
import React from "react";

const ApprovedApplicationPage = () => {
  return (
    <div className="font-sans">
      <GetApplicationByDoctorServer />
    </div>
  );
};

export default ApprovedApplicationPage;
