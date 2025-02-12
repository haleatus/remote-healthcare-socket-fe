import type React from "react";

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-gray-200 text-gray-700";
      case "IN_PROGRESS":
        return "bg-blue-200 text-blue-700";
      case "RESOLVED":
        return "bg-green-200 text-green-700";
      case "PENDING":
        return "bg-yellow-200 text-yellow-700";
      default:
        return "bg-red-200 text-red-700";
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

interface ApplicationStatusProps {
  status: string;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Status status={status} />
    </div>
  );
};

export default ApplicationStatus;
