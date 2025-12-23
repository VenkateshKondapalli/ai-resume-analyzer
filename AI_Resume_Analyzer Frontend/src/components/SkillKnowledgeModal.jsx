const SkillKnowledgeModal = ({ skill, knowledge, onClose, loading }) => {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Skill Knowledge: {skill}</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {loading ? (
          <p>Loading knowledge...</p>
        ) : (
          <div className="whitespace-pre-line text-sm">{knowledge}</div>
        )}
      </div>
    </div>
  );
};

export { SkillKnowledgeModal };
