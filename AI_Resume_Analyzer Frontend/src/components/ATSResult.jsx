const ATSResult = ({ ats }) => {
  if (!ats) return null;

  const { ats_decision, ats_reason, missing_core_skills = [] } = ats;

  const isPass = ats_decision === "PASS";

  return (
    <div className="mt-10 p-6 rounded-xl border shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          ATS Simulation Result
        </h3>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            isPass ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {ats_decision}
        </span>
      </div>

      {/* Reason */}
      <p className="text-gray-700 mb-4">
        <strong>Reason:</strong> {ats_reason}
      </p>

      {/* Missing Core Skills */}
      {!isPass && missing_core_skills.length > 0 && (
        <div className="mb-4">
          <p className="font-medium text-gray-800 mb-2">
            Missing Core Skills (ATS Critical):
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {missing_core_skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {!isPass && (
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            💡 <strong>Tip:</strong> Add hands-on project experience or resume
            bullet points mentioning the missing core skills to improve ATS
            ranking.
          </p>
        </div>
      )}
    </div>
  );
};

export { ATSResult };
