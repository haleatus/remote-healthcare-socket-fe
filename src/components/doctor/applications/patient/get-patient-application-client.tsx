"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/core/interface/user.interface";
import { ClockIcon, UserIcon } from "lucide-react";
import { ApplicationSuccessResponse } from "@/core/interface/application.interface";
import UpdatePatientApplicationClient from "./update-patient-application.client";
import DeclinePatientApplicationClient from "./decline-patient-application.client";
import NoDataFound from "../../reports/no-data-found";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function GetPatientApplicationsClient({
  patientApplications,
  accessToken,
  currentDoctor,
}: {
  patientApplications: ApplicationSuccessResponse;
  accessToken: string;
  currentDoctor: IUser;
}) {
  const data = patientApplications;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the card
  };

  if (data.data.length === 0) {
    return (
      <NoDataFound
        title={"No Patient Application Found"}
        description={"We couldn't find any patient applications"}
      />
    );
  }

  return (
    <div className="p-4 font-sans">
      <h1 className="font-bold pb-4 pl-2 text-gray-800">
        PATIENTS&apos; APPLICATION
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
        {data.data.map((entry) => (
          <div key={entry.id}>
            <Card
              className="relative bg-white pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={handleCardClick}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Application #{entry.id}
                  </CardTitle>
                  <div
                    className="flex items-center space-x-2"
                    onClick={handleEditClick}
                  >
                    <DeclinePatientApplicationClient
                      applicationId={entry.id}
                      accessToken={accessToken}
                      docId={currentDoctor.id}
                      patientsNote={entry.note}
                    />
                    <UpdatePatientApplicationClient
                      applicationId={entry.id}
                      accessToken={accessToken}
                      docId={currentDoctor.id}
                      patientsNote={entry.note}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Issue
                    </p>
                    <p className="text-sm bg-gray-50 rounded-md line-clamp-1">
                      {entry.note}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>
                        Created:{" "}
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>
                        Updated:{" "}
                        {new Date(entry.updatedAt).toLocaleDateString()}
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
                      <p className="text-xs text-gray-500">
                        {entry.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl font-sans max-h-[calc(100vh-100px)] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex justify-between items-center">
                    <span>Application Details #{entry.id}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4 pb-7">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">
                      Issue Description
                    </h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                      {entry.note}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">
                        Timestamps
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          <span>
                            Created:{" "}
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          <span>
                            Updated:{" "}
                            {new Date(entry.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">
                        Application By:
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <p className="text-sm font-medium text-gray-700">
                            {entry.user.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {entry.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center space-x-2">
                      <DeclinePatientApplicationClient
                        applicationId={entry.id}
                        accessToken={accessToken}
                        docId={currentDoctor.id}
                        patientsNote={entry.note}
                      />
                      <UpdatePatientApplicationClient
                        applicationId={entry.id}
                        accessToken={accessToken}
                        docId={currentDoctor.id}
                        patientsNote={entry.note}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
