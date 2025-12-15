import { useForm } from "react-hook-form";
import { analyzeResume } from "../api/analyze";

const ResumeForm = ({
  setAnalysisResult,
  setIsLoading,
  setError,
  clearError,
  isFormDisabled,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchedFile = watch("resumeFile");
  const watchedText = watch("resumeText");

  const onSubmit = async (data) => {
    const hasFile = data.resumeFile && data.resumeFile.length > 0;
    const hasText = data.resumeText && data.resumeText.trim() !== "";

    if (!hasFile && !hasText) {
      alert("Please provide either a Resume File or paste Resume Text.");
      return;
    }

    const payload = {
      jobDescription: data.jobDescription,
      resumeFile: hasFile ? data.resumeFile[0] : null,
      resumeText: hasFile ? null : data.resumeText,
    };

    // ---------- Reset State ----------
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
      console.error("analyze error:", err);
      setError(err); // ⬅️ raw AxiosError forwarded
    } finally {
      setIsLoading(false);
    }
  };

  const isFileSelected = watchedFile && watchedFile.length > 0;
  const isTextPasted = watchedText && watchedText.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6 p-6 bg-white shadow-xl rounded-lg"
    >
      {/* Resume Upload */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label className="block text-sm font-medium text-gray-700">
          Upload Resume
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          {...register("resumeFile")}
          disabled={isFormDisabled}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700"
        />
        <p
          className={`mt-2 text-xs ${
            isFileSelected ? "text-green-600" : "text-gray-500"
          }`}
        >
          {isFileSelected
            ? `File selected: ${watchedFile[0]?.name}`
            : "PDF or DOCX file"}
        </p>
        <p className="mt-2 text-xs text-gray-400">OR</p>
      </div>

      {/* Resume Text */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label className="block text-sm font-medium text-gray-700">
          Paste Resume Text
        </label>
        <textarea
          rows={6}
          {...register("resumeText")}
          disabled={isFormDisabled}
          className="mt-1 block w-full rounded-md border-gray-300 p-3"
        />
        <p
          className={`mt-2 text-xs ${
            isTextPasted ? "text-green-600" : "text-gray-500"
          }`}
        >
          {isTextPasted ? "Text ready" : "Paste text directly from resume"}
        </p>
      </div>

      {/* Job Description */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label className="block text-sm font-medium text-gray-700">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={8}
          {...register("jobDescription", { required: true })}
          disabled={isFormDisabled}
          className="mt-1 block w-full rounded-md border-gray-300 p-3"
        />
        {errors.jobDescription && (
          <p className="text-sm text-red-600">Job Description is required</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isFormDisabled}
        className={`w-full py-3 rounded-md text-white ${
          isFormDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isFormDisabled ? "Analyzing..." : "Analyze Resume"}
      </button>
    </form>
  );
};

export { ResumeForm };
