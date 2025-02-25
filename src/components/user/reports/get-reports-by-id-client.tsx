"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Report } from "@/core/interface/reports.interface";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  Clock,
  FileText,
  Download,
  Pill,
} from "lucide-react";
import ReportStatus from "@/components/reports/ReportStatus";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IMedication } from "@/core/interface/medication.interface";

interface ReportDetailProps {
  report: Report | null;
  error?: string;
  allMedication: IMedication[];
}

const GetReportByIdClient = ({
  report,
  error,
  allMedication,
}: ReportDetailProps) => {
  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById("report-content");
    if (!reportElement) return;

    try {
      // Remove any max-width constraints temporarily for PDF generation
      const originalMaxWidth = reportElement.style.maxWidth;
      reportElement.style.maxWidth = "none";

      // Add some padding to ensure content isn't cut off
      const originalPadding = reportElement.style.padding;
      reportElement.style.padding = "20px";

      // Create canvas with proper scale
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Higher quality
        width: reportElement.offsetWidth,
        height: reportElement.offsetHeight,
        useCORS: true,
        logging: false,
        windowWidth: reportElement.scrollWidth,
        windowHeight: reportElement.scrollHeight,
      });

      // Restore original styles
      reportElement.style.maxWidth = originalMaxWidth;
      reportElement.style.padding = originalPadding;

      // Calculate PDF dimensions (A4 aspect ratio)
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Initialize PDF with A4 format
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
      });

      // Add image to PDF with proper scaling
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Download PDF
      pdf.save(`medical-report-${report?.id}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

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

  // Filter medications for this specific report
  const reportMedications = allMedication.filter(
    (med) => med.recordId === report.id
  );

  return (
    <div className="p-6 h-full">
      <Card
        id="report-content"
        className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-3xl mx-auto"
      >
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
                  <span>
                    {report.title
                      ? report.title.length > 30
                        ? report.title.slice(0, 27) + "..."
                        : report.title
                      : "No Title"}
                  </span>{" "}
                  #{report.id}
                </CardTitle>
              </div>
              <ReportStatus status={report.status} />
            </div>
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="flex items-center gap-2 mr-8"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
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

          {/* Medications Section */}
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center">
                <Pill className="h-4 w-4 mr-2" />
                Prescribed Medications
              </h3>

              {reportMedications.length > 0 ? (
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Medication
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dosage
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Frequency
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Duration
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Expires
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportMedications.map((medication) => (
                        <tr key={medication.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {medication.name}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {medication.dosage}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {medication.frequency}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {medication.duration}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {new Date(
                              medication.expirationDate
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic py-2">
                  No medications prescribed for this report.
                </div>
              )}
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
