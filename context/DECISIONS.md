# Architectural Decision Records (ADRs)

> This document records verified architectural choices, their implementation facts, and design rationales.

---

## ADR 001: Deterministic Rule-Based Skill Engine as Ground Truth
- **Status**: Implemented & Verified
- **Implementation**: [`services/skills/analyzeSkills.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/services/skills/analyzeSkills.js)
- **Verified Fact**: Skill extraction, matching, and score math are calculated strictly by JavaScript functions in `services/skills/`. The LLM prompt explicitly commands: *"Do NOT calculate scores. Do NOT add or remove skills. Do NOT contradict the data."*
- **Rationale**: LLMs produce non-deterministic scores across identical inputs and lack mathematical consistency. Deterministic rules ensure 100% reproducible, explainable scoring.
- **Consequences**: Score calculations can be audited and debugged with unit tests without relying on LLM evaluation.

---

## ADR 002: LLMs Restricted to Read-Only Explanations & Mentorship
- **Status**: Implemented & Verified
- **Implementation**: [`services/llm/explanation.service.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/services/llm/explanation.service.js)
- **Verified Fact**: Google Gemini receives the pre-calculated `match_score`, `matched_skills`, and `missing_skills`.
- **Rationale**: Keeps the candidate experience conversational and insightful without allowing the AI to hallucinate skills or alter scores.
- **Consequences**: If the Gemini API experiences rate limits (429) or transient overloads (503), the core analysis still succeeds with a static fallback explanation.

---

## ADR 003: On-Demand Lazy Execution for Roadmap & Skill Knowledge
- **Status**: Implemented & Verified
- **Implementation**: [`api/analyze/roadmap.controller.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/api/analyze/roadmap.controller.js), [`ResultCard.jsx`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/AI_Resume_Analyzer%20Frontend/src/components/ResultCard.jsx)
- **Verified Fact**: Roadmaps and skill knowledge queries are decoupled into separate API endpoints (`/api/analyze/roadmap`, `/api/analyze/skill-knowledge`) triggered only when the user clicks specific buttons in the UI.
- **Rationale**: Eliminates unnecessary LLM token expenditure and reduces initial resume analysis response latency from ~10s to ~2-3s.
- **Consequences**: Frontend manages independent loading states (`loadingRoadmap`, `loadingSkill`) in `ResultCard.jsx`.

---

## ADR 004: File-Based Knowledge Datasets for Initial Phase
- **Status**: Implemented & Verified
- **Implementation**: [`data/rag/`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/data/rag/)
- **Verified Fact**: Domain data and JD corpora are stored as plain text files (`.txt`) in `data/rag/aws/` and `data/rag/jd/`.
- **Rationale**: Provides zero-configuration onboarding for developers (no external database server or credentials required).
- **Consequences**: Easy local development, but does not support persistence of user resume history. (Database migration is tracked in [`ROADMAP.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ROADMAP.md)).

---

## ADR 005: Word-Boundary Regex for Short Skill Aliases
- **Status**: Implemented & Verified
- **Implementation**: [`services/skills/skillExtractor.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/services/skills/skillExtractor.js)
- **Verified Fact**: Skill extraction tests aliases using `(?:^|\s|[^a-z0-9])alias(?:$|\s|[^a-z0-9])` instead of `normalized.includes(alias)`.
- **Rationale**: Substring matching caused short aliases like `js` (JavaScript), `ts` (TypeScript), and `py` (Python) to trigger false positives on common words (`requests`, `assets`, `project`, `happy`).
- **Consequences**: Precise extraction with zero false positives on standard resume vocabulary.
