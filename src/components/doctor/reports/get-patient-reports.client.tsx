"use client";

import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import ReportStatus from "@/components/reports/ReportStatus";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import NoDataFound from "./no-data-found";
import type {
  Report,
  ReportSuccessResponse,
} from "@/core/interface/reports.interface";
import { deletePatientReportAction } from "@/app/(doctor)/(reports)/patient-logs/_server-actions/delete-patient-reports.action";
import ReportDetailPopup from "./report-detail-popup";
import UpdateReportForPatientApplicationClient from "./update-report-for-patient-application.client";
import DeleteReportButton from "./delete-report-button";
import { IMedication } from "@/core/interface/medication.interface";

const GetPatientReportsClient = ({
  reports,
  accessToken,
  allMedication,
}: {
  reports: ReportSuccessResponse;
  accessToken: string;
  allMedication: IMedication[];
}) => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  console.log("all Meds", allMedication);

  const filteredReports = reports.data.filter(
    (report) => report.doc.id === user?.id
  );

  const handleDeleteReport = async (reportId: number) => {
    try {
      await deletePatientReportAction(accessToken, reportId);
      toast.success("Report deleted successfully");
      setSelectedReport(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete report");
    }
  };

  const renderReportCards = () => {
    if (!reports) {
      return <p className="text-center">Loading...</p>;
    }

    if (filteredReports.length === 0) {
      return (
        <NoDataFound
          title="No Patient Report Found"
          description="We couldn't find any patient reports"
        />
      );
    }

    return filteredReports.map((report) => (
      <Card
        key={report.id}
        className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
        onClick={() => setSelectedReport(report)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-600">
              #{report.id}
            </span>
            <ReportStatus status={report.status} />
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Patient</p>
              <p className="text-sm font-medium truncate">{report.user.name}</p>
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

            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <UpdateReportForPatientApplicationClient
                accessToken={accessToken}
                reportId={report.id}
                initialProblem={report.problem}
                initialSolution={report.solution}
                initialStatus={report.status}
              />
              <DeleteReportButton
                reportId={report.id}
                onDelete={handleDeleteReport}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="font-bold pb-4 pl-2 text-gray-800">
        {"PATIENTS' REPORTS"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {renderReportCards()}
      </div>
      {selectedReport && (
        <ReportDetailPopup
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          accessToken={accessToken}
          onDelete={handleDeleteReport}
          allMedication={allMedication}
        />
      )}
    </div>
  );
};

export default GetPatientReportsClient;
