import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wider hover:text-indigo-400 transition duration-300"
        >
          AI Resume Screener
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          {/* Home Link */}
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
          >
            Home
          </Link>

          {/* Analyze Link (Main Action) */}
          <Link
            to="/analyze"
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
          >
            Analyze Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
