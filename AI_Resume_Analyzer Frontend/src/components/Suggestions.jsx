const parseSuggestions = (text) => {
  if (!text) return [];

  let cleanedText = text.replace(/(\*|\d+\.|-)\s*/g, "");
  const steps = cleanedText.split(/([.?!]\s+(?=[A-Z]))/);

  let sentences = [];
  for (let i = 0; i < steps.length; i += 2) {
    let sentence = steps[i];
    if (i + 1 < steps.length) sentence += steps[i + 1];
    if (sentence.trim()) sentences.push(sentence.trim());
  }

  if (sentences.length <= 1) {
    sentences = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  return sentences;
};

const Suggestions = ({ text }) => {
  const steps = parseSuggestions(text);

  return (
    <div className="mt-10 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-xl shadow-sm">
      {/* Title */}
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">
        Actionable Advice
      </h3>

      {/* Content */}
      {steps.length > 0 ? (
        <ul className="space-y-4 text-gray-700 leading-relaxed pl-5 list-disc">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 text-indigo-500">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {text ||
            "No specific actionable advice was generated for this analysis."}
        </p>
      )}
    </div>
  );
};

export { Suggestions };
