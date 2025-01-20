import AdminSignUpClient from "@/components/admin/create-admin-client";
import { cookies } from "next/headers";
import React from "react";

const CreateAdminServer = async () => {
  const cookieStore = await cookies();
  const adminAccessToken = cookieStore.get("adminAccessToken")?.value;

  if (!adminAccessToken) {
    return <div>Login as admin to access this page</div>;
  }

  return (
    <div>
      <AdminSignUpClient adminAccessToken={adminAccessToken} />
    </div>
  );
};

export default CreateAdminServer;
