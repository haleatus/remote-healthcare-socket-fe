"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Report } from "@/core/interface/reports.interface";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Clock, FileText } from "lucide-react";
import ReportStatus from "@/components/reports/ReportStatus";

interface ReportDetailProps {
  report: Report | null;
  error?: string;
}

const GetReportByIdClient = ({ report, error }: ReportDetailProps) => {
  if (error || !report) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-md overflow-hidden">
        <CardHeader className="bg-red-50 text-red-700">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle size={24} />
            {error || "Report Not Found"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            The requested report could not be found or loaded.
          </p>
          <Link
            href="/reports"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={16} />
            Back to Reports
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-6 h-full">
      <Card className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-3xl mx-auto">
        {/* PDF Corner Fold Effect */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gray-100">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-t-gray-200 border-l-[48px] border-l-transparent"></div>
        </div>

        <CardHeader className="border-b bg-gray-50 p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-xl font-serif">
                  Medical Report #{report.id}
                </CardTitle>
              </div>
              <ReportStatus status={report.status} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Patient & Doctor Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Patient Information
              </h3>
              <div className="space-y-1">
                <p className="text-sm font-medium">{report.user.name}</p>
                <p className="text-sm text-gray-500">{report.user.email}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Attending Physician
              </h3>
              <div className="space-y-1">
                <p className="text-sm font-medium">{report.doc.name}</p>
                <p className="text-sm text-gray-500">{report.doc.email}</p>
              </div>
            </div>
          </div>

          {/* Medical Details */}
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Clinical Presentation
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {report.problem}
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Treatment Plan
              </h3>
              <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {report.solution}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 mt-6 border-t text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                Last Updated: {new Date(report.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs">CONFIDENTIAL</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetReportByIdClient;
