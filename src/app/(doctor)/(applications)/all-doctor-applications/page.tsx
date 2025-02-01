import GetAllDoctorsApplicationsServer from "@/app/(doctor)/(applications)/approved-applications/_server-components/get-application-by-doctor.server";
import React from "react";

const AllDoctorApplicationPage = () => {
  return (
    <div>
      <GetAllDoctorsApplicationsServer />
    </div>
  );
};

export default AllDoctorApplicationPage;
