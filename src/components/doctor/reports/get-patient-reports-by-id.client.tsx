"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seperator";
import type { Report } from "@/core/interface/reports.interface";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  UserIcon as UserMd,
} from "lucide-react";

interface ReportDetailProps {
  report: Report | null;
  error?: string;
}

const GetPatientReportByIdClient = ({ report, error }: ReportDetailProps) => {
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
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-md overflow-hidden font-sans">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-emerald-600 text-white">
        <CardTitle className="text-2xl font-bold">
          Report {report.id} Details
        </CardTitle>
        <Badge
          variant="secondary"
          className="mt-2 flex justify-center font-bold uppercase text-white"
        >
          {report.status || "Status not set"}
        </Badge>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Problem</h3>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
            {report.problem || "No problem description available"}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Solution</h3>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
            {report.solution || "No solution provided yet"}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <User className="text-blue-500" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">User</h3>
              <p className="text-gray-600">
                {report.user ? (
                  <>
                    {report.user.name || "Unnamed"}
                    {report.user.email && (
                      <span className="block text-sm text-gray-500">
                        {report.user.email}
                      </span>
                    )}
                  </>
                ) : (
                  "User information not available"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserMd className="text-green-500" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Doctor</h3>
              <p className="text-gray-600">
                {report.doc ? (
                  <>
                    {report.doc.name || "Unnamed"}
                    {report.doc.email && (
                      <span className="block text-sm text-gray-500">
                        {report.doc.email}
                      </span>
                    )}
                  </>
                ) : (
                  "Doctor not assigned"
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          Created:{" "}
          {report.createdAt
            ? new Date(report.createdAt).toLocaleString()
            : "Date not available"}
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle size={16} />
          Updated:{" "}
          {report.updatedAt
            ? new Date(report.updatedAt).toLocaleString()
            : "Not updated yet"}
        </div>
      </CardFooter>
    </Card>
  );
};

export default GetPatientReportByIdClient;
