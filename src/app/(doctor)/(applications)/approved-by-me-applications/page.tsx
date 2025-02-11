import React from "react";
import GetApprovedApplicationByMeDoctorServer from "./_server-components/get-approved-application-by-me-doctor.server";

const ApprovedApplicationByMeDoctorPage = () => {
  return (
    <div className="font-sans">
      <GetApprovedApplicationByMeDoctorServer />
    </div>
  );
};

export default ApprovedApplicationByMeDoctorPage;
