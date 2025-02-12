"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, StarIcon } from "lucide-react";
import Image from "next/image";
import { IDoctorResponse } from "@/core/interface/doctor.interface";
import NoDataFound from "../reports/no-data-found";

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
  // Generate consistent avatar URL based on email
  const avatarUrl = `https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;

  return (
    <div className="relative p-0.5">
      {/* Animated ring */}
      <div
        className={`absolute inset-0 rounded-full ${
          !isOnline
            ? "animate-pulse ring-2 ring-green-500"
            : "ring-2 ring-gray-300"
        }`}
      />
      {/* Static image container */}
      <div className="w-16 h-16 relative rounded-full overflow-hidden">
        <Image
          className="size-12"
          src={avatarUrl}
          fill
          sizes="(max-width: 64px) 100vw, 64px"
          priority={false}
          quality={75}
          alt={name}
        />
      </div>
    </div>
  );
};

export default function ShowAllDoctorsClient({ allDoctors }: Props) {
  if (!allDoctors?.data || allDoctors.data.length === 0) {
    return (
      <NoDataFound
        title={"No Doctors Found"}
        description={"No doctors yet to display"}
      />
    );
  }

  return (
    <div className="flex-grow container mx-auto px-4 font-sans">
      <h1 className="text-xl font-bold text-black">Available Doctors</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allDoctors.data.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden cursor-pointer">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-2 w-full pb-0.5">
                <DoctorImage isOnline={doctor.isOnline} name={doctor.name} />
                <div>
                  <CardTitle className="text-lg uppercase pl-0.5">
                    {doctor.name}
                  </CardTitle>
                  <p className="text-[14px] pl-2 text-teal-600  font-semibold">
                    {doctor.email}
                  </p>
                  <p className="text-xs pl-2 text-teal-600 font-mono">
                    {/* You can add specialty from your API data when available */}
                    Doctor
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2 mt-2 justify-between">
                <div className="flex items-center gap-1">
                  <StarIcon className="text-yellow-400" size={16} />
                  <span className="text-sm">4.8</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-gray-400 mr-1" size={16} />
                  <span className="text-xs text-gray-600">
                    Available Nationwide
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
