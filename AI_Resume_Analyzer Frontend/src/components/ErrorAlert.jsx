const ErrorAlert = ({ message, onRetry }) => {
  const friendlyMessage =
    message ||
    "An unexpected error occurred while contacting the analysis service.";

  return (
    <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-md flex items-start space-x-3">
      <div className="flex items-start space-x-3">
        <span className="text-2xl mt-1">⚠️</span>
        <div>
          <h3 className="text-lg font-semibold">Analysis Failed</h3>
          <p className="mt-1 text-sm">{friendlyMessage}</p>
          <p className="mt-2 text-xs text-red-600">
            *Please check your input data or try again shortly.*
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={!onRetry}
          className="ml-4 px-4 py-2 text-sm font-medium border border-red-400 rounded-md text-red-800 bg-red-100 hover:bg-red-200 transition duration-150 shrink-0"
        >
          🔁 Retry Analysis
        </button>
      )}
    </div>
  );
};

export { ErrorAlert };
