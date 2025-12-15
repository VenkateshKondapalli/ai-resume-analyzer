const ErrorAlert = ({ message }) => {
  const friendlyMessage =
    message ||
    "An unexpected error occurred while contacting the analysis service.";

  return (
    <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-md flex items-start space-x-3">
      <span className="text-2xl mt-1">⚠️</span>
      <div>
        <h3 className="text-lg font-semibold">Analysis Failed</h3>
        <p className="mt-1 text-sm">{friendlyMessage}</p>
        <p className="mt-2 text-xs text-red-600">
          *Please check your input data or try again shortly.*
        </p>
      </div>
    </div>
  );
};

export { ErrorAlert };
