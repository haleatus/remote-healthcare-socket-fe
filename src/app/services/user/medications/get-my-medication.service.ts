import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getMyMedicationService = async (
  accessToken: string,
  userId: string
) => {
  const res = await fetch(
    endpoints.user.medication.getMyMedication.replace(":userId", userId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const myMedication = await res.json();

  if (!res.ok) {
    const error = new Error(myMedication.message);
    throw error;
  }

  return myMedication;
};
