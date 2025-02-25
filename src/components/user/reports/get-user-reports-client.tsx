"use client";

import ReportStatus from "@/components/reports/ReportStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Report } from "@/core/interface/reports.interface";
import { Clock } from "lucide-react";
import NoDataFound from "@/components/doctor/reports/no-data-found";
import { useRouter } from "next/navigation";

const GetUserReportsClient = ({ reports }: { reports: Report[] }) => {
  const router = useRouter();
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
        className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
        onClick={() => router.push(`/reports/${report.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-sm font-medium text-gray-600">
              <span>
                {report.title
                  ? report.title.length > 30
                    ? report.title.slice(0, 27) + "..."
                    : report.title
                  : "No Title"}
              </span>{" "}
              #{report.id}
            </h1>
            <ReportStatus status={report.status} />
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Doctor</p>
              <p className="text-sm font-medium truncate">{report.doc.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500">Problem</p>
              <p className="text-sm line-clamp-1 text-gray-700">
                {report.problem}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t">
            <div className="flex items-center">
              <Clock className="size-3 mr-1" />
              <span>{new Date(report.updatedAt).toLocaleDateString()}</span>
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
