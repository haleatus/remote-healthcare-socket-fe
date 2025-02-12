import GetPatientApplicationServer from "@/app/(doctor)/(applications)/patient-applications/_server-components/get-patient-applications.server";
import React from "react";

const PatientApplicationPage = () => {
  return (
    <div className="font-sans">
      <GetPatientApplicationServer />
    </div>
  );
};

export default PatientApplicationPage;
