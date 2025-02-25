import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";
import { getMyMedicationsAction } from "@/app/actions/user/medications/get-my-medications.action";
import React from "react";

const page = async () => {
  const accessToken = await getCurrentUserAccessToken();
  const user = await getCurrentUserFromCookie();

  if (!accessToken || !user) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page</p>
      </div>
    );
  }

  const myMeds = await getMyMedicationsAction({
    accessToken,
    userId: user.id.toString(),
  });

  console.log("meds", myMeds);

  return <div>Meds</div>;
};

export default page;
