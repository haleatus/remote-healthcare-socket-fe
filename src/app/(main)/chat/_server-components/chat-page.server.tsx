import { getApplicationByDoctorAction } from "@/app/(doctor)/(applications)/approved-applications/_server-actions/get-application-by-doctor.action";
import { getApprovedApplicationByMeDoctorAction } from "@/app/(doctor)/(applications)/approved-by-me-applications/_server-actions/get-approved-application-by-me-doctor.action";
import { getUserApplications } from "@/app/actions/user/applications/get-user-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import ChatForApplicationClient from "@/components/chat/chat-for-application";
import { redirect } from "next/navigation";
import React from "react";

const ChatPageServer = async () => {
  const [accessToken, userData] = await Promise.all([
    getCurrentUserAccessToken(),
    getCurrentUserFromCookie(),
  ]);

  if (!accessToken || !userData) {
    redirect("/signin");
  }

  let applicationData;

  if (userData.isAdmin) {
    // Get both types of applications
    const [docApplicationData, docApprovedApplicationData] = await Promise.all([
      getApplicationByDoctorAction({ accessToken }),
      getApprovedApplicationByMeDoctorAction({ accessToken }),
    ]);

    // Filter applications where the doctor is the current user
    const filteredDoctorApplications = docApplicationData.data.filter(
      (application: { doc: { id: number } }) =>
        application.doc?.id === userData.id
    );

    // Ensure approved applications data is in the correct format
    const formattedApprovedApplications = docApprovedApplicationData.data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (app: any) => ({
        id: app.id || 0,
        createdAt: app.createdAt || new Date().toISOString(),
        updatedAt: app.updatedAt || new Date().toISOString(),
        status: app.status || "PENDING",
        note: app.note || "",
        visitDate: app.visitDate || null,
        requestByDoc: app.requestByDoc || false,
        user: app.user || { id: 0 },
        doc: app.doc || { id: 0 },
      })
    );

    // Combine both sets of applications, removing duplicates based on ID
    const combinedApplications = [
      ...filteredDoctorApplications,
      ...formattedApprovedApplications,
    ];
    const uniqueApplications = Array.from(
      new Map(combinedApplications.map((app) => [app.id, app])).values()
    );

    applicationData = {
      ...docApplicationData,
      data: uniqueApplications,
    };
  } else {
    applicationData = await getUserApplications({ accessToken });
  }

  return (
    <div>
      <ChatForApplicationClient
        applicationsData={applicationData}
        isDoctor={userData.isAdmin}
      />
    </div>
  );
};

export default ChatPageServer;
