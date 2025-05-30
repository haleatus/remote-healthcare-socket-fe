import CreateDoctorsClient from "@/components/admin/create-doctors-client";
import { cookies } from "next/headers";
import React from "react";

const CreateDoctorsServer = async () => {
  const cookieStore = await cookies();
  const adminAccessToken = cookieStore.get("adminAccessToken")?.value;

  if (!adminAccessToken) {
    return <div>Login as admin to access this page</div>;
  }

  return (
    <div>
      <CreateDoctorsClient adminAccessToken={adminAccessToken} />
    </div>
  );
};

export default CreateDoctorsServer;
