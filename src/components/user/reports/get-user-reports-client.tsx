"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportSuccessResponse } from "@/core/types/reports.interface";
import Link from "next/link";

const GetUserReportsClient = ({
  reports,
}: {
  reports: ReportSuccessResponse;
}) => {
  const tableHeaders = [
    "ID",
    "Problem",
    "Status",
    "Doctor",
    "Doctor Email",
    "Created At",
    "Action",
  ];

  const renderTableContent = () => {
    if (!reports) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    if (reports.data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No Reports Found
          </TableCell>
        </TableRow>
      );
    }

    return reports.data.map((report) => (
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
    ));
  };

  return (
    <Table>
      <TableHeader className="font-space-grotesk">
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="font-sans">{renderTableContent()}</TableBody>
    </Table>
  );
};

export default GetUserReportsClient;
