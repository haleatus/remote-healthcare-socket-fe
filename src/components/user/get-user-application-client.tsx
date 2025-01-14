/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { User } from "@/core/types/user.interface";
import { useRouter } from "next/navigation";

interface DataEntry {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  note: string;
  visitDate: string | null;
  requestByDoc: boolean;
  user: User;
  doc: any;
}

interface DataResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: DataEntry[];
}

export default function GetUserApplicationsClient({
  userApplications,
}: {
  userApplications: DataResponse;
}) {
  const [data, setData] = useState<DataResponse>(userApplications);
  const router = useRouter();

  // Update local state when userApplications prop changes
  useEffect(() => {
    setData(userApplications);
  }, [userApplications]);

  const handleUpdate = (id: number) => {
    setData((prevData) => ({
      ...prevData,
      data: prevData.data.map((entry) =>
        entry.id === id
          ? { ...entry, updatedAt: new Date().toISOString(), status: "UPDATED" }
          : entry
      ),
    }));
    // Refresh the server components to get latest data
    router.refresh();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((entry) => (
          <Card key={entry.id} className="relative">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Entry #{entry.id}</h2>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleUpdate(entry.id)}
                className="absolute top-2 right-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Status:</strong> {entry.status}
              </p>
              <p>
                <strong>Note:</strong> {entry.note}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(entry.updatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Request by Doc:</strong>{" "}
                {entry.requestByDoc ? "Yes" : "No"}
              </p>
            </CardContent>
            <CardFooter>
              <div>
                <h3 className="font-semibold">User Info:</h3>
                <p>{entry.user.name}</p>
                <p>{entry.user.email}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
