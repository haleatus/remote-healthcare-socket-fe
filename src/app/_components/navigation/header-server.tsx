import { getCurrentUser } from "@/app/actions/user/get-current-user.action";
import HeaderClient from "@/components/navigation/header-client";
import React from "react";

const HeaderServer = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <HeaderClient user={user} />
    </>
  );
};

export default HeaderServer;
