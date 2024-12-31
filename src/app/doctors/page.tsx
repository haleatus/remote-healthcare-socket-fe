import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Star, MapPin, MessageCircleMore } from "lucide-react";
import Image from "next/image";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Telemedicine Specialist",
    rating: 4.8,
    location: "Available Nationwide",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Remote Dermatologist",
    rating: 4.9,
    location: "Available Internationally",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Dr. Mike Johnson",
    specialty: "Virtual Pediatrician",
    rating: 4.7,
    location: "Available Nationwide",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Dr. Sarah Lee",
    specialty: "Telepsychiatrist",
    rating: 4.9,
    location: "Available Nationwide",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Dr. Robert Chen",
    specialty: "Remote Cardiologist",
    rating: 4.8,
    location: "Available Internationally",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Dr. Emily Davis",
    specialty: "Telehealth Gynecologist",
    rating: 4.9,
    location: "Available Nationwide",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function DoctorListing() {
  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">
        Available Remote Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-4">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full"
                  width={64}
                  height={64}
                  unoptimized
                />
                <div>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <p className="text-sm text-teal-600">{doctor.specialty}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-1" size={16} />
                <span className="text-sm">{doctor.rating}</span>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="text-gray-400 mr-1" size={16} />
                <span className="text-sm text-gray-600">{doctor.location}</span>
              </div>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
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
