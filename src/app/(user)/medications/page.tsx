import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import { getMyMedicationsAction } from "@/app/actions/user/medications/get-my-medications.action";
import NoDataFound from "@/components/doctor/reports/no-data-found";
import { MedicationCard } from "@/components/medications/medication-card";
import { IMedication } from "@/core/interface/medication.interface";

const MedicationsPage = async () => {
  const accessToken = await getCurrentUserAccessToken();
  const user = await getCurrentUserFromCookie();

  if (!accessToken || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p className="text-gray-600">
          You are not authorized to view this page
        </p>
      </div>
    );
  }

  const myMeds = await getMyMedicationsAction({
    accessToken,
    userId: user.id.toString(),
  });

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
            <MedicationCard
              key={med.id}
              name={med.name}
              dosage={med.dosage}
              frequency={med.frequency}
              duration={med.duration}
              expirationDate={med.expirationDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationsPage;
