import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

const MatchScore = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the number counting up
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreData = (val) => {
    if (val >= 70)
      return {
        color: "#10B981", // green-500
        bg: "bg-green-50",
        text: "text-green-700",
        label: "Strong Match",
        icon: <CheckCircle2 className="w-5 h-5" />,
        desc: "Excellent alignment with role requirements.",
      };
    if (val >= 40)
      return {
        color: "#F59E0B", // yellow-500
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        label: "Partial Match",
        icon: <AlertTriangle className="w-5 h-5" />,
        desc: "Good foundation, but some key gaps exist.",
      };
    return {
      color: "#EF4444", // red-500
      bg: "bg-red-50",
      text: "text-red-700",
      label: "Low Match",
      icon: <XCircle className="w-5 h-5" />,
      desc: "Significant mismatch in core requirements.",
    };
  };

  const { color, bg, text, label, icon, desc } = getScoreData(score);

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="relative flex items-center justify-center">
        {/* SVG Radial Gauge */}
        <svg className="w-40 h-40 transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke={color}
            strokeWidth="12"
            strokeDasharray="440"
            style={{
              strokeDashoffset: 440 - (440 * animatedScore) / 100,
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-gray-900">{score}%</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
            Match
          </span>
        </div>
      </div>

      {/* Label & Description */}
      <div
        className={`mt-6 px-4 py-2 rounded-2xl ${bg} ${text} flex items-center gap-2 font-bold`}
      >
        {icon}
        {label}
      </div>

      <p className="mt-3 text-sm text-center text-gray-500 max-w-[200px] leading-relaxed">
        {desc}
      </p>

      {/* Mini Legend Indicator */}
      <div className="mt-6 w-full pt-6 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        <span className={score < 40 ? "text-red-500" : ""}>0-39% Poor</span>
        <span className={score >= 40 && score < 70 ? "text-yellow-600" : ""}>
          40-69% Fair
        </span>
        <span className={score >= 70 ? "text-green-500" : ""}>70%+ Great</span>
      </div>
    </div>
  );
};

export { MatchScore };
