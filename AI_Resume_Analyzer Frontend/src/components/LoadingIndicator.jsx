// src/components/LoadingIndicator.jsx
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-100">
      {/* Animated Loader */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin"></div>
        <div className="absolute inset-1 rounded-full bg-white"></div>
        <div className="absolute inset-6 rounded-full bg-indigo-600 animate-pulse"></div>
      </div>

      {/* Main Text */}
      <h2 className="text-2xl font-bold text-indigo-700 tracking-wide animate-pulse">
        Analyzing Resume
      </h2>

      {/* Sub Text */}
      <p className="text-sm text-gray-500 text-center max-w-md">
        Our AI is carefully matching your resume with the job description.
      </p>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
      </div>

      {/* Footer Hint */}
      <p className="text-xs text-gray-400 italic">
        This may take a few seconds depending on resume length
      </p>
    </div>
  );
};

export { LoadingIndicator };
