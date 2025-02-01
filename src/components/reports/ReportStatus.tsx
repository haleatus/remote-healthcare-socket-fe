import type React from "react";

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-gray-100 text-gray-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full font-sans ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </div>
  );
};

interface ReportStatusProps {
  status: string;
}

const ReportStatus: React.FC<ReportStatusProps> = ({ status }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Status status={status} />
    </div>
  );
};

export default ReportStatus;
