import { getAllApplications } from "@/app/actions/admin/applications/get-all-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUser } from "@/app/actions/user/get-current-user.action";
import GetAllApplicationClient from "@/components/admin/applications/get-all-application-client";
import React from "react";

const GetAllApplicationsServer = async () => {
  // This needs to be changed
  const adminAccessToken = await getCurrentUserAccessToken();
  const userData = await getCurrentUser();

  // Handle unauthenticated or unauthorized users
  if (!userData) {
    return (
      <div>
        <h1>Not authenticated</h1>
      </div>
    );
  }

  if (!userData.isAdmin) {
    return (
      <div>
        <h1>Not authorized</h1>
        <p>You do not have the required permissions to access this page.</p>
      </div>
    );
  }
  const allApplicationData = adminAccessToken
    ? await getAllApplications({ adminAccessToken })
    : null;

  if (!allApplicationData) {
    return (
      <div>
        <h1>No applications found</h1>
      </div>
    );
  }

  return (
    <div>
      <GetAllApplicationClient allApplicationData={allApplicationData} />
    </div>
  );
};

export default GetAllApplicationsServer;
