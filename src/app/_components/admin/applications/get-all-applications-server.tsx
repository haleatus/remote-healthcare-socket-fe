import { getAllApplications } from "@/app/actions/admin/get-all-application.action";
import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import GetAllApplicationClient from "@/components/admin/applications/get-all-application-client";
import React from "react";

const GetAllApplicationsServer = async () => {
  // This needs to be changed
  const adminAccessToken = await getCurrentUserAccessToken();

  if (!adminAccessToken) {
    return null;
  }

  const allApplicationData = await getAllApplications({ adminAccessToken });

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
