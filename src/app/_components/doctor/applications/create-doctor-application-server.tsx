import CreateDoctorApplicationClient from "@/components/doctor/applications/create-doctor-application-clent";
import React from "react";

const CreateDoctorApplicationServer = async ({
  accessToken,
  userId,
  docId,
}: {
  accessToken: string;
  userId: number;
  docId: number;
}) => {
  return (
    <div>
      <CreateDoctorApplicationClient
        accessToken={accessToken}
        userId={userId}
        docId={docId}
      />
    </div>
  );
};

export default CreateDoctorApplicationServer;
