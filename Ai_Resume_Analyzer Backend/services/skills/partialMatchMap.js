const PARTIAL_SKILL_MAP = {
  Docker: ["containerization", "containers"],
  Kubernetes: ["k8s", "orchestration"],
  AWS: ["cloud", "ec2", "s3", "lambda"],
  "REST APIs": ["rest", "restful"],
  MongoDB: ["nosql"],
};

const getPartialMatches = (skill) => {
  return PARTIAL_SKILL_MAP[skill] || [];
};

module.exports = { getPartialMatches };
