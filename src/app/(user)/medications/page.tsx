import { getMyMedicationsAction } from "@/app/actions/user/medications/get-my-medications.action";
import NoDataFound from "@/components/doctor/reports/no-data-found";
import { MedicationCard } from "@/components/medications/medication-card";
import { IMedication } from "@/core/interface/medication.interface";

const MedicationsPage = async () => {
  const myMeds = await getMyMedicationsAction();

  return (
    <div className="container mx-auto px-3 py-8">
      {myMeds.length === 0 ? (
        <NoDataFound
          title="No Medications Found"
          description="You have no medications added to your account"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
          {myMeds.map((med: IMedication) => (
            <MedicationCard key={med.id} medicationData={med} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationsPage;
