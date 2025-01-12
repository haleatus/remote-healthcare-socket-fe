import AdminSignUpClient from "@/components/auth/admin/admin-signup-client";
import { cookies } from "next/headers";
import React from "react";

const AdminSignUpServer = async () => {
  const adminAccessToken = JSON.parse(
    (await cookies()).get("adminAccessToken")?.value || "null"
  );

  if (!adminAccessToken) {
    return <div>Login as admin to access this page</div>;
  }

  return (
    <div>
      <AdminSignUpClient adminAccessToken={adminAccessToken} />
    </div>
  );
};

export default AdminSignUpServer;
