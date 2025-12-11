const HomePage = () => {
  console.log("hello this venkatesh");
  return (
    // Outer container: centered, max width, padding
    <div className="p-10 mx-auto max-w-4xl text-center font-sans">
      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        Resume Screening Assistant
      </h1>

      {/* Sub-heading/Slogan */}
      <h2 className="mt-3 text-xl font-medium text-indigo-600 sm:text-2xl">
        Match Skills, Define Success.
      </h2>

      {/* Introduction Paragraph */}
      <p className="mt-8 text-lg leading-relaxed text-gray-700">
        Welcome to the application. Use the navigation (or the button below) to
        upload a resume and a job description. Our system uses the Gemini AI to
        provide an objective match score, detailed skill analysis, and
        constructive suggestions.
      </p>

      {/* Action Button */}
      <button
        className="mt-10 px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        // In a real app, you would use useNavigate hook from react-router-dom here
        onClick={() => console.log("Navigate to /analyze")}
      >
        Start Screening Now
      </button>

      {/* Footer/Attribution (using the original text you provided) */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Illustrations by Freepik, Images by Unsplash
      </div>
    </div>
  );
};

export { HomePage };
