import React from "react";
import { AlertCircle, RefreshCw, XCircle, Info } from "lucide-react";

const ErrorAlert = ({ message, onRetry }) => {
  const friendlyMessage =
    message ||
    "Our AI engine encountered a temporary roadblock while processing your documents.";

  return (
    <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-4xl border border-rose-100 shadow-xl shadow-rose-100/20 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row">
        {/* Visual Sidebar */}
        <div className="bg-rose-500 w-full md:w-16 flex items-center justify-center py-4 md:py-0">
          <AlertCircle className="w-8 h-8 text-white animate-pulse" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Analysis Interrupted
              </h3>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold uppercase rounded-md">
                Error
              </span>
            </div>

            <p className="text-gray-600 font-medium leading-relaxed max-w-lg">
              {friendlyMessage}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-rose-500 font-bold italic">
              <Info className="w-3.5 h-3.5" />
              Recommendation: Verify your file format or network connection.
            </div>
          </div>

          {/* Action Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="group flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              Retry Analysis
            </button>
          )}
        </div>
      </div>

      {/* Footer Progress (Visual Only) */}
      <div className="h-1 w-full bg-rose-100">
        <div className="h-full bg-rose-500 w-1/3"></div>
      </div>
    </div>
  );
};

export { ErrorAlert };
