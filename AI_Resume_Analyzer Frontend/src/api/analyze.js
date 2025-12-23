import { axiosInstance } from "../axios/axiosInstance";

const analyzeResume = async (data) => {
  // If no file, send simple JSON (this matches your working Postman request)
  if (!data.resumeFile) {
    try {
      const resp = await axiosInstance.post("/analyze", {
        resumeText: data.resumeText ?? "",
        jobDescription: data.jobDescription ?? "",
      });
      return resp.data;
    } catch (err) {
      console.error(
        "API call failed (JSON branch):",
        err?.response?.data || err.message
      );
      throw err;
    }
  }

  // Otherwise send FormData (file upload)
  const formData = new FormData();
  formData.append("jobDescription", data.jobDescription ?? "");
  if (data.resumeFile) formData.append("resume", data.resumeFile);
  if (data.resumeText) formData.append("resumeText", data.resumeText);

  try {
    // debug log
    console.log("FORMDATA:", [...formData.entries()]);
    const response = await axiosInstance.post("/analyze", formData);
    return response.data;
  } catch (err) {
    console.error(
      "API call failed (FormData branch):",
      err?.response?.data || err.message
    );
    throw err;
  }
};

const generateRoadMap = async (missing_skills, role) => {
  const resp = await axiosInstance.post("/analyze/roadmap", {
    missing_skills: missing_skills,
    role: role,
  });
  return resp.data;
};

const fetchSkillKnowledge = async (skill) => {
  const resp = await axiosInstance.post("/analyze/skill-knowledge", {
    skill: skill,
  });
  return resp.data;
};

export { analyzeResume, generateRoadMap, fetchSkillKnowledge };
