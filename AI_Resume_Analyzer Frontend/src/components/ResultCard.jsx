import { useState } from "react";
import { MatchScore } from "./MatchScore";
import { SkillsList } from "./SkillsList";
import { Suggestions } from "./Suggestions";
import { fetchSkillKnowledge, generateRoadMap } from "../api/analyze";
import { SkillKnowledgeModal } from "./SkillKnowledgeModal";

const ResultCard = ({ result, showRawOutput, rawOutputData }) => {
  // console.log(result);
  const { match_score, matched_skills, missing_skills, explanation } = result;

  const [roadmap, setRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);
  const handleGenerateRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      setRoadmapError(null);

      const res = await generateRoadMap(missing_skills, "Backend Engineer");
      setRoadmap(res.result.roadmap);
    } catch (err) {
      console.error(err);
      setRoadmapError("Failed to generate roadmap. Try again.");
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

    const res = await fetchSkillKnowledge(skill);
    setSkillKnowledge(res.result.knowledge);
    setLoadingSkill(false);
  };

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
          onSkillClick={handleSkillClick}
        />
      </div>

      <SkillKnowledgeModal
        skill={selectedSkill}
        knowledge={skillKnowledge}
        loading={loadingSkill}
        onClose={() => setSelectedSkill(null)}
      />

      {/* Suggestions */}
      <div>
        <Suggestions text={explanation} />
      </div>

      {missing_skills?.length > 0 && (
        <div className="pt-6 border-t space-y-4">
          <button
            onClick={handleGenerateRoadmap}
            disabled={!!loadingRoadmap}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingRoadmap
              ? "Generating Learning Roadmap..."
              : "Generate Learning Roadmap"}
          </button>

          {roadmapError && (
            <p className="text-sm text-red-600">{roadmapError}</p>
          )}

          {roadmap && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">📚 Learning Roadmap</h3>

              {roadmap.map((item) => (
                <div
                  key={item.skill}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <h4 className="font-semibold text-md">{item.skill}</h4>

                  <p className="text-sm text-gray-600 mt-1">
                    ⏱ {item.estimated_effort}
                  </p>

                  <div className="mt-3">
                    <h5 className="font-medium">What to learn</h5>
                    <ul className="list-disc list-inside text-sm">
                      {item.what_to_learn.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-medium">Project ideas</h5>
                    <ul className="list-disc list-inside text-sm">
                      {item.project_ideas.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
