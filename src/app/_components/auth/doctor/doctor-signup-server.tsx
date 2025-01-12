import DoctorSignUpClient from "@/components/auth/doctor/doctor-signup-client";
import { cookies } from "next/headers";
import React from "react";

const DoctorSignUpServer = async () => {
  const cookieStore = await cookies();
  const adminAccessToken = cookieStore.get("adminAccessToken")?.value;

  if (!adminAccessToken) {
    return <div>Login as admin to access this page</div>;
  }
  return (
    <div>
      <DoctorSignUpClient adminAccessToken={adminAccessToken} />
    </div>
  );
};

export default DoctorSignUpServer;
