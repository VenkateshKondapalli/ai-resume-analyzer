import { generateATSSuggestions } from "../utils/atsSuggestions";

const ATSImprovementSuggestions = ({
  missing_core_skills = [],
  missing_secondary_skills = [],
}) => {
  const allMissingSkills = [
    ...missing_core_skills,
    ...missing_secondary_skills,
  ];

  const suggestions = generateATSSuggestions(allMissingSkills);

  if (!suggestions.length) return null;

  return (
    <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="text-md font-semibold text-blue-800 mb-3">
        🔧 ATS Optimization Suggestions
      </h4>

      <ul className="list-disc list-inside space-y-2 text-sm text-blue-900">
        {suggestions.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export { ATSImprovementSuggestions };
