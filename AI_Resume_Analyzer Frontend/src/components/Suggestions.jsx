const Suggestions = ({ text }) => {
  return (
    <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold text-indigo-700 mb-3">
        Actionable Advice
      </h3>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export { Suggestions };
