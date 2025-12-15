import { MatchScore } from "./MatchScore";
import { SkillsList } from "./SkillsList";
import { Suggestions } from "./Suggestions";

const ResultCard = ({ result }) => {
  const { match_score, matched_skills, missing_skills, suggestions } = result;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
      <div className="flex justify-center border-b pb-6 mb-6">
        <MatchScore score={match_score} />

        <SkillsList
          matchedSkills={matched_skills}
          missingSkills={missing_skills}
        />
        <Suggestions text={suggestions} />
      </div>
    </div>
  );
};

export { ResultCard };
