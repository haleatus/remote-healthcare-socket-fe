"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUser } from "@/core/types/user.interface";
import type {
  ApplicationSuccessResponse,
  IApplication,
} from "@/core/types/application.interface";
import UpdateUserApplicationClient from "@/components/user/applications/update-user-application-client";
import { formatVisitDate } from "@/core/utils/date-formatter";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import CreateUserApplicationClient from "@/components/user/applications/create-user-application-clent";
import { memo } from "react";

interface ApplicationCardProps {
  entry: IApplication;
  accessToken: string;
}

const ApplicationCard = memo(({ entry, accessToken }: ApplicationCardProps) => (
  <Card className="relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-700">
          Application #{entry.id}
        </CardTitle>
        <UpdateUserApplicationClient
          id={entry.id}
          accessToken={accessToken}
          initialNote={entry.note}
        />
      </div>
    </CardHeader>
    <CardContent className="pt-2">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Issue</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md">
            {entry.note}
          </p>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <TimeInfo label="Created" date={entry.createdAt} />
          <TimeInfo label="Updated" date={entry.updatedAt} />
        </div>

        <div className="border-t border-gray-100 pt-3">
          <UserInfo user={entry.user} />
          {entry.doc ? (
            <>
              <DoctorInfo doctor={entry.doc} />
              <VisitDateInfo date={entry.visitDate} />
            </>
          ) : (
            <PendingRequest />
          )}
        </div>
      </div>
    </CardContent>
  </Card>
));

ApplicationCard.displayName = "ApplicationCard";

const TimeInfo = memo(({ label, date }: { label: string; date: string }) => (
  <div className="flex items-center">
    <ClockIcon className="w-3 h-3 mr-1" />
    <span>
      {label}: {new Date(date).toLocaleDateString()}
    </span>
  </div>
));

TimeInfo.displayName = "TimeInfo";

const UserInfo = memo(({ user }: { user: IUser }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
      <p className="text-sm font-medium text-gray-700">{user.name}</p>
    </div>
    <p className="text-xs text-gray-500">{user.email}</p>
  </div>
));

UserInfo.displayName = "UserInfo";

const DoctorInfo = memo(({ doctor }: { doctor: IUser }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      <FaUserDoctor className="w-4 h-4 mr-2 text-gray-500" />
      <p className="text-sm font-medium text-gray-700">
        Approved By: <span className="font-normal">{doctor.name}</span>
      </p>
    </div>
    <p className="text-xs text-gray-500">{doctor.email}</p>
  </div>
));

DoctorInfo.displayName = "DoctorInfo";

const VisitDateInfo = memo(({ date }: { date: string | null }) => (
  <div className="flex items-center">
    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
    <p className="text-sm text-gray-700 flex justify-between w-full items-center">
      Visit Date:{" "}
      <span className="font-light text-xs">
        {date ? formatVisitDate(date) : "Not scheduled"}
      </span>
    </p>
  </div>
));

VisitDateInfo.displayName = "VisitDateInfo";

const PendingRequest = memo(() => (
  <div className="flex items-center">
    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
    <p className="text-sm text-gray-700">
      Request: <span className="font-medium">Pending</span>
    </p>
  </div>
));

PendingRequest.displayName = "PendingRequest";

interface GetApplicationByDoctorClientProps {
  doctorApplications: ApplicationSuccessResponse;
  accessToken: string;
  userData: IUser;
}

export default function GetApplicationByDoctorClient({
  doctorApplications,
  accessToken,
  userData,
}: GetApplicationByDoctorClientProps) {
  const { data } = doctorApplications;

  return (
    <div className="p-2">
      <Header userData={userData} accessToken={accessToken} />
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ApplicationGrid applications={data} accessToken={accessToken} />
      )}
    </div>
  );
}

const Header = memo(
  ({ userData, accessToken }: { userData: IUser; accessToken: string }) => (
    <div className="sticky top-[56px] flex justify-between items-center font-sans p-2 z-30 bg-white">
      <h1 className="font-bold">MY APPLICATIONS</h1>
      {userData && !userData?.isAdmin && (
        <CreateUserApplicationClient accessToken={accessToken} />
      )}
    </div>
  )
);

Header.displayName = "Header";

const EmptyState = () => (
  <div className="flex items-center justify-center h-full">
    <p className="text-sm text-gray-500">No Applications Found</p>
  </div>
);

const ApplicationGrid = memo(
  ({
    applications,
    accessToken,
  }: {
    applications: IApplication[];
    accessToken: string;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 font-sans">
      {applications.map((entry) => (
        <ApplicationCard
          key={entry.id}
          entry={entry}
          accessToken={accessToken}
        />
      ))}
    </div>
  )
);

ApplicationGrid.displayName = "ApplicationGrid";
