import { Sparkles, CheckCircle, ArrowRight, Wrench, Info } from "lucide-react";

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
    <div className="mt-12 bg-white rounded-3xl border border-indigo-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-indigo-600 px-6 py-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-indigo-100" />
        <h3 className="text-lg font-bold text-white tracking-tight">
          AI Action Plan
        </h3>
      </div>

      <div className="p-8">
        {steps.length > 0 ? (
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 group">
                {/* Numbered Step Indicator */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="w-px h-full bg-indigo-100 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-500 italic">
            <Info className="w-5 h-5" />
            No specific advice was generated for this section.
          </div>
        )}
      </div>
    </div>
  );
};

export { Suggestions };
