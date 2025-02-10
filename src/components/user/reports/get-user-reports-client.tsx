"use client";

import ReportStatus from "@/components/reports/ReportStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Report } from "@/core/interface/reports.interface";
import { Clock } from "lucide-react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import NoDataFound from "@/components/doctor/reports/no-data-found";

const GetUserReportsClient = ({ reports }: { reports: Report[] }) => {
  const renderReportCards = () => {
    if (!reports) {
      return <p className="text-center">Loading...</p>;
    }

    if (reports.length === 0) {
      return (
        <NoDataFound
          title={"No Reports Found"}
          description={"We couldn't find any reports"}
        />
      );
    }

    return reports.map((report) => (
      <Card
        key={report.id}
        className="relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
      >
        <CardHeader className="p-2">
          <div className="flex justify-between items-center text-sm">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Report #{report.id}
            </CardTitle>

            <ReportStatus status={report.status} />
            <div>
              <Link
                href={`/reports/${report.id}`}
                className="text-blue-500 hover:text-blue-700 hover:underline"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MdArrowOutward />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View More</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="bg-gray-100 rounded p-1">
            <div className="text-xs font-bold font-mono flex items-center gap-1">
              PATIENT:
              <span className="text-blue-500 uppercase font-semibold">
                {report.user.name}
              </span>
              |{" "}
              <span className="text-emerald-500 font-normal">
                {report.user.email}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-1">
            <div className="text-xs font-bold font-mono flex items-center gap-1">
              DOCTOR:
              <span className="text-blue-500 uppercase font-semibold">
                {report.doc.name}
              </span>
              |{" "}
              <span className="text-emerald-500 font-normal">
                {report.doc.email}
              </span>
            </div>
          </div>

          <div className="space-y-2 pb-4 font-space-grotesk">
            <div>
              <p className="text-xs font-bold font-mono flex items-center gap-1 text-red-500">
                Problem
              </p>
              <p className="text-sm text-red-800 bg-red-50 p-1 rounded max-h-20 overflow-y-auto">
                {report.problem}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold font-mono flex items-center gap-1 text-emerald-500">
                Solution
              </h3>
              <p className="mt-1 text-sm text-green-800 bg-green-50 p-1 rounded max-h-20 overflow-y-auto">
                {report.solution}
              </p>
            </div>
          </div>

          <div className="absolute bottom-1 right-1 text-xs flex items-center gap-1">
            <Clock className="size-3 mt-0.5 text-gray-500" />
            <div>
              <p className="text-gray-500">
                {new Date(report.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="font-bold pb-4 pl-2 text-gray-800">MY REPORTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 font-sans">
        {renderReportCards()}
      </div>
    </div>
  );
};

export default GetUserReportsClient;
