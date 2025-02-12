import React from "react";
import GetAllDoctorsApplicationsServer from "./_server-components/get-all-doctor-applications.server";

const AllDoctorApplicationPage = () => {
  return (
    <div className="font-sans">
      <GetAllDoctorsApplicationsServer />
    </div>
  );
};

export default AllDoctorApplicationPage;
