// src/components/LoadingIndicator.jsx
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-100">
      {/* Animated Loader */}
      <div className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
        {/* Middle ring */}
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-pink-500 border-l-indigo-400 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-8 rounded-full bg-indigo-600 animate-pulse shadow-lg"></div>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Main Text */}
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-indigo-600 tracking-wide">
        Analyzing Resume
      </h2>

      {/* Progress Steps */}
      <div className="flex items-center space-x-2 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <span className="text-indigo-600 font-medium">Parsing</span>
        </div>
        <div className="text-gray-300">→</div>
        <div className="flex items-center space-x-1">
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <span className="text-purple-600 font-medium">Matching</span>
        </div>
        <div className="text-gray-300">→</div>
        <div className="flex items-center space-x-1">
          <div
            className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
          <span className="text-pink-600 font-medium">Scoring</span>
        </div>
      </div>

      {/* Sub Text */}
      <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
        Our AI is carefully matching your resume with the job description to
        provide detailed insights.
      </p>

      {/* Animated Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full animate-pulse"
          style={{ width: "60%" }}
        ></div>
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></span>
        <span
          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

      {/* Footer Hint */}
      <p className="text-xs text-gray-400 italic mt-2">
        This may take 10-30 seconds depending on resume length
      </p>
    </div>
  );
};

export { LoadingIndicator };
