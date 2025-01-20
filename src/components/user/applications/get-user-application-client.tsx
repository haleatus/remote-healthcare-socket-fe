/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/core/types/user.interface";
import UpdateUserApplicationClient from "./update-user-application-client";

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
  accessToken,
}: {
  userApplications: DataResponse;
  accessToken: string;
}) {
  const data = userApplications;

  return (
    <div className="p-4">
      <h1 className="text-xl font-medium mb-6 font-space-grotesk">
        My Applications
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-sans">
        {data.data.map((entry) => (
          <Card
            key={entry.id}
            className="relative bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">#{entry.id}</span>
                <div>
                  <UpdateUserApplicationClient
                    id={entry.id}
                    accessToken={accessToken}
                    initialNote={entry.note}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Issue</p>
                  <p className="text-sm pl-4">{entry.note}</p>
                </div>

                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <p>
                    Created: {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="border-t border-gray-100 flex flex-wrap items-center justify-between py-2">
                  <p className="text-sm font-medium text-gray-700">
                    {entry.user.name}
                  </p>
                  <p className="text-sm text-gray-500">{entry.user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
