import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUser } from "@/app/actions/user/get-current-user.action";
import CreateDoctorApplicationClient from "@/components/doctor/applications/create-doctor-application-clent";
import Link from "next/link";
import React from "react";

const CreateDoctorApplicationServer = async ({
  userId,
}: {
  userId: number;
}) => {
  const accessToken = await getCurrentUserAccessToken();

  const currentDoctor = await getCurrentUser();

  if (!accessToken) {
    return (
      <div className="flex flex-col">
        <span>Access Token Not Found</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }

  if (!currentDoctor) {
    return (
      <div className="flex flex-col">
        <span>Unauthorized, to access you need to be a doctor</span>
        <Link href="/signin">Signin</Link>
      </div>
    );
  }

  return (
    <div>
      <CreateDoctorApplicationClient
        accessToken={accessToken}
        userId={userId}
        docId={currentDoctor.id}
      />
    </div>
  );
};

export default CreateDoctorApplicationServer;
