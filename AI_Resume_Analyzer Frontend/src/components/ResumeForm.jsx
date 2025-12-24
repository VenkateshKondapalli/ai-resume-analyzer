import { useForm } from "react-hook-form";
import { analyzeResume } from "../api/analyze";
import { useCallback, useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ResumeForm = ({
  setAnalysisResult,
  setIsLoading,
  setError,
  clearError,
  isFormDisabled,
  onDataReady,
}) => {
  const [activeTab, setActiveTab] = useState("file"); // 'file' or 'text'

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resumeFile: null,
      resumeText: "",
      jobDescription: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      const hasFile = data.resumeFile && data.resumeFile.length > 0;
      const hasText = data.resumeText && data.resumeText.trim() !== "";

      if (activeTab === "file" && !hasFile) {
        alert("Please upload a resume file.");
        return;
      }
      if (activeTab === "text" && !hasText) {
        alert("Please paste your resume text.");
        return;
      }

      const payload = {
        jobDescription: data.jobDescription,
        resumeFile: activeTab === "file" ? data.resumeFile[0] : null,
        resumeText: activeTab === "text" ? data.resumeText : null,
      };

      setIsLoading(true);
      clearError();
      setAnalysisResult(null);

      try {
        const result = await analyzeResume(payload);
        if (result?.success && result?.result) {
          setAnalysisResult(result.result);
          clearError();
        } else {
          throw new Error("Unexpected API response");
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, clearError, setAnalysisResult, setError, activeTab]
  );

  useEffect(() => {
    if (onDataReady) {
      onDataReady({
        triggerSubmit: () => handleSubmit(onSubmit)(),
        getFormData: getValues,
      });
    }
  }, [onDataReady, handleSubmit, getValues, onSubmit]);

  const watchedFile = watch("resumeFile");
  const isFileSelected = watchedFile && watchedFile.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Resume Input */}
        <div
          className={`space-y-4 ${
            isFormDisabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">Your Resume</h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("file")}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "file"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("text")}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "text"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Paste Text
            </button>
          </div>

          {activeTab === "file" ? (
            <div className="relative group">
              <input
                type="file"
                accept=".pdf,.docx"
                {...register("resumeFile")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center ${
                  isFileSelected
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 group-hover:border-indigo-400 group-hover:bg-indigo-50/30"
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    isFileSelected ? "bg-green-100" : "bg-indigo-50"
                  }`}
                >
                  {isFileSelected ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <Upload className="w-8 h-8 text-indigo-600" />
                  )}
                </div>
                <p className="text-sm font-bold text-gray-700">
                  {isFileSelected
                    ? watchedFile[0].name
                    : "Drop your resume here"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF or DOCX (Max 5MB)
                </p>
              </div>
            </div>
          ) : (
            <textarea
              placeholder="Paste the plain text content of your resume here..."
              rows={10}
              {...register("resumeText")}
              className="w-full rounded-2xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm p-4 bg-gray-50 transition-all"
            />
          )}
        </div>

        {/* Right Side: Job Description */}
        <div
          className={`space-y-4 ${
            isFormDisabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">Job Description</h2>
          </div>

          <textarea
            placeholder="Paste the job requirements, responsibilities, and qualifications..."
            rows={10}
            {...register("jobDescription", { required: true })}
            className={`w-full rounded-2xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm p-4 bg-gray-50 transition-all ${
              errors.jobDescription ? "border-red-300 ring-1 ring-red-100" : ""
            }`}
          />
          {errors.jobDescription && (
            <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              This field is required for the AI to analyze context.
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          disabled={isFormDisabled}
          className={`px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all duration-300 transform ${
            isFormDisabled
              ? "bg-gray-400 cursor-not-allowed scale-95"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95"
          }`}
        >
          {isFormDisabled ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              AI is Processing...
            </span>
          ) : (
            "Analyze Match Score"
          )}
        </button>
      </div>
    </form>
  );
};

export { ResumeForm };
