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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-medium mb-6 font-space-grotesk">
        My Applications
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      entry.status === "UPDATED"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Note</p>
                  <p className="text-sm">{entry.note}</p>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    Created: {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
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
