# Project Memory & Durable Agent Lessons

> **DURABLE KNOWLEDGE ONLY**: This file records non-obvious traps, subtle dependencies, and technical debt that future AI coding agents cannot deduce from casual inspection. Do not add transient tasks or changelog entries here.

---

## ⚠️ Critical Traps & Non-Obvious Gotchas

### 1. Skill Extraction Word-Boundary Invariant
- **Trap**: Using `string.includes(alias)` to detect skills.
- **Why it fails**: Short aliases (`"js"`, `"ts"`, `"py"`) match inside common English words (`requests` has `ts`, `assets` has `ts`, `project` has `js`, `happy` has `py`).
- **Rule**: In [`services/skills/skillExtractor.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/services/skills/skillExtractor.js), **ALWAYS** test aliases using word-boundary regex:
  ```javascript
  const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(?:^|\\s|[^a-z0-9])${escapedAlias}(?:$|\\s|[^a-z0-9])`);
  ```

### 2. Async Propagation in Deterministic Skill Pipeline
- **Trap**: Calling `analyzeSkills()` synchronously.
- **Why it fails**: `analyzeSkills()` calls `getJDSkillImportance()`, which is an `async` function. If `analyzeSkills()` is not awaited, `skillResult` resolves to a pending `Promise`, causing downstream controllers to crash or send empty objects.
- **Rule**: `analyzeSkills()` is `async`. Every caller in controllers **must** `await analyzeSkills(...)`.

### 3. Vector Store Initialization Gap (`initRag`)
- **Trap**: Calling `/api/analyze/skill-knowledge` without initializing the vector store.
- **Why it fails**: `initRag()` in `services/rag/ragPipeline.service.js` creates the in-memory vector store from AWS docs, but `initRag()` is currently **not called** during startup in `server.js` or `app.js`.
- **Impact**: Any request to `POST /api/analyze/skill-knowledge` throws `Error: Vector store not initialized` unless `initRag()` is invoked first.
- **Also**: `embeddings.js` requires `OPENAI_API_KEY`. If missing, requiring `vectorStore.js` will throw an error.

### 4. API Contract Schema Alignment
- **Trap**: Frontend expecting nested result wrappers when backend returns root properties.
- **Example**: `POST /api/analyze/skill-knowledge` returns `{ skill, explanation }` at the root. Frontend [`ResultCard.jsx`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/AI_Resume_Analyzer%20Frontend/src/components/ResultCard.jsx) must read `res?.explanation`, NOT `res?.result?.knowledge`.

### 5. 18,000 Character Parsing Ceiling
- In [`services/resumeParser.js`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/Ai_Resume_Analyzer%20Backend/services/resumeParser.js), resume text is truncated at `18,000` characters to prevent buffer overflow and excessive token usage during RAG search. If long resumes miss skills located on the final pages, check this ceiling.

### 6. Module Format Segregation
- Backend (`Ai_Resume_Analyzer Backend/`) is strictly **CommonJS** (`require` / `module.exports`).
- Frontend (`AI_Resume_Analyzer Frontend/`) is strictly **ES Modules** (`import` / `export`).
- Never mix module syntax.

### 7. Component Import Case Sensitivity
- On Windows, case discrepancies (e.g. `import { HomePage } from "./pages/Homepage"`) resolve locally, but fail on Linux CI/CD or Docker builds. Always preserve exact casing (`./pages/HomePage`).

---

## 🛠️ Known Technical Debt

1. **Uncalled RAG Initialization**: `initRag()` in `ragPipeline.service.js` needs to be safely wired into backend startup with graceful fallback if `OPENAI_API_KEY` is not provided.
2. **Hardcoded Roadmap Role**: Default role in `roadmap.controller.js` and `ResultCard.jsx` is hardcoded to `"Backend Developer"` / `"Backend Engineer"`.
3. **Sparse Roadmap Rules**: `services/skillRoadmap/roadmap.rules.js` only contains explicit categories for AWS, Docker, and Kubernetes. All other skills fall back to `"General"` and `"2–4 weeks"`.
4. **Limited Skill Dictionary**: `SKILL_DICTIONARY` in `skillExtractor.js` only contains 14 canonical skills.
5. **No Database Layer**: All analyses and roadmaps are ephemeral (in-memory/per-request).
