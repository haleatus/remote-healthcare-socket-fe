"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Report } from "@/core/types/reports.interface";
import Link from "next/link";

interface ReportDetailProps {
  report: Report | null;
  error?: string;
}
const GetReportByIdClient = ({ report, error }: ReportDetailProps) => {
  if (error || !report) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{error || "Report Not Found"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The requested report could not be found or loaded.</p>
          <div className="flex items-center space-x-4">
            <Link
              href="/reports"
              className="text-blue-600 hover:underline flex items-center"
            >
              ← Back to Reports
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Report Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold">Problem</h3>
            <p>{report.problem || "No problem description available"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Solution</h3>
            <p>{report.solution || "No solution provided yet"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <p>{report.status || "Status not set"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">User</h3>
            <p>
              {report.user ? (
                <>
                  {report.user.name || "Unnamed"}
                  {report.user.email ? `(${report.user.email})` : ""}
                </>
              ) : (
                "User information not available"
              )}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Doctor</h3>
            <p>
              {report.doc ? (
                <>
                  {report.doc.name || "Unnamed"}
                  {report.doc.email ? `(${report.doc.email})` : ""}
                </>
              ) : (
                "Doctor not assigned"
              )}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Created At</h3>
            <p>
              {report.createdAt
                ? new Date(report.createdAt).toLocaleString()
                : "Date not available"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Updated At</h3>
            <p>
              {report.updatedAt
                ? new Date(report.updatedAt).toLocaleString()
                : "Not updated yet"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GetReportByIdClient;
