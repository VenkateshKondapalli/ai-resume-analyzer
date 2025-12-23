const SkillBadge = ({ skill, type, onClick }) => {
  const isMatched = type === "matched";
  const bgColor = isMatched
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  const cursorStyle =
    !isMatched && onClick ? "cursor-pointer hover:shadow-md" : "";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${bgColor} ${cursorStyle} m-1`}
      onClick={!isMatched && onClick ? () => onClick(skill) : undefined}
    >
      {skill}
    </span>
  );
};

const SkillsList = ({ matchedSkills, missingSkills, onSkillClick }) => {
  return (
    <div className="space-y-8">
      {/* ===== Matched Skills ===== */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          Matched Skills ({matchedSkills.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill) => (
              <SkillBadge key={skill} skill={skill} type="matched" />
            ))
          ) : (
            <p className="text-gray-500">
              No core skills were directly matched.
            </p>
          )}
        </div>
      </section>

      {/* ===== Missing Skills ===== */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          Missing Skills ({missingSkills.length})
        </h3>

        {/* Explanation */}
        {missingSkills.length > 0 ? (
          <div>
            <p className="text-sm text-gray-600 mb-4 p-3 rounded-md border-l-4 border-red-300 bg-red-50">
              These skills were{" "}
              <span className="font-semibold">explicitly expected</span> in the
              job description but were not found in your resume.{" "}
              <span className="font-semibold text-red-600">
                {onSkillClick && "Click on a skill to learn more."}
              </span>
            </p>

            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  type="missing"
                  onClick={onSkillClick}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">
            All required skills were covered.
          </p>
        )}
      </section>
    </div>
  );
};

export { SkillsList };
