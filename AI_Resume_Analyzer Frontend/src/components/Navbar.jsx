import { Link, useLocation } from "react-router-dom";
import { Cpu, BarChart3, Home, Sparkles } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50 shadow-2xl shadow-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo with Glow Effect */}
            <Link
              to="/"
              className="group flex items-center gap-3 transition-all"
            >
              <div className="relative">
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-indigo-400 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>

                {/* Icon with gradient and animation */}
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-indigo-500/50">
                  <Cpu className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Two-line brand name */}
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight leading-none text-white">
                  AI Resume <span className="text-indigo-400">Screener</span>
                </span>
                <span className="text-[10px] text-indigo-300/70 font-medium tracking-wide uppercase">
                  Powered by AI
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {/* Home Link with Bottom Border Indicator */}
              <Link
                to="/"
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive("/")
                    ? "bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:block">Home</span>

                {/* Active indicator line */}
                {isActive("/") && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"></div>
                )}
              </Link>

              {/* Analyze CTA with Shimmer Effect */}
              <Link
                to="/analyze"
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${
                  isActive("/analyze")
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                    : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-500 hover:to-purple-600 shadow-md shadow-indigo-600/30 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
                }`}
              >
                {/* Shimmer animation on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <BarChart3 className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Analyze Resume</span>

                {/* Sparkle icon when active */}
                {isActive("/analyze") && (
                  <Sparkles className="w-3 h-3 relative z-10 animate-pulse" />
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Animated gradient progress bar when on analyze page */}
        {isActive("/analyze") && (
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/50"></div>
        )}
      </nav>
    </>
  );
};

export { Navbar };
