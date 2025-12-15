import { useForm } from "react-hook-form";
import { analyzeResume } from "../api/analyze";

const ResumeForm = ({
  setAnalysisResult,
  setIsLoading,
  setError,
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

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      try {
        const fd = new FormData();
        fd.append("jobDescription", payload.jobDescription ?? "");
        if (payload.resumeFile) fd.append("resume", payload.resumeFile);
        if (payload.resumeText) fd.append("resumeText", payload.resumeText);
        console.log("DEBUG FormData to send:", [...fd.entries()]);
      } catch (dbgErr) {
        console.log(dbgErr);
      }

      const result = await analyzeResume(payload);
      if (result && result.success && result.result) {
        setAnalysisResult(result.result);
      } else {
        console.warn("Unexpected API response:", result);
        setError("Unexpected server response. Check console for details.");
      }
    } catch (err) {
      console.error(
        "analyze error:",
        err?.response?.data || err.message || err
      );
      const serverMsg =
        err?.response?.data?.error || err?.response?.data || err?.message;
      setError(
        typeof serverMsg === "string"
          ? serverMsg
          : "Analysis failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const isFileSelected = watchedFile && watchedFile.length > 0;
  const isTextPasted = watchedText && watchedText.trim() !== "";
  const fileHelperText = isFileSelected
    ? `File selected: ${watchedFile[0]?.name}`
    : "PDF or DOCX file (Max 2MB)";
  const textHelperText = isTextPasted
    ? `Text ready (${watchedText.length} chars)`
    : "Paste text directly from the resume";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6 p-6 bg-white shadow-xl rounded-lg"
    >
      {/* Resume Upload */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label
          htmlFor="resumeFile"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Resume
        </label>

        <input
          type="file"
          id="resumeFile"
          accept=".pdf,.docx"
          {...register("resumeFile")}
          disabled={isFormDisabled}
          className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
        file:text-sm file:font-semibold file:bg-indigo-50
        file:text-indigo-700 hover:file:bg-indigo-100"
        />

        <p
          className={`mt-2 text-xs ${
            isFileSelected ? "text-green-600" : "text-gray-500"
          }`}
        >
          {fileHelperText}
        </p>

        {errors.resumeFile && (
          <p className="mt-1 text-sm text-red-600">
            {errors.resumeFile.message}
          </p>
        )}

        <p className="mt-2 text-xs text-gray-400">OR</p>
      </div>

      {/* Resume Text */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label
          htmlFor="resumeText"
          className="block text-sm font-medium text-gray-700"
        >
          Paste Resume Text
        </label>

        <textarea
          id="resumeText"
          rows={6}
          placeholder="Paste the plain text of the resume here..."
          {...register("resumeText")}
          disabled={isFormDisabled}
          className="mt-1 block w-full rounded-md border-gray-300
        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />

        <p
          className={`mt-2 text-xs ${
            isTextPasted ? "text-green-600" : "text-gray-500"
          }`}
        >
          {textHelperText}
        </p>

        {errors.resumeText && (
          <p className="mt-1 text-sm text-red-600">
            {errors.resumeText.message}
          </p>
        )}
      </div>

      {/* Job Description */}
      <div className={isFormDisabled ? "opacity-60 pointer-events-none" : ""}>
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description <span className="text-red-500">*</span>
        </label>

        <textarea
          id="jobDescription"
          rows={8}
          placeholder="Paste the full job description here..."
          {...register("jobDescription", {
            required: "Job Description is required.",
          })}
          disabled={isFormDisabled}
          className="mt-1 block w-full rounded-md border-gray-300
        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />

        {errors.jobDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.jobDescription.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isFormDisabled}
          className={`w-full py-3 px-4 rounded-md shadow-sm text-base
        font-medium text-white transition
        ${
          isFormDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }`}
        >
          {isFormDisabled ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </form>
  );
};

export { ResumeForm };
