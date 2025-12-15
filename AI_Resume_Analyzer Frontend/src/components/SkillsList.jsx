const SkillBadge = ({ skill, type }) => {
  const isMatched = type === "matched";
  const bgColor = isMatched
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${bgColor} m-1`}
    >
      {skill}
    </span>
  );
};

const SkillsList = ({ matchedSkills, missingSkills }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          Matched Skills ({matchedSkills.length})
        </h3>
        <div className="flex flex-wrap">
          {matchedSkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} type="matched" />
          ))}
          {matchedSkills.length === 0 && (
            <p className="text-gray-500">
              No core skills were directly matched.
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          Missing Skills ({missingSkills.length})
        </h3>
        <div className="flex flex-wrap">
          {missingSkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} type="missing" />
          ))}
          {missingSkills.length === 0 && (
            <p className="text-gray-500">All required skills were covered.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { SkillsList };
