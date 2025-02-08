"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUser } from "@/core/interface/user.interface";
import UpdateUserApplicationClient from "./update-user-application-client";
import { formatVisitDate } from "@/core/utils/date-formatter";
import { CalendarIcon, ClockIcon, Search, UserIcon } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import CreateUserApplicationClient from "./create-user-application-client";
import {
  ApplicationSuccessResponse,
  IApplication,
} from "@/core/interface/application.interface";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        {entry.status !== "CREATED" && (
          <span
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-full",
              entry.status === "RESOLVED" && "bg-green-100 text-green-600",
              entry.status === "PENDING" && "bg-yellow-100 text-yellow-600",
              entry.status === "CANCELLED" && "bg-red-100 text-red-600",
              entry.status === "IN_PROGRESS" && "bg-blue-100 text-blue-600"
            )}
          >
            {entry.status}
          </span>
        )}

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
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md max-h-16 overflow-auto">
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

const StatusFilter = memo(
  ({
    onFilterChange,
    currentFilter,
  }: {
    onFilterChange: (status: string) => void;
    currentFilter: string;
  }) => (
    <div>
      <Select value={currentFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded shadow-sm">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Applications</SelectItem>
          <SelectItem value="CREATED">Created</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
);

StatusFilter.displayName = "StatusFilter";

export default function GetUserApplicationsClient({
  userApplications,
  accessToken,
  userData,
}: {
  userApplications: ApplicationSuccessResponse;
  accessToken: string;
  userData: IUser;
}) {
  const data = userApplications;

  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApplications = data.data.filter((application) =>
    statusFilter === "ALL" ? true : application.status === statusFilter
  );

  return (
    <div className="p-4">
      <Header
        userData={userData}
        accessToken={accessToken}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />
      {filteredApplications.length === 0 ? (
        <EmptyState />
      ) : (
        <ApplicationGrid
          applications={filteredApplications}
          accessToken={accessToken}
        />
      )}
    </div>
  );
}

const Header = memo(
  ({
    userData,
    accessToken,
    statusFilter,
    onFilterChange,
  }: {
    userData: IUser;
    accessToken: string;
    statusFilter: string;
    onFilterChange: (status: string) => void;
  }) => (
    <div className="sticky top-[48px] font-sans p-2 pr-0 z-30">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">MY APPLICATIONS</h1>
        <div className="flex items-center gap-2">
          <StatusFilter
            currentFilter={statusFilter}
            onFilterChange={onFilterChange}
          />
          {userData && !userData?.isAdmin && (
            <CreateUserApplicationClient accessToken={accessToken} />
          )}
        </div>
      </div>
    </div>
  )
);

Header.displayName = "Header";
const EmptyState = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
    <div className="relative w-full max-w-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 text-center">
        <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Applications Found
        </h2>
        <p className="text-gray-500 mb-6">
          {"We couldn't find any applications matching your criteria."}
        </p>
      </div>
    </div>
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
