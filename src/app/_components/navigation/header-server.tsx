import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import HeaderClient from "@/components/navigation/header-client";
import React from "react";

const HeaderServer = async () => {
  const user = await getCurrentUserFromCookie();
  return (
    <>
      <HeaderClient user={user} />
    </>
  );
};

export default HeaderServer;
