import GetApplicationByDoctorServer from "@/app/(doctor)/(applications)/approved-applications/_server-components/get-application-by-doctor.server";
import React from "react";

const UserApplicationPage = () => {
  return (
    <div>
      <GetApplicationByDoctorServer />
    </div>
  );
};

export default UserApplicationPage;
