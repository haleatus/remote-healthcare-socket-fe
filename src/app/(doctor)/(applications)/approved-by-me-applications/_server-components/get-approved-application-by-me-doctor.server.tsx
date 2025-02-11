import { getAllDoctors } from "@/app/(doctor)/(general)/doctors/_server-actions/get-all-doctor.action";
import { getAllUser } from "@/app/actions/user/general/get-all-user.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getApprovedApplicationByMeDoctorAction } from "../_server-actions/get-approved-application-by-me-doctor.action";
import GetApprrovedApplicationByMeDoctorClient from "@/components/doctor/applications/doctor/get-approved-application-by-me-doctor.client";

export default async function GetApprovedApplicationByMeDoctorServer() {
  try {
    const [accessToken, userData] = await Promise.all([
      getCurrentUserAccessToken(),
      getCurrentUserFromCookie(),
    ]);

    if (!accessToken || !userData) {
      redirect("/signin");
    }

    const applicationData = await getApprovedApplicationByMeDoctorAction({
      accessToken,
    });

    const allUsersData = await getAllUser();
    const allDoctorsData = await getAllDoctors();

    if (!applicationData?.data) {
      throw new Error("Failed to fetch application data");
    }

    const filteredDoctorApplications = {
      ...applicationData,
      data: applicationData.data.filter(
        (application: { doc: { id: number } }) =>
          application.doc?.id === userData.id
      ),
    };

    return (
      <GetApprrovedApplicationByMeDoctorClient
        userData={userData}
        allUsersData={allUsersData.data}
        allDoctorsData={allDoctorsData.data}
        doctorApplications={filteredDoctorApplications}
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
