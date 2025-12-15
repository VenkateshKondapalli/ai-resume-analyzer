import { MatchScore } from "./MatchScore";
import { SkillsList } from "./SkillsList";
import { Suggestions } from "./Suggestions";

const ResultCard = ({ result }) => {
  const { match_score, matched_skills, missing_skills, suggestions } = result;

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
        <Suggestions text={suggestions} />
      </div>
    </div>
  );
};

export { ResultCard };
