const generateATSSuggestions = (missing_core_skills = []) => {
  if (!Array.isArray(missing_core_skills) || missing_core_skills.length === 0) {
    return [];
  }

  return missing_core_skills.map((skill) => {
    switch (skill.toLowerCase()) {
      case "docker":
        return "Add a resume bullet describing how you containerized backend services using Docker.";
      case "aws":
        return "Mention hands-on experience deploying applications on AWS (EC2, S3, IAM, or Lambda).";
      case "node.js":
        return "Include backend project experience using Node.js with real-world APIs.";
      case "express":
      case "express.js":
        return "Highlight REST API development using Express.js with proper middleware and routing.";
      case "mongodb":
        return "Add a project where you designed schemas and optimized queries using MongoDB.";
      case "ci/cd":
        return "Mention CI/CD pipelines using GitHub Actions, GitLab CI, or Jenkins.";
      default:
        return `Add practical experience or a project demonstrating ${skill}.`;
    }
  });
};

export { generateATSSuggestions };
