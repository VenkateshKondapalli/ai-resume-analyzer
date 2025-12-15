const MatchScore = ({ score }) => {
  let colorClass = "text-gray-600 border-gray-400";
  let ringColor = "ring-gray-400";

  if (score >= 80) {
    colorClass = "text-green-600 border-green-500";
    ringColor = "ring-green-400";
  } else if (score >= 50) {
    colorClass = "text-yellow-600 border-yellow-500";
    ringColor = "ring-yellow-400";
  } else {
    colorClass = "text-red-600 border-red-500";
    ringColor = "ring-red-400";
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className={`relative w-28 h-28 flex items-center justify-center rounded-full border-4 ${colorClass} ring-8 ${ringColor}`}
      >
        <span className="text-4xl font-extrabold">{score}%</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-gray-700">Match Score</p>
    </div>
  );
};

export { MatchScore };
