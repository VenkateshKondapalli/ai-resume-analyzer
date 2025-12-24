import { useRef, useState } from "react";
import { ResumeForm } from "../components/ResumeForm";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ErrorAlert } from "../components/ErrorAlert";
import { ResultCard } from "../components/ResultCard";
import { Terminal, LayoutDashboard, Database, RefreshCw } from "lucide-react";

const AnalyzePage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRawOutput, setShowRawOutput] = useState(false);

  const formSubmitRef = useRef(null);

  const getFriendlyErrorMessage = (err) => {
    const status = err?.response?.status;
    if (status === 400) return "Check your resume or job description format.";
    if (status === 502) return "The AI drifted off. Please try again.";
    if (status === 503) return "Server is busy. Try again in a few seconds.";
    return "Something went wrong. Please try again later.";
  };

  const handleError = (err) => {
    setErrorMessage(getFriendlyErrorMessage(err));
  };

  const handleRetry = () => {
    if (formSubmitRef.current?.triggerSubmit) {
      formSubmitRef.current.triggerSubmit();
    }
  };

  const handleFormReady = (handlers) => {
    formSubmitRef.current = handlers;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <LoadingIndicator />
          <p className="text-indigo-600 font-medium animate-pulse">
            Gemini AI is dissecting your resume...
          </p>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="max-w-2xl mx-auto transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <ErrorAlert message={errorMessage} onRetry={handleRetry} />
        </div>
      );
    }

    if (analysisResult) {
      return (
        <div className="transition-all duration-700 animate-in fade-in zoom-in-95">
          <ResultCard
            result={analysisResult}
            showRawOutput={showRawOutput}
            rawOutputData={analysisResult}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
        <div className="p-4 bg-indigo-50 rounded-full mb-4">
          <LayoutDashboard className="w-8 h-8 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No Analysis Yet</h3>
        <p className="text-gray-500 max-w-xs text-center">
          Upload your documents above to see your match score and skill gaps.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 mb-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              AI Analysis <span className="text-indigo-600">Hub</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Compare your profile against industry standards
            </p>
          </div>

          {analysisResult && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRawOutput(!showRawOutput)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  showRawOutput
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {showRawOutput ? (
                  <Database className="w-4 h-4" />
                ) : (
                  <Terminal className="w-4 h-4" />
                )}
                {showRawOutput ? "Hide JSON" : "Debug Mode"}
              </button>

              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                title="Reset Analysis"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Form Section - Encapsulated in a card style */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 md:p-6 mb-8">
          <ResumeForm
            setAnalysisResult={setAnalysisResult}
            setIsLoading={setIsLoading}
            setError={handleError}
            clearError={() => setErrorMessage(null)}
            isFormDisabled={isLoading}
            onDataReady={handleFormReady}
          />
        </div>

        {/* Dynamic Content Area */}
        <div className="relative">{renderContent()}</div>
      </div>
    </div>
  );
};

export { AnalyzePage };
