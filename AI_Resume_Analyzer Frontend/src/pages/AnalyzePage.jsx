import { useRef, useState } from "react";
import { ResumeForm } from "../components/ResumeForm";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ErrorAlert } from "../components/ErrorAlert";
import { ResultCard } from "../components/ResultCard";
import {
  Terminal,
  LayoutDashboard,
  Database,
  RefreshCw,
  Sparkles,
  Upload,
} from "lucide-react";

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
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <LoadingIndicator />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-bold text-lg animate-pulse">
              Gemini AI is analyzing your resume...
            </p>
            <p className="text-indigo-300 text-sm">
              Extracting skills, calculating matches, simulating ATS
            </p>
          </div>
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
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-xl opacity-40"></div>
            <div className="relative p-5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-indigo-400/30">
              <Upload className="w-10 h-10 text-indigo-300" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-2">
            Ready to Analyze
          </h3>
          <p className="text-gray-400 max-w-md text-center leading-relaxed">
            Upload your resume and job description above to get instant
            AI-powered insights, match scores, and skill gap analysis.
          </p>

          <div className="flex items-center gap-2 mt-6 text-sm text-indigo-300">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pb-20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header Section - Enhanced */}
      <div className="relative bg-gradient-to-r from-slate-900/50 via-indigo-900/50 to-slate-900/50 backdrop-blur-xl border-b border-white/10 mb-10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-400/30 backdrop-blur-sm">
                <LayoutDashboard className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                AI Analysis{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Hub
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-base font-medium ml-14">
              Compare your profile against industry standards with AI precision
            </p>
          </div>

          {analysisResult && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRawOutput(!showRawOutput)}
                className={`group flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  showRawOutput
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                    : "bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105 backdrop-blur-sm"
                }`}
              >
                {showRawOutput ? (
                  <Database className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                ) : (
                  <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                )}
                {showRawOutput ? "Hide JSON" : "Debug Mode"}
              </button>

              <button
                onClick={() => window.location.reload()}
                className="group p-3 text-gray-400 hover:text-indigo-400 transition-all bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-indigo-400/30 backdrop-blur-sm"
                title="Reset Analysis"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Form Section - Enhanced Card Style */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 mb-8 hover:border-white/30 transition-all duration-300">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg">
              <Upload className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upload Documents</h2>
              <p className="text-sm text-gray-400">
                Resume and job description required
              </p>
            </div>
          </div>

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

      {/* Floating Help Button (Optional Enhancement) */}
      <button className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-transform duration-300 group">
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export { AnalyzePage };
