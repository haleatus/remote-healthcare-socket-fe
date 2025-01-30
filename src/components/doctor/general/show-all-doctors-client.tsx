import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { IDoctor } from "@/core/types/doctor.interface";

export default function DoctorsList({
  allDoctors,
}: {
  allDoctors: IDoctor[] | null;
}) {
  // If data is null, show loading state
  if (allDoctors === null) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Doctors List</h1>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If data is empty array
  if (allDoctors.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Doctors List</h1>
        <Alert>
          <AlertDescription>
            No doctors found. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Doctors List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDoctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={doctor.avatar || "/placeholder.svg"}
                    alt={doctor.name || "Doctor"}
                  />
                  <AvatarFallback>
                    {doctor.name
                      ? doctor.name.substring(0, 2).toUpperCase()
                      : "DR"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                {doctor.name || "Unknown"}
              </TableCell>
              <TableCell>{doctor.email || "No email provided"}</TableCell>
              <TableCell>
                {doctor.createdAt
                  ? new Date(doctor.createdAt).toLocaleDateString()
                  : "Date not available"}
              </TableCell>
              <TableCell>
                <Badge variant={doctor.isVerified ? "success" : "destructive"}>
                  {doctor.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
