# System Architecture

## Architecture Overview
The application follows a decoupled client-server architecture with a strict boundary between **deterministic rule-based processing** and **probabilistic LLM generation**.

```text
[ React 19 Frontend ]
         │ (HTTP / JSON / Multipart)
         ▼
[ Express 5 Router ]  (api/routes.js)
         │
         ▼
[ Controllers ]       (api/analyze/, api/ats/)
         │
    ┌────┴───────────────────────────┐
    ▼                                ▼
[ Resume Parser ]            [ Deterministic Skill Engine ]
(services/resumeParser.js)   (services/skills/)
                             - skillExtractor (word boundary regex)
                             - skillComparison (exact + partial)
                             - skillScore (weighted calculation)
                                    │
                                    ▼
                             [ RAG JD Weighting ]
                             (services/rag/jdImportance/)
                             - Keyword similarity over local JD corpus
                                    │
                                    ▼
                             [ ATS Simulator ]
                             (services/ats/)
                             - atsRules: PASS vs REJECT (<40% or missing core)
                                    │
                                    ▼
                             [ LLM Explainer ] (Read-only)
                             (services/llmService.js via Gemini API)
```

---

## Core Architectural Invariants

### 1. Deterministic Ground Truth
- **Match scores and skill lists are never calculated by LLMs.**
- `analyzeSkills.js` executes deterministic string matching and weighting math.
- The LLM prompt explicitly enforces: *"Do NOT calculate scores. Do NOT add or remove skills. Do NOT contradict the data."*
- Design Rationale: [`context/DECISIONS.md#ADR-001`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)

### 2. LLMs are Read-Only Explainers & Mentors
- The LLM receives pre-computed results (`match_score`, `matched_skills`, `missing_skills`).
- Its purpose is generating human-friendly prose explaining gaps and recommending actions.
- If LLM generation fails (e.g. rate limit, network timeout), the API returns a graceful fallback message (`"Suggestions unavailable. Skill analysis above is accurate."`) without failing the core analysis.
- Design Rationale: [`context/DECISIONS.md#ADR-002`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)

### 3. On-Demand Lazy Execution
- Learning Roadmaps (`/api/analyze/roadmap`) and Skill Knowledge (`/api/analyze/skill-knowledge`) are **not** computed during initial resume analysis.
- They are triggered only when the user clicks **"Generate Roadmap"** or clicks an individual skill tag in the UI, conserving LLM tokens and reducing initial latency from ~10s to ~2-3s.
- Design Rationale: [`context/DECISIONS.md#ADR-003`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)

### 4. Layered MVC Backend Pattern
- **Router** (`api/**/routes.js`): Maps HTTP verbs and paths; applies middleware (e.g., `multer`).
- **Controller** (`api/**/*.controller.js`): Parses request, orchestrates services, handles status codes and error serialization.
- **Service** (`services/`): Business logic, reusable across controllers.
- **Engines / Rules** (`services/skills/`, `services/ats/`): Deterministic calculation algorithms and rulesets.

---

## End-to-End Analysis Data Flow

1. **Submission**: User submits file or text + job description to `POST /api/analyze`.
2. **Text Extraction**: `extractResumeText()` reads PDF buffer via `pdf-parse`, deletes temporary upload, and caps at 18,000 chars.
3. **Skill Extraction**: `extractSkillsFromText()` uses word-boundary regex over normalized text against `SKILL_DICTIONARY`.
4. **Comparison**: `skillComparison()` computes exact matches, partial matches (via `partialMatchMap.js`), and missing skills.
5. **Dynamic Weighting**: `getJDSkillImportance()` queries JD corpus for related roles and scores skill frequencies (core weight 10, secondary 6).
6. **Scoring**: `computeSkillScore()` calculates weighted percentage `(matched + 0.5 * partial) / total`.
7. **ATS Screening**: `simulateATS()` evaluates missing core vs. secondary skills (`PASS` vs `REJECT`).
8. **LLM Explanation**: `generateExplanation()` sends ground truth to Gemini with exponential backoff and returns narrative feedback.

---

## Related Context
- Backend service details → [`BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md)
- API endpoint contracts → [`API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md)
- Architectural Decisions → [`DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)
