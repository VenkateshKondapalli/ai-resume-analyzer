import { Link, useLocation } from "react-router-dom";
import { Cpu, BarChart3, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-gray-900 text-xl font-black tracking-tight transition-all"
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:block">
            AI Resume <span className="text-indigo-600">Screener</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          {/* Home Link */}
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:block">Home</span>
          </Link>

          {/* Analyze Link (Main CTA) */}
          <Link
            to="/analyze"
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              isActive("/analyze")
                ? "bg-indigo-600 text-white shadow-indigo-200 shadow-lg"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analyze Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
