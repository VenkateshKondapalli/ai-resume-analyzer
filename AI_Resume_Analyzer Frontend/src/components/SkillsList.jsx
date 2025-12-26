import { CheckCircle, XCircle, Info, Lightbulb } from "lucide-react";

const SkillBadge = ({ skill, type, onClick }) => {
  const isMatched = type === "matched";

  return (
    <button
      onClick={onClick ? () => onClick(skill) : undefined}
      className={`
        group flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-xl transition-all duration-200
        ${
          isMatched
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
            : "bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 hover:shadow-sm"
        }
        ${!isMatched && onClick ? "cursor-help" : "cursor-default"}
      `}
    >
      {isMatched ? (
        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
      ) : (
        <XCircle className="w-3.5 h-3.5 text-rose-500 group-hover:animate-pulse" />
      )}
      {skill}
    </button>
  );
};

const SkillsList = ({ matchedSkills, missingSkills, onSkillClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ===== Matched Skills ===== */}
      <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Matched Skills</h3>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
            {matchedSkills.length} Found
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill) => (
              <SkillBadge key={skill} skill={skill} type="matched" />
            ))
          ) : (
            <div className="w-full py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm italic">
                No direct skill matches found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== Missing Skills ===== */}
      <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <XCircle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Missing Skills</h3>
          </div>
          <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full">
            {missingSkills.length} Required
          </span>
        </div>

        {missingSkills.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-amber-800 leading-tight">
                <strong>Growth Opportunity:</strong> These were found in the JD
                but not your resume.
                {onSkillClick && " Tap one for learning resources."}
              </p>
            </div>

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
          <div className="w-full py-8 text-center bg-emerald-50 rounded-2xl border border-dashed border-emerald-200">
            <p className="text-emerald-600 text-sm font-medium italic">
              Perfect alignment! All skills covered.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export { SkillsList };
