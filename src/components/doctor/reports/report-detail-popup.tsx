import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Pill } from "lucide-react";
import ReportStatus from "@/components/reports/ReportStatus";
import UpdateReportForPatientApplicationClient from "./update-report-for-patient-application.client";
import DeleteReportButton from "./delete-report-button";
import type { Report } from "@/core/interface/reports.interface";
import { IMedication } from "@/core/interface/medication.interface";

interface ReportDetailPopupProps {
  report: Report;
  onClose: () => void;
  accessToken: string;
  onDelete: (reportId: number) => Promise<void>;
  allMedication: IMedication[];
}

const ReportDetailPopup: React.FC<ReportDetailPopupProps> = ({
  report,
  onClose,
  accessToken,
  onDelete,
  allMedication,
}) => {
  // Filter medications that match this report's id
  const reportMedications = allMedication.filter(
    (med) => med.recordId === report.id
  );

  return (
    <Dialog open={!!report} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl font-sans h-[calc(100vh-100px)] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex w-full items-center">
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="text-xl font-semibold">
                  <span>{report.title ?? "No Title"}</span> #{report.id}
                </h2>
                <p className="text-sm text-gray-500">
                  Generated on: {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center pr-8">
                <ReportStatus status={report.status} />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 h-full overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Patient Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{report.user.name}</p>
                <p className="text-sm text-gray-600">{report.user.email}</p>
                {/* Add more patient details here */}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Doctor Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{report.doc.name}</p>
                <p className="text-sm text-gray-600">{report.doc.email}</p>
                {/* Add more doctor details here */}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Assessment</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Problem
                </h4>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-800">{report.problem}</p>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Diagnosis & Treatment
                </h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-800">{report.solution}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medications Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Pill className="mr-2 size-5" />
              Prescribed Medications
            </h3>
            {reportMedications.length > 0 ? (
              <div className="bg-blue-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-blue-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Dosage
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                        Expiration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-50 divide-y divide-blue-200">
                    {reportMedications.map((med) => (
                      <tr key={med.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-800">
                            {med.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {med.dosage}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {med.frequency}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {med.duration}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {new Date(med.expirationDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg text-center text-gray-600">
                No medications prescribed for this report
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="size-4 mr-2" />
              <span>
                Last updated: {new Date(report.updatedAt).toLocaleString()}
              </span>
            </div>

            <div className="flex gap-2">
              <UpdateReportForPatientApplicationClient
                accessToken={accessToken}
                reportId={report.id}
                initialTitle={report.title}
                initialProblem={report.problem}
                initialSolution={report.solution}
                initialStatus={report.status}
                onClose={onClose}
              />
              <DeleteReportButton reportId={report.id} onDelete={onDelete} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailPopup;
