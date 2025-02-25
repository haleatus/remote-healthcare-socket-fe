import React from "react";
import { getAllMedicationByMeAction } from "./_server-actions/get-all-medication-by-me.action";

const DoctorsMedicationPage = async () => {
  const allMedicationByMe = await getAllMedicationByMeAction();

  console.log("allMedicationByMe", allMedicationByMe);
  return <div>Doc Meds</div>;
};

export default DoctorsMedicationPage;
