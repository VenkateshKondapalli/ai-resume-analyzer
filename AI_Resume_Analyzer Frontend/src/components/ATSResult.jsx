import { ATSImprovementSuggestions } from "./ATSImprovementSuggestions";

const ATSResult = ({ ats }) => {
  if (!ats) return null;

  const {
    ats_decision,
    ats_reason,
    missing_core_skills = [],
    missing_secondary_skills = [],
  } = ats;

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

      {/* Fail / Improvement Section */}
      {!isPass &&
        (missing_core_skills.length > 0 ||
          missing_secondary_skills.length > 0) && (
          <div className="space-y-6">
            {/* Missing Core Skills */}
            {missing_core_skills.length > 0 && (
              <div>
                <p className="font-medium text-gray-800 mb-2">
                  Missing Core Skills (ATS Critical):
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {missing_core_skills.map((skill, index) => (
                    <li key={`${skill}-${index}`}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Secondary Skills */}
            {missing_secondary_skills.length > 0 && (
              <div>
                <p className="font-medium text-gray-800 mb-2">
                  Missing ATS Keywords (Important):
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {missing_secondary_skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ATS Improvement Suggestions */}
            <ATSImprovementSuggestions
              missing_core_skills={missing_core_skills}
              missing_secondary_skills={missing_secondary_skills}
            />
          </div>
        )}
    </div>
  );
};

export { ATSResult };
