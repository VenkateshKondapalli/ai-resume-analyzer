import React, { useState, useEffect } from "react";
import { Cpu, Search, Target, BarChart, Sparkles } from "lucide-react";

const LoadingIndicator = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Gemini is identifying core technical competencies...",
    "Comparing job requirements with your experience...",
    "Detecting industry-specific keywords for ATS...",
    "Generating actionable suggestions for improvement...",
    "Building your custom learning roadmap...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="flex flex-col items-center justify-center p-12 max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>

      {/* Main Animated Visual */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-20 animate-pulse scale-150"></div>

        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-600 animate-spin"></div>

          {/* Middle Ring (Reverse) */}
          <div
            className="absolute inset-4 rounded-full border-[3px] border-transparent border-b-purple-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "2s" }}
          ></div>

          {/* Center Icon */}
          <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-indigo-50">
            <Cpu className="w-10 h-10 text-indigo-600 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
          Deep Analysis <Sparkles className="w-6 h-6 text-amber-400" />
        </h2>
        <div className="h-6 overflow-hidden">
          <p className="text-indigo-600 font-bold animate-in slide-in-from-bottom-2 duration-500 key={currentTip}">
            {tips[currentTip]}
          </p>
        </div>
      </div>

      {/* Process Visualization Steps */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-sm mb-10">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-indigo-50 rounded-2xl">
            <Search className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Parse
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-purple-50 rounded-2xl">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Match
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-pink-50 rounded-2xl">
            <BarChart className="w-5 h-5 text-pink-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Score
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-700 ease-out"
          style={{ width: "65%" }}
        >
          <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem] animate-[move_1s_linear_infinite]"></div>
        </div>
      </div>

      <p className="mt-6 text-xs font-medium text-gray-400 flex items-center gap-2 italic">
        <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping"></span>
        AI processing in progress... average time 15s.
      </p>
    </div>
  );
};

export { LoadingIndicator };
