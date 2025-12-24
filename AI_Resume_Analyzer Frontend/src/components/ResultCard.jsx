import { useState } from "react";
import { MatchScore } from "./MatchScore";
import { SkillsList } from "./SkillsList";
import { Suggestions } from "./Suggestions";
import { fetchSkillKnowledge, generateRoadMap } from "../api/analyze";
import { SkillKnowledgeModal } from "./SkillKnowledgeModal";
import { ATSResult } from "./ATSResult";
// Added RefreshCw to the imports below
import {
  BookOpen,
  GraduationCap,
  Clock,
  Lightbulb,
  Terminal,
  Wand2,
  RefreshCw,
} from "lucide-react";

const ResultCard = ({ result, showRawOutput, rawOutputData }) => {
  const { match_score, matched_skills, missing_skills, explanation } = result;

  const [roadmap, setRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);

  const handleGenerateRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      setRoadmapError(null);
      const res = await generateRoadMap(missing_skills, "Backend Engineer");
      // Use optional chaining to be safe
      if (res?.result?.roadmap) {
        setRoadmap(res.result.roadmap);
      } else {
        setRoadmapError("Roadmap data was empty.");
      }
    } catch (err) {
      console.error(err);
      setRoadmapError("Connection failed. Is the backend running?");
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillKnowledge, setSkillKnowledge] = useState("");
  const [loadingSkill, setLoadingSkill] = useState(false);

  const handleSkillClick = async (skill) => {
    setSelectedSkill(skill);
    setLoadingSkill(true);
    try {
      const res = await fetchSkillKnowledge(skill);
      // FIXED: Added optional chaining to prevent 'reading knowledge of undefined'
      setSkillKnowledge(
        res?.result?.knowledge || "No specific knowledge found for this skill."
      );
    } catch (err) {
      setSkillKnowledge("Knowledge retrieval failed. Check your connection.");
      console.log(err);
    } finally {
      setLoadingSkill(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* 1. Executive Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-1">
          <MatchScore score={match_score} />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <Suggestions text={explanation} />
        </div>
      </div>

      {/* 2. Skills Deep Dive */}
      <div className="bg-white rounded-4xl p-1 shadow-sm border border-gray-100">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Skill Gap Analysis
            </h2>
          </div>
          <SkillsList
            matchedSkills={matched_skills}
            missingSkills={missing_skills}
            onSkillClick={handleSkillClick}
          />
        </div>
      </div>

      <SkillKnowledgeModal
        skill={selectedSkill}
        knowledge={skillKnowledge}
        loading={loadingSkill}
        onClose={() => setSelectedSkill(null)}
      />

      {/* 3. ATS Integrity Check */}
      {result?.ats_simulation && <ATSResult ats={result.ats_simulation} />}

      {/* 4. AI Learning Roadmap Section */}
      {missing_skills?.length > 0 && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
          <div className="relative bg-white rounded-4xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs">
                    <GraduationCap className="w-4 h-4" />
                    Growth Engine
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">
                    Personalized Roadmap
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    Our AI creates a targeted study plan to bridge your specific
                    skill gaps for Backend roles.
                  </p>
                </div>

                {!roadmap && (
                  <button
                    onClick={handleGenerateRoadmap}
                    disabled={loadingRoadmap}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70"
                  >
                    {loadingRoadmap ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Wand2 className="w-5 h-5" />
                    )}
                    {loadingRoadmap
                      ? "Calculating Path..."
                      : "Generate Roadmap"}
                  </button>
                )}
              </div>

              {roadmapError && (
                <p className="text-rose-600 font-medium mb-4">{roadmapError}</p>
              )}

              {roadmap && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                  {roadmap.map((item) => (
                    <div
                      key={item.skill}
                      className="group bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-gray-900">
                          {item.skill}
                        </h4>
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          {item.estimated_effort}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">
                            Core Topics
                          </p>
                          <ul className="space-y-1.5">
                            {item.what_to_learn.map((w, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-700 flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-gray-200/60">
                          <p className="text-xs font-bold text-amber-500 uppercase mb-2 tracking-widest flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            Build This
                          </p>
                          <ul className="space-y-1.5">
                            {item.project_ideas.map((p, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-600 italic"
                              >
                                "{p}"
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Debug Console */}
      {showRawOutput && rawOutputData && (
        <div className="mt-12 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-800/50 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300 font-bold tracking-widest uppercase">
                System Raw_Data
              </span>
            </div>
          </div>
          <pre className="p-6 text-[10px] font-mono leading-relaxed text-emerald-400/80 overflow-auto max-h-[500px] scrollbar-hide">
            {JSON.stringify(rawOutputData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export { ResultCard };
