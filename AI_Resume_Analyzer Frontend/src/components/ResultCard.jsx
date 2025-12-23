import { MatchScore } from "./MatchScore";
import { SkillsList } from "./SkillsList";
import { Suggestions } from "./Suggestions";

const ResultCard = ({ result, showRawOutput, rawOutputData }) => {
  console.log(result);
  const { match_score, matched_skills, missing_skills, explanation } = result;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100 space-y-10">
      {/* Match Score */}
      <div className="flex justify-center border-b pb-6">
        <MatchScore score={match_score} />
      </div>

      {/* Skills Comparison */}
      <div>
        <SkillsList
          matchedSkills={matched_skills}
          missingSkills={missing_skills}
        />
      </div>

      {/* Suggestions */}
      <div>
        <Suggestions text={explanation} />
      </div>

      {showRawOutput && rawOutputData && (
        <details className="mt-8 bg-gray-50 border border-gray-300 rounded-lg p-4">
          <summary className="cursor-pointer text-sm font-semibold text-gray-700">
            🔍 Debug Raw Output (JSON)
          </summary>

          <pre className="mt-4 max-h-96 overflow-auto text-xs bg-black text-green-300 p-4 rounded-md">
            {JSON.stringify(rawOutputData, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export { ResultCard };
