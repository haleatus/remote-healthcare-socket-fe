/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/core/types/user.interface";
import CreateDoctorApplicationClient from "./create-doctor-application-clent";
import { ClockIcon, UserIcon } from "lucide-react";

interface DataEntry {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  note: string;
  visitDate: string | null;
  requestByDoc: boolean;
  user: IUser;
  doc: any;
}

interface DataResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: DataEntry[];
}

export default function GetDoctorApplicationsClient({
  userApplications,
  accessToken,
  currentDoctor,
}: {
  userApplications: DataResponse;
  accessToken: string;
  currentDoctor: IUser;
}) {
  const data = userApplications;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8 font-space-grotesk text-gray-800">
        Patients&apos; Application
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 font-sans">
        {data.data.map((entry) => (
          <Card
            key={entry.id}
            className="relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Application #{entry.id}
                </CardTitle>
                <CreateDoctorApplicationClient
                  applicationId={entry.id}
                  userId={entry.user.id}
                  accessToken={accessToken}
                  docId={currentDoctor.id}
                  patientsNote={entry.note}
                />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Issue
                  </p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md">
                    {entry.note}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    <span>
                      Created: {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    <span>
                      Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                      <p className="text-sm font-medium text-gray-700">
                        {entry.user.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">{entry.user.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
