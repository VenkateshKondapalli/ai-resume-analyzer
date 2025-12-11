// src/components/ResumeForm.jsx
import { useForm } from "react-hook-form";
import { analyzeResume } from "../api/analyze";

const ResumeForm = ({ setAnalysisResult, setIsLoading, setError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Determine inputs from the submission data (not from watch)
    const hasFile = data.resumeFile && data.resumeFile.length > 0;
    const hasText = data.resumeText && data.resumeText.trim() !== "";

    if (!hasFile && !hasText) {
      alert("Please provide either a Resume File or paste Resume Text.");
      return;
    }

    const payload = {
      jobDescription: data.jobDescription,
      resumeFile: hasFile ? data.resumeFile[0] : null, // File object
      resumeText: hasFile ? null : data.resumeText,
    };

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Debug: show what will be sent
      try {
        const fd = new FormData();
        fd.append("jobDescription", payload.jobDescription ?? "");
        if (payload.resumeFile) fd.append("resume", payload.resumeFile);
        if (payload.resumeText) fd.append("resumeText", payload.resumeText);
        // Print entries for quick debug in console
        // eslint-disable-next-line no-console
        console.log("DEBUG FormData to send:", [...fd.entries()]);
      } catch (dbgErr) {
        // ignore debug errors
        console.log(dbgErr);
      }

      const result = await analyzeResume(payload); // analyzeResume throws on error
      // result expected shape: { success: true, result: {...} }
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg"
    >
      {/* 1. Resume File Upload (OR) */}
      <div>
        <label
          htmlFor="resumeFile"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Resume (PDF/DOCX)
        </label>
        <input
          type="file"
          id="resumeFile"
          accept=".pdf,.docx"
          {...register("resumeFile")}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {errors.resumeFile && (
          <p className="mt-1 text-sm text-red-600">
            {errors.resumeFile.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">OR</p>
      </div>

      {/* 2. Resume Text Area (OR) */}
      <div>
        <label
          htmlFor="resumeText"
          className="block text-sm font-medium text-gray-700"
        >
          Paste Resume Text
        </label>
        <textarea
          id="resumeText"
          rows="6"
          placeholder="Paste the plain text of the resume here..."
          {...register("resumeText")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        ></textarea>
        {errors.resumeText && (
          <p className="mt-1 text-sm text-red-600">
            {errors.resumeText.message}
          </p>
        )}
      </div>

      {/* 3. Job Description (REQUIRED) */}
      <div>
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description (Required)
        </label>
        <textarea
          id="jobDescription"
          rows="8"
          placeholder="Paste the full job description here..."
          {...register("jobDescription", {
            required: "Job Description is required.",
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        ></textarea>
        {errors.jobDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.jobDescription.message}
          </p>
        )}
      </div>

      {/* 4. Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Analyze Resume
        </button>
      </div>
    </form>
  );
};

export { ResumeForm };
