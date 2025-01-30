import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, Clock, AlertCircle, MessageSquare } from "lucide-react";

const appointments = [
  {
    id: 1,
    patientName: "Alice Johnson",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "Pending",
    reason: "Annual checkup",
    urgency: "Low",
    timezone: "EST",
  },
  {
    id: 2,
    patientName: "Bob Smith",
    date: "2023-06-16",
    time: "2:00 PM",
    status: "Confirmed",
    reason: "Follow-up on medication",
    urgency: "Medium",
    timezone: "PST",
  },
  {
    id: 3,
    patientName: "Charlie Brown",
    date: "2023-06-17",
    time: "11:30 AM",
    status: "Pending",
    reason: "Persistent cough",
    urgency: "High",
    timezone: "CST",
  },
];

export default function DoctorDashboard() {
  return (
    <div className="container mx-auto px-6 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-teal-800">
        Remote Consultation Dashboard
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="p-4 border-b">
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800 font-space-grotesk">
                  {appointment.patientName}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize tracking-wide shadow-sm ${
                    {
                      Confirmed: "bg-green-100 text-green-800",
                      Pending: "bg-yellow-100 text-yellow-800",
                    }[appointment.status]
                  }`}
                >
                  {appointment.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-2 md:gap-4 font-mono">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-5 w-5 text-teal-500" />
                  {appointment.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-teal-500" />
                  {appointment.time} ({appointment.timezone})
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <AlertCircle className="mr-2 h-5 w-5 text-teal-500" />
                  Urgency: {appointment.urgency}
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-sm">
                Reason: {appointment.reason}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="border-teal-500 text-teal-500 hover:bg-teal-50 flex items-center space-x-2"
                >
                  <Link href={`/chat/${appointment.id}`}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Start Chat</span>
                  </Link>
                </Button>
                {appointment.status === "Pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-50"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Deny
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
