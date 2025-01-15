"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Report } from "@/core/types/reports.interface";
import Link from "next/link";

interface ReportListProps {
  reports: Report[];
}

const GetUserReportsClient = ({ reports }: ReportListProps) => {
  // Handle null reports
  if (!reports) {
    return <p>Error loading reports.</p>;
  }

  // Handle empty reports array
  if (reports.length === 0) {
    return <p>No reports available.</p>;
  }

  // Ensure reports is actually an array
  const reportsArray = Array.isArray(reports) ? reports : [reports];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Problem</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Doctor Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportsArray.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.id}</TableCell>
            <TableCell>{report.problem}</TableCell>
            <TableCell>{report.status}</TableCell>
            <TableCell>{report.doc.name}</TableCell>
            <TableCell>{report.doc.email}</TableCell>
            <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Link
                href={`/reports/${report.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GetUserReportsClient;
