import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Calendar,
  Clock,
  AlertCircle,
  Video,
  MessageSquare,
} from "lucide-react";

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
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">
        Remote Consultation Dashboard
      </h1>
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{appointment.patientName}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-teal-500" />
                  <p>{appointment.date}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-teal-500" />
                  <p>
                    {appointment.time} ({appointment.timezone})
                  </p>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-teal-500" />
                  <p>Urgency: {appointment.urgency}</p>
                </div>
              </div>
              <p className="mt-2">Reason: {appointment.reason}</p>
              <div className="mt-4 space-x-2">
                <Button
                  variant="outline"
                  asChild
                  className="border-teal-500 text-teal-500 hover:bg-teal-50"
                >
                  <Link href={`/chat/${appointment.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-500 hover:bg-teal-50"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Start Video Call
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
