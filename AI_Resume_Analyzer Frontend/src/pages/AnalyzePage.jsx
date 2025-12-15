import { useState } from "react";
import { ResumeForm } from "../components/ResumeForm";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ErrorAlert } from "../components/ErrorAlert";
import { ResultCard } from "../components/ResultCard";

const AnalyzePage = () => {
  const getFriendlyErrorMessage = (err) => {
    const status = err?.response?.status;

    if (status === 400) {
      return "Please check your resume or job description and try again.";
    }

    if (status === 502) {
      return "AI failed to generate a valid response. Please try again.";
    }

    if (status === 503) {
      return "AI is currently overloaded. Please wait a few seconds and retry.";
    }

    return "Something went wrong. Please try again later.";
  };

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showRawOutput, setShowRawOutput] = useState(false);

  const handleError = (err) => {
    console.error("Analyze error:", err);
    const message = getFriendlyErrorMessage(err);
    setError(message);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }
    if (error) {
      return <ErrorAlert message={error} />;
    }
    if (analysisResult) {
      return (
        <ResultCard
          result={analysisResult}
          showRawOutput={showRawOutput}
          rawOutputData={analysisResult}
        />
      );
    }
    return (
      <p className="text-center text-gray-500 mt-8">
        Enter a resume and job description above to begin the analysis.
      </p>
    );
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Resume Analyzer
      </h1>
      <div>
        <ResumeForm
          setAnalysisResult={setAnalysisResult}
          setIsLoading={setIsLoading}
          setError={handleError}
          isFormDisabled={isLoading}
        />
      </div>

      {analysisResult && (
        <div className="flex justify-center mt-6">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showRawOutput}
              onChange={() => setShowRawOutput(!showRawOutput)}
              className="form-checkbox h-4 w-4 text-indigo-600 rounded"
            />
            <span>Show Debug Raw Output (JSON)</span>
          </label>
        </div>
      )}

      <div className="mt-10 px-4">{renderContent()}</div>
    </div>
  );
};

export { AnalyzePage };
