import { useState } from "react";
import { ResumeForm } from "../components/ResumeForm";

const AnalyzePage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Resume Analyzer
      </h1>

      <div className="px-4">
        {/* Pass state setters to the form component */}
        <ResumeForm
          setAnalysisResult={setAnalysisResult}
          setIsLoading={setIsLoading}
          setError={setError}
        />
      </div>

      {/* Status Display Area */}
      <div className="mt-10 max-w-4xl mx-auto px-4">
        {isLoading && (
          <div className="text-center text-indigo-600 text-lg">
            {/* Placeholder for actual spinner (Task 12) */}
            Analyzing resume... Please wait.
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {/* For now, display the raw JSON result in the console (Task 9 Checkpoint) */}
        {analysisResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Analysis Checkpoint Result:
            </h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
            <p className="mt-2 text-green-600">
              Successfully received structured JSON from the backend!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { AnalyzePage };
