import BookAppointmentClient from "@/components/book/book-appointment-client";
import React from "react";

const BookAppointmentServer = ({ id }: { id: string }) => {
  return (
    <div>
      <BookAppointmentClient id={id} />
    </div>
  );
};

export default BookAppointmentServer;
