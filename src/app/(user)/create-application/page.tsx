import CreateUserApplicationServer from "@/app/_components/user/applications/create-user-application-server";
import GetUserApplicationServer from "@/app/_components/user/applications/get-user-applications-server";
import React from "react";

const CreateUserApplicationPage = () => {
  return (
    <div>
      <CreateUserApplicationServer />
      <div>
        <GetUserApplicationServer />
      </div>
    </div>
  );
};

export default CreateUserApplicationPage;
