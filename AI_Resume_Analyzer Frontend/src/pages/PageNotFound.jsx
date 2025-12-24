import { FileSearch, Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Animated Icon Section */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-50 scale-150 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-indigo-50">
            <FileSearch className="w-20 h-20 text-indigo-600 animate-bounce" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-9xl font-black text-indigo-100 absolute left-1/2 -translate-x-1/2 -top-10 -z-10 select-none">
          404
        </h1>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Resume Not Found
        </h2>

        <p className="text-lg text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for has been moved, deleted, or never
          existed. Please double-check the URL or head back home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 font-semibold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>
        </div>

        {/* Subtle Footer Suggestion */}
        <p className="mt-12 text-sm text-gray-400">
          Error Code: <span className="font-mono">ERR_PAGE_NOT_FOUND_404</span>
        </p>
      </div>
    </div>
  );
};

export { PageNotFound };
