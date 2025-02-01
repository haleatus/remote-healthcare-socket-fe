import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import HeaderClient from "@/components/navigation/header-client";
import { AuthState } from "@/core/interface/auth-state.inteface";
import { cookies } from "next/headers";
import React from "react";

const HeaderServer = async () => {
  const userFromCookie = await getCurrentUserFromCookie();

  const cookieStore = await cookies();

  // Only consider a token valid if it exists and has a value
  const userToken = cookieStore.get("accessToken")?.value;
  const adminToken = cookieStore.get("adminAccessToken")?.value;

  // Create auth state based on valid tokens
  const authState: AuthState = {
    isUser: Boolean(userToken),
    isAdmin: Boolean(adminToken),
  };

  // For debugging purposes
  // console.log("Auth State:", {
  //   userToken: Boolean(userToken),
  //   adminToken: Boolean(adminToken),
  // });

  return (
    <>
      <HeaderClient userFromCookie={userFromCookie} authState={authState} />
    </>
  );
};

export default HeaderServer;
