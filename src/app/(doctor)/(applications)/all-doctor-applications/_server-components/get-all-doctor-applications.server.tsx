import { getApplicationByDoctor } from "@/app/(doctor)/(applications)/approved-applications/_server-actions/get-application-by-doctor.action";
import { getAllUser } from "@/app/actions/user/general/get-all-user.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import GetApplicationByDoctorClient from "@/components/doctor/applications/get-application-by-doctor-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GetAllDoctorsApplicationsServer() {
  try {
    const [accessToken, userData] = await Promise.all([
      getCurrentUserAccessToken(),
      getCurrentUserFromCookie(),
    ]);

    if (!accessToken || !userData) {
      redirect("/signin");
    }

    const applicationData = await getApplicationByDoctor({ accessToken });

    const allUsersData = await getAllUser();

    if (!applicationData?.data) {
      throw new Error("Failed to fetch application data");
    }

    return (
      <GetApplicationByDoctorClient
        userData={userData}
        allUsersData={allUsersData.data}
        doctorApplications={applicationData}
        accessToken={accessToken}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <span className="text-red-500">Error loading applications</span>
        <Link
          href="/signin"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }
}
