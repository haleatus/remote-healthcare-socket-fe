"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, MessageCircleMore, StarIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Jenna Doe",
    specialty: "Telemedicine Specialist",
    rating: 4.8,
    location: "Available Nationwide",
    image:
      "https://images.pexels.com/photos/19131217/pexels-photo-19131217/free-photo-of-smiling-doctor-with-stethoscope-in-pocket.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Remote Dermatologist",
    rating: 4.9,
    location: "Available Internationally",
    image:
      "https://images.pexels.com/photos/9862000/pexels-photo-9862000.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Dr. Mike Johnson",
    specialty: "Virtual Pediatrician",
    rating: 4.7,
    location: "Available Nationwide",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Dr. Sarah Lee",
    specialty: "Telepsychiatrist",
    rating: 4.9,
    location: "Available Nationwide",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Dr. Robert Chen",
    specialty: "Remote Cardiologist",
    rating: 4.8,
    location: "Available Internationally",
    image:
      "https://images.pexels.com/photos/32976/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Dr. Emily Davis",
    specialty: "Telehealth Gynecologist",
    rating: 4.9,
    location: "Available Nationwide",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const DoctorImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-16 h-16 rounded-full overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        fill
        sizes="(max-width: 64px) 100vw, 64px"
        priority={false}
        quality={75}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function DoctorListing() {
  return (
    <div className="flex-grow container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Available Remote Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-4">
                <DoctorImage src={doctor.image} alt={doctor.name} />
                <div>
                  <CardTitle className="text-lg font-space-grotesk">
                    {doctor.name}
                  </CardTitle>
                  <p className="text-sm text-teal-600">{doctor.specialty}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2 mt-2 justify-between">
                <div className="flex items-center gap-1">
                  <StarIcon className="text-yellow-400" size={16} />
                  <span className="text-sm">{doctor.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-gray-400 mr-1" size={16} />
                  <span className="text-sm text-gray-600">
                    {doctor.location}
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-teal-700 transition-colors duration-300 ease-in-out"
              >
                <Link href={`/book/${doctor.id}`}>
                  <MessageCircleMore className="mr-2 h-4 w-4" />
                  Book Consultation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
