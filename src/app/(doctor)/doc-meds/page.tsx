import React from "react";
import { getAllMedicationByMeAction } from "./_server-actions/get-all-medication-by-me.action";
import { MedicationCard } from "@/components/medications/medication-card";
import { IMedication } from "@/core/interface/medication.interface";
import NoDataFound from "@/components/doctor/reports/no-data-found";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { redirect } from "next/navigation";

const DoctorsMedicationPage = async () => {
  const allMedicationByMe = await getAllMedicationByMeAction();
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <div className="container mx-auto px-3 py-8">
      {allMedicationByMe.data.length === 0 ? (
        <NoDataFound
          title="No Medications Found"
          description="You have no medications added to your account"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
          {allMedicationByMe.data.map((med: IMedication) => (
            <MedicationCard
              key={med.id}
              medicationData={med}
              accessToken={accessToken}
              isDoctorView={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsMedicationPage;
