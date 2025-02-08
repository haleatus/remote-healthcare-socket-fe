import ShowAllDoctorAdminDashboard from "@/components/admin/doctors/show-all-doctor-admin.client";
import React from "react";
import { getAllDoctorAdmin } from "../_server-actions/get-all-doctor-admin.action";

const ShowAllDoctorAdminServer = async () => {
  const allDoctors = await getAllDoctorAdmin();

  return (
    <div>
      <ShowAllDoctorAdminDashboard allDoctors={allDoctors} />
    </div>
  );
};

export default ShowAllDoctorAdminServer;
