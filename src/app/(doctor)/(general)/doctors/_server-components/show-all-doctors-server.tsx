import { getAllDoctors } from "@/app/(doctor)/(general)/doctors/_server-actions/get-all-doctor.action";
import ShowAllDoctorsClient from "@/components/doctor/general/show-all-doctors-client";
import React from "react";

const ShowAllDoctorsServer = async () => {
  const allDoctors = await getAllDoctors();
  console.log("all doc", allDoctors);

  return (
    <div>
      <ShowAllDoctorsClient allDoctors={allDoctors} />
    </div>
  );
};

export default ShowAllDoctorsServer;
