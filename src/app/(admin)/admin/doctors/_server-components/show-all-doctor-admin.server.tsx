import { getAllDoctors } from "@/app/(doctor)/(general)/doctors/_server-actions/get-all-doctor.action";
import ShowAllDoctorAdminDashboard from "@/components/admin/doctors/show-all-doctor-admin.client";
import React from "react";

const ShowAllDoctorAdminServer = async () => {
  const allDoctors = await getAllDoctors();

  return (
    <div>
      <ShowAllDoctorAdminDashboard allDoctors={allDoctors} />
    </div>
  );
};

export default ShowAllDoctorAdminServer;
