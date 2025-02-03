"use client";

import { Button } from "@/components/ui/button";
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
import { MapPin, MessageCircleMore, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  allDoctors: IDoctorResponse;
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
  if (!allDoctors?.data || allDoctors.data.length === 0) {
    return (
      <Card className="mt-6">
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
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
                <TableCell>General Physician</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <StarIcon className="text-yellow-400 mr-1" size={16} />
                    <span>4.8</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="text-gray-400 mr-1" size={16} />
                    <span className="text-sm">Available Nationwide</span>
                  </div>
                </TableCell>
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
                <TableCell>
                  <Button asChild size="sm">
                    <Link href={`#`}>
                      <MessageCircleMore className="mr-2 h-4 w-4" />
                      Book
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
