import { cookies } from "next/headers";
import React from "react";

const BookingsPage = async () => {
  const userData = JSON.parse((await cookies()).get("userData")?.value ?? "{}");
  return (
    <div>
      <div>Hello {userData.name}</div>
      Bookings
    </div>
  );
};

export default BookingsPage;
