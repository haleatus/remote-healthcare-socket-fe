import BookAppointmentServer from "@/app/_components/book/book-appointment-server";
import React from "react";

interface BookAppointmentPageProps {
  params: Promise<{ id: string }>;
}

const BookAppointmentPage = async ({ params }: BookAppointmentPageProps) => {
  const { id } = await params;
  return (
    <div>
      <BookAppointmentServer id={id} />
    </div>
  );
};

export default BookAppointmentPage;
