# Frontend Architecture & Conventions

For the complete frontend technology stack, refer to [`context/PROJECT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/PROJECT.md).

---

## Directory Structure
```text
AI_Resume_Analyzer Frontend/src/
├── api/
│   └── analyze.js                    # API client methods (analyzeResume, generateRoadMap, fetchSkillKnowledge)
├── axios/
│   └── axiosInstance.js              # Axios instance configured with VITE_BACKEND_URL
├── components/
│   ├── ATSImprovementSuggestions.jsx # Suggestions for ATS score boost (calls utils/atsSuggestions.js)
│   ├── ATSResult.jsx                 # Status banner (PASS/REJECT), decision logic, and missing skill badges
│   ├── ErrorAlert.jsx                # Error banner with retry trigger
│   ├── LoadingIndicator.jsx          # Progress spinner and analysis state message
│   ├── MatchScore.jsx                # Circular/numerical match percentage gauge
│   ├── Navbar.jsx                    # Top navigation header
│   ├── ResultCard.jsx                # Master result view: MatchScore, Suggestions, SkillsList, ATSResult, Roadmap, Debug
│   ├── ResumeForm.jsx                # Form with tabs (Upload File vs Paste Text) + Job Description
│   ├── SkillKnowledgeModal.jsx       # Modal popup showing RAG knowledge for clicked skill
│   ├── SkillsList.jsx                # Badges for matched, partial, and missing skills with click handlers
│   └── Suggestions.jsx               # AI action plan narrative card (renders step-by-step guidance)
├── pages/
│   ├── AnalyzePage.jsx               # Main screening dashboard view
│   ├── HomePage.jsx                  # Marketing landing page with hero, bento grid, and CTAs
│   └── PageNotFound.jsx              # 404 fallback page
├── utils/
│   └── atsSuggestions.js             # Client-side fallback ATS tip generator
├── App.jsx                           # React Router 7 setup
├── index.css                         # Tailwind CSS v4 imports
└── main.jsx                          # DOM entry point
```

---

## Routing (`src/App.jsx`)
| Route | Page Component | Purpose |
| :--- | :--- | :--- |
| `/` | `pages/HomePage.jsx` | Landing page, feature highlights, and direct CTAs |
| `/analyze` | `pages/AnalyzePage.jsx` | Interactive resume screening interface and results display |
| `*` | `pages/PageNotFound.jsx` | Catch-all 404 handler |

---

## State Management & Form Handling
- **Form State**: Managed via `react-hook-form` in `ResumeForm.jsx`.
- **Upload Mode**: `activeTab` toggles between `'file'` (PDF/DOCX file upload) and `'text'` (plain text textarea).
- **Result State**: Lifted to `AnalyzePage.jsx` (`analysisResult`, `isLoading`, `errorMessage`, `showRawOutput`).
- **On-Demand Sub-State**: Roadmap data (`roadmap`) and skill modal data (`selectedSkill`, `skillKnowledge`) live locally in `ResultCard.jsx` to prevent unnecessary page re-renders.

---

## API Communication Layer (`src/api/analyze.js`)
- Uses `axiosInstance` (`baseURL: process.env.VITE_BACKEND_URL || 'http://localhost:3500/api'`).
- Sends `multipart/form-data` when a file is present, otherwise falls back to clean JSON `{ resumeText, jobDescription }`.
- Schema Note: `fetchSkillKnowledge(skill)` returns `{ skill, explanation }`. The UI accesses `res.explanation`.

---

## Important Frontend Conventions
1. **Never Recalculate Backend Logic**: The UI must display scores and skill sets strictly as returned from the API.
2. **Case Sensitivity**: Component file names are PascalCase (e.g. `HomePage.jsx`). Always preserve exact casing in imports (`import { HomePage } from "./pages/HomePage"`).
3. **Debug Console**: `ResultCard.jsx` includes a collapsible JSON inspector (`showRawOutput`) for transparent verification of raw backend data.

---

## Related Context
- API Endpoint Contracts → [`API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md)
- Development Commands → [`DEVELOPMENT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DEVELOPMENT.md)
