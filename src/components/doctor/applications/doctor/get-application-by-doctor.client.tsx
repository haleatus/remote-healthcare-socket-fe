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
import UpdateDoctorApplicationClient from "./update-doctor-application.client";
import CreateDoctorApplicationBaseClient from "./create-doctor-application-base.client";
import ApplicationStatus from "@/components/applications/ApplicationStatus";
import CreateReportForPatientApplicationClient from "../../reports/create-report-for-patient-application.client";
import { deleteApplicationAction } from "@/app/(doctor)/(applications)/approved-applications/_server-actions/delete-application.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteApplicationButton from "../delete-application-button";
import NoDataFound from "../../reports/no-data-found";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplicationCardProps {
  entry: IApplication;
  accessToken: string;
  handleDeleteApplication: (applicationId: number) => Promise<void>;
}

const ApplicationCard = memo(
  ({ entry, accessToken, handleDeleteApplication }: ApplicationCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCardClick = () => {
      setIsDialogOpen(true);
    };

    const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Stop the click event from propagating to the card
    };

    return (
      <>
        <Card
          className="relative bg-white pb-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="absolute bottom-2 right-5" onClick={handleEditClick}>
            <div className="flex items-center gap-1">
              <UpdateDoctorApplicationClient
                id={entry.id}
                initialTitle={entry.title || ""}
                accessToken={accessToken}
                initialNote={entry.note}
                initialDate={entry.visitDate || ""}
                initialStatus={entry.status}
                docId={entry.doc?.id || 0}
              />

              <DeleteApplicationButton
                applicationId={entry.id}
                onDelete={handleDeleteApplication}
              />
              <CreateReportForPatientApplicationClient
                accessToken={accessToken}
                applicationId={entry.id}
                userId={entry.user.id || 0}
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/chat/${entry.id}?patient=${encodeURIComponent(
                      entry.user.name
                    )}&doctor=${encodeURIComponent(entry.doc.name)}`}
                    className=" bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <MessageCircle />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-blue-500">Chat</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
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

              <div className="flex justify-between items-center text-xs text-gray-500">
                <TimeInfo label="Created" date={entry.createdAt} />
                <TimeInfo label="Updated" date={entry.updatedAt} />
              </div>

              <div className="border-t border-gray-100 pt-3">
                <UserInfo user={entry.user} />
                {entry.doc ? (
                  <>
                    <VisitDateInfo date={entry.visitDate} />
                  </>
                ) : (
                  <PendingRequest />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl font-sans max-h-[calc(100vh-100px)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center pr-7">
                <span>Application Details #{entry.id}</span>
                <ApplicationStatus status={entry.status} />
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
                    <TimeInfo label="Created" date={entry.createdAt} />
                    <TimeInfo label="Updated" date={entry.updatedAt} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    User Information
                  </h3>
                  <UserInfo user={entry.user} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Doctor Assignment
                </h3>
                {entry.doc ? (
                  <div className="space-y-2">
                    <DoctorInfo doctor={entry.doc} />
                    <VisitDateInfo date={entry.visitDate} />
                  </div>
                ) : (
                  <PendingRequest />
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-1">
                  <UpdateDoctorApplicationClient
                    id={entry.id}
                    initialTitle={entry.title || ""}
                    accessToken={accessToken}
                    initialNote={entry.note}
                    initialDate={entry.visitDate || ""}
                    initialStatus={entry.status}
                    docId={entry.doc?.id || 0}
                  />

                  <DeleteApplicationButton
                    applicationId={entry.id}
                    onDelete={handleDeleteApplication}
                  />
                  <CreateReportForPatientApplicationClient
                    accessToken={accessToken}
                    applicationId={entry.id}
                    userId={entry.user.id || 0}
                  />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/chat/${entry.id}?patient=${encodeURIComponent(
                          entry.user.name
                        )}&doctor=${encodeURIComponent(entry.doc.name)}`}
                        className=" bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <MessageCircle />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-blue-500">Chat</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

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
      Visit :{" "}
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

interface GetApplicationByDoctorClientProps {
  doctorApplications: ApplicationSuccessResponse;
  accessToken: string;
  userData: IUser;
  allUsersData: IUser[];
  allDoctorsData: IUser[];
}

export default function GetApplicationByDoctorClient({
  doctorApplications,
  accessToken,
  userData,
  allUsersData,
  allDoctorsData,
}: GetApplicationByDoctorClientProps) {
  const { data } = doctorApplications;

  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApplications = data.filter((application) =>
    statusFilter === "ALL" ? true : application.status === statusFilter
  );

  const handleDeleteApplication = async (applicationId: number) => {
    try {
      await deleteApplicationAction(accessToken, applicationId);
      toast.success("Application deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="p-4 pt-0">
      <Header
        userData={userData}
        accessToken={accessToken}
        statusFilter={statusFilter}
        allUsersData={allUsersData}
        allDoctorsData={allDoctorsData}
        onFilterChange={setStatusFilter}
      />
      {filteredApplications.length === 0 ? (
        <NoDataFound
          title={"No Approved Application Found"}
          description={"We couldn't find any approved applications"}
        />
      ) : (
        <ApplicationGrid
          applications={filteredApplications}
          accessToken={accessToken}
          handleDeleteApplication={handleDeleteApplication}
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
    allUsersData,
    allDoctorsData,
    onFilterChange,
  }: {
    userData: IUser;
    allUsersData: IUser[];
    accessToken: string;
    statusFilter: string;
    allDoctorsData: IUser[];
    onFilterChange: (status: string) => void;
  }) => (
    <div className="sticky top-[60px] font-sans p-2 pr-0 z-30">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">APPLICATIONS FOR ME</h1>
        <div className="flex items-center gap-2">
          <StatusFilter
            currentFilter={statusFilter}
            onFilterChange={onFilterChange}
          />
          {userData && userData?.isAdmin && (
            <CreateDoctorApplicationBaseClient
              allUsersData={allUsersData}
              accessToken={accessToken}
              docId={userData.id}
              allDoctorsData={allDoctorsData}
            />
          )}
        </div>
      </div>
    </div>
  )
);

Header.displayName = "Header";

const ApplicationGrid = memo(
  ({
    applications,
    accessToken,
    handleDeleteApplication,
  }: {
    applications: IApplication[];
    accessToken: string;
    handleDeleteApplication: (applicationId: number) => Promise<void>;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
      {applications.map((entry) => (
        <ApplicationCard
          key={entry.id}
          entry={entry}
          accessToken={accessToken}
          handleDeleteApplication={handleDeleteApplication}
        />
      ))}
    </div>
  )
);

ApplicationGrid.displayName = "ApplicationGrid";
