const { buildRoadmapSkeleton } = require("./roadmap.engine");
const { buildRoadmapPrompt } = require("./roadmap.prompt");
const { generateSkillRoadmap } = require("./roadmap.llm");

const generateRoadmap = async ({ missingSkills, role }) => {
  const skeleton = buildRoadmapSkeleton(missingSkills);

  const roadmap = [];

  for (const item of skeleton) {
    const prompt = buildRoadmapPrompt({
      skill: item.skill,
      category: item.category,
      role,
    });

    const llmContent = await generateSkillRoadmap(prompt);

    roadmap.push({
      ...item,
      ...llmContent,
    });
  }

  return roadmap;
};

module.exports = { generateRoadmap };
