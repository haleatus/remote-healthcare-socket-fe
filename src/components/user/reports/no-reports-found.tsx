import { Search } from "lucide-react";
import React from "react";

const NoReportsFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 font-sans">
      <div className="relative w-full max-w-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Main content */}
        <div className="relative bg-white rounded-lg shadow-lg p-8 text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Reports Found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn&apos;t find any reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoReportsFound;
