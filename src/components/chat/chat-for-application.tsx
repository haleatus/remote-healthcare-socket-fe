"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUser } from "@/core/interface/user.interface";
import type {
  ApplicationSuccessResponse,
  IApplication,
} from "@/core/interface/application.interface";
import { formatVisitDate } from "@/core/utils/date-formatter";
import { CalendarIcon, ClockIcon, MessageCircle, UserIcon } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { memo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplicationStatus from "@/components/applications/ApplicationStatus";
import { useRouter } from "next/navigation";
import NoDataFound from "../doctor/reports/no-data-found";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ApplicationCardProps {
  entry: IApplication;
  isDoctor: boolean;
}

const ApplicationCard = memo(({ entry, isDoctor }: ApplicationCardProps) => {
  const router = useRouter();
  return (
    <>
      <Card
        className="relative bg-white pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
        onClick={() =>
          router.push(
            `/chat/${entry.id}?patient=${encodeURIComponent(
              entry.user.name
            )}&doctor=${encodeURIComponent(entry.doc.name)}`
          )
        }
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Application #{entry.id}
            </CardTitle>
            <ApplicationStatus status={entry.status} />
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Issue</p>
              <p className="text-sm bg-gray-50 rounded-md line-clamp-1">
                {entry.note}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              {isDoctor ? (
                <>
                  <UserInfo user={entry.user} />
                  {entry.visitDate && <VisitDateInfo date={entry.visitDate} />}
                </>
              ) : (
                <>
                  {entry.doc ? (
                    <>
                      <DoctorInfo doctor={entry.doc} />
                      <VisitDateInfo date={entry.visitDate} />
                    </>
                  ) : (
                    <PendingRequest />
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
        <div className="absolute bottom-2 right-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Link
                  href={`/chat/${entry.id}?patient=${encodeURIComponent(
                    entry.user.name
                  )}&doctor=${encodeURIComponent(entry.doc.name)}`}
                  className=" text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-blue-500">Chat</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </>
  );
});

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
        <span className="font-normal">{doctor.name}</span>
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
      Visit:{" "}
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
        <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded shadow-sm font-sans">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className="font-sans">
          <SelectItem value="ALL">All Applications</SelectItem>
          <SelectItem value="CREATED">Created</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
);

StatusFilter.displayName = "StatusFilter";

interface ChatForApplicationClientProps {
  applicationsData: ApplicationSuccessResponse;
  isDoctor: boolean;
}

export default function ChatForApplicationClient({
  applicationsData,
  isDoctor,
}: ChatForApplicationClientProps) {
  const { data } = applicationsData;

  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApplications = data.filter((application) =>
    statusFilter === "ALL" ? true : application.status === statusFilter
  );

  return (
    <div className="p-4 pt-0">
      <Header statusFilter={statusFilter} onFilterChange={setStatusFilter} />
      {filteredApplications.length === 0 ? (
        <NoDataFound
          title={"No Applications Found"}
          description={"We couldn't find any applications"}
        />
      ) : (
        <ApplicationGrid
          applications={filteredApplications}
          isDoctor={isDoctor}
        />
      )}
    </div>
  );
}

const Header = memo(
  ({
    statusFilter,
    onFilterChange,
  }: {
    statusFilter: string;
    onFilterChange: (status: string) => void;
  }) => (
    <div className="sticky top-[60px] font-sans p-2 pr-0 z-30">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">APPLICATIONS</h1>
        <div className="flex items-center gap-2">
          <StatusFilter
            currentFilter={statusFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
    </div>
  )
);

Header.displayName = "Header";

const ApplicationGrid = memo(
  ({
    applications,
    isDoctor,
  }: {
    applications: IApplication[];
    isDoctor: boolean;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
      {applications.map((entry) => (
        <ApplicationCard key={entry.id} entry={entry} isDoctor={isDoctor} />
      ))}
    </div>
  )
);

ApplicationGrid.displayName = "ApplicationGrid";
