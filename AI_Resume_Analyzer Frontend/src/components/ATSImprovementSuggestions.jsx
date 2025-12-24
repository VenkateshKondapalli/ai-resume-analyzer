import { generateATSSuggestions } from "../utils/atsSuggestions";
import { Wrench, CheckCircle2, Info, ChevronRight } from "lucide-react";

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
    <div className="mt-8 bg-slate-900 rounded-4xl p-6 sm:p-8 text-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Wrench className="w-24 h-24 rotate-12" />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-5">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
            <Wrench className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.15em] text-white">
              ATS Technical Optimization
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              System-detected resume parsing improvements
            </p>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all group"
            >
              <div className="mt-1">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm leading-relaxed text-slate-300 font-medium">
                {tip}
              </span>
            </div>
          ))}
        </div>

        {/* Footer info badge */}
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/30 w-fit">
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
            Based on standard Boolean & Keyword parsing logic
          </p>
        </div>
      </div>
    </div>
  );
};

export { ATSImprovementSuggestions };
