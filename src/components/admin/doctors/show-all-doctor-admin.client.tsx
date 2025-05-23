"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IDoctorResponse } from "@/core/interface/doctor.interface";
import Image from "next/image";

interface Props {
  allDoctors: IDoctorResponse | null;
}

const DoctorImage = ({
  name,
  isOnline,
}: {
  name: string;
  isOnline: boolean;
}) => {
  const avatarUrl = `https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-full ${
          isOnline
            ? "animate-pulse ring-2 ring-green-500"
            : "ring-2 ring-gray-300"
        }`}
      />
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        <Image
          src={avatarUrl || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 40px) 100vw, 40px"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default function ShowAllDoctorAdminDashboard({ allDoctors }: Props) {
  // Handle null case
  if (!allDoctors) {
    return (
      <Card className="font-sans">
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Please log in to view doctors</p>
        </CardContent>
      </Card>
    );
  }

  // Handle error cases
  if (allDoctors.statusCode === 401) {
    return (
      <Card className="font-sans">
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Session expired. Please log in again.</p>
          <p className="text-red-500">
            For now an api in admin side is yet to be made to showcase all
            doctors.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Handle empty or invalid data
  if (
    !allDoctors.data ||
    !Array.isArray(allDoctors.data) ||
    allDoctors.data.length === 0
  ) {
    return (
      <Card className="font-sans">
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No doctors available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="font-sans">
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDoctors.data.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <DoctorImage
                      isOnline={doctor.isOnline}
                      name={doctor.name}
                    />
                    <span>{doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doctor.email}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      doctor.isOnline
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {doctor.isOnline ? "Online" : "Offline"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
