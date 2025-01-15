import CreateUserApplicationServer from "@/app/_components/user/applications/create-user-application-server";
import GetUserApplicationServer from "@/app/_components/user/applications/get-user-applications-server";
import React from "react";

const UserApplicationPage = () => {
  return (
    <div>
      <div className="absolute bottom-4 right-10 z-20">
        <CreateUserApplicationServer />
      </div>
      <div>
        <GetUserApplicationServer />
      </div>
    </div>
  );
};

export default UserApplicationPage;
