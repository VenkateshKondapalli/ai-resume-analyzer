import React from "react";
import { ATSImprovementSuggestions } from "./ATSImprovementSuggestions";
import {
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  ClipboardCheck,
} from "lucide-react";

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
    <div className="mt-12 overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      {/* Status Banner */}
      <div
        className={`flex items-center justify-between px-6 py-4 ${
          isPass ? "bg-emerald-50" : "bg-rose-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {isPass ? (
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-rose-600" />
          )}
          <h3 className="text-lg font-black text-gray-900 tracking-tight">
            ATS Simulation Analysis
          </h3>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm ${
            isPass
              ? "bg-white text-emerald-700 border border-emerald-100"
              : "bg-white text-rose-700 border border-rose-100"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full animate-pulse ${
              isPass ? "bg-emerald-500" : "bg-rose-500"
            }`}
          ></span>
          {ats_decision}
        </div>
      </div>

      <div className="p-8">
        {/* Decision Reasoning Box */}
        <div className="mb-10 relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>
          <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            <ClipboardCheck className="w-4 h-4" />
            Decision Logic
          </h4>
          <p className="text-gray-700 leading-relaxed text-lg font-medium italic">
            "{ats_reason}"
          </p>
        </div>

        {/* Fail / Improvement Content */}
        {!isPass &&
          (missing_core_skills.length > 0 ||
            missing_secondary_skills.length > 0) && (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Missing Core Skills (Critical) */}
                {missing_core_skills.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                      <span className="font-bold text-gray-900">
                        Critical Gaps
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {missing_core_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-rose-100 text-rose-700 text-xs font-bold rounded-lg shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Secondary Skills (Contextual) */}
                {missing_secondary_skills.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Bookmark className="w-5 h-5 text-indigo-500" />
                      <span className="font-bold text-gray-900">
                        Keyword Gaps
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {missing_secondary_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-indigo-100 text-indigo-700 text-xs font-bold rounded-lg shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ATS Improvement Suggestions Component Wrapper */}
              <div className="pt-6 border-t border-gray-100">
                <ATSImprovementSuggestions
                  missing_core_skills={missing_core_skills}
                  missing_secondary_skills={missing_secondary_skills}
                />
              </div>
            </div>
          )}

        {isPass && (
          <div className="py-10 text-center bg-emerald-50/30 rounded-3xl border border-dashed border-emerald-200">
            <p className="text-emerald-700 font-bold">
              Your resume successfully cleared the ATS simulation!
            </p>
            <p className="text-emerald-600/70 text-sm mt-1">
              Key requirements and industry keywords were found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { ATSResult };
