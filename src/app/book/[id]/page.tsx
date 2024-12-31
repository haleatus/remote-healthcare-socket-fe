import BookAppointmentServer from "@/app/_components/book/book-appointment-server";
import React from "react";

interface BookAppointmentPageProps {
  params: {
    id: string;
  };
}

const BookAppointmentPage = ({ params }: BookAppointmentPageProps) => {
  const id = params.id;
  return (
    <div>
      <BookAppointmentServer id={id} />
    </div>
  );
};

export default BookAppointmentPage;
