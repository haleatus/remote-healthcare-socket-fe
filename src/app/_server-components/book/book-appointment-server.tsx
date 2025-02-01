import BookAppointmentClient from "@/components/book/book-appointment-client";
import React from "react";

const BookAppointmentServer = async ({ id }: { id: string }) => {
  return (
    <div>
      <BookAppointmentClient id={id} />
    </div>
  );
};

export default BookAppointmentServer;
