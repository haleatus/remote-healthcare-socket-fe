import CreateDoctorApplicationServer from "@/app/_components/doctor/applications/create-doctor-application-server";
import GetDoctorApplicationServer from "@/app/_components/doctor/applications/get-doctor-applications-server";
import React from "react";

const UserApplicationPage = () => {
  return (
    <div>
      <div className="absolute bottom-4 right-10 z-20">
        <CreateDoctorApplicationServer />
      </div>
      <div>
        <GetDoctorApplicationServer />
      </div>
    </div>
  );
};

export default UserApplicationPage;
