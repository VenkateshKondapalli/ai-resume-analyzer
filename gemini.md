# AI Resume Analyzer — Agent Guidelines & Instructions

> **CRITICAL INSTRUCTIONS FOR ALL AI CODING AGENTS**:
> 1. Do **NOT** read the entire repository by default.
> 2. Do **NOT** recursively read every Markdown file.
> 3. Follow the **Three-Tier Context Loading** system below.
> 4. Use [`context/INDEX.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/INDEX.md) to locate the exact file for your task.
> 5. Read source code only after narrowing down the target files.

---

## ⚡ Recommended Agent Workflow

```text
1. Read GEMINI.md (this file)
   ↓
2. Read context/INDEX.md (routing table)
   ↓
3. Identify task domain & load ONLY relevant context files (Tier 2 / Tier 3)
   ↓
4. Follow file references to target source code
   ↓
5. Inspect ONLY the necessary implementation files
   ↓
6. Make the change
   ↓
7. Run validation / linting commands
   ↓
8. Verify if durable project knowledge changed
   ↓
9. Update ONLY the affected context / memory files (never all of them)
```

---

## 📚 Three-Tier Context Loading System

```text
┌─────────────────────────────────────────────────────────────┐
│ Tier 1: Always Read                                         │
│ • GEMINI.md                                                 │
│ • context/INDEX.md                                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Tier 2: Read When Relevant to Task                          │
│ • Overview / Stack       → context/PROJECT.md               │
│ • Data flow / Pipeline   → context/ARCHITECTURE.md          │
│ • Frontend UI / Pages    → context/FRONTEND.md              │
│ • Backend Services / RAG → context/BACKEND.md               │
│ • API Routes / Contracts → context/API.md                   │
│ • Commands / Setup       → context/DEVELOPMENT.md           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Tier 3: Read Selectively (Historical & Directional)         │
│ • Design rationales      → context/DECISIONS.md             │
│ • Traps / Known debt     → memory/MEMORY.md                 │
│ • Backlog / Milestones   → context/ROADMAP.md               │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚖️ Source of Truth

- **Source Code**: The ultimate source of truth for implementation details.
- **Context Files (`context/*.md`)**: Compressed knowledge layer and navigation aid.
- **`README.md`**: Human-facing high-level project summary.
- **`GEMINI.md` / `AGENTS.md`**: AI agent operating instructions.
- **`memory/MEMORY.md`**: Durable lessons, traps, and non-obvious historical knowledge.
- **`context/DECISIONS.md`**: Architectural decisions with verified rationales.

### Context Integrity Rule
```text
Documentation claims X
        ↓
Agent checks source code
        ↓
Is X still accurate?
   /            \
 YES             NO
 │               │
continue       update stale context immediately
```
*Never blindly trust documentation over actual code. If code and context disagree, verify the code and fix the stale documentation.*

---

## 🔒 Core Development Invariants

1. **Deterministic Scores are Ground Truth**:
   - Scores and skill matches are calculated in `services/skills/`.
   - Never let an LLM generate, calculate, or alter match scores or matched/missing skill lists.
2. **LLM is Read-Only**:
   - Google Gemini is used solely to generate explanations and learning roadmaps based on pre-calculated data.
3. **Word-Boundary Regex for Skills**:
   - In `skillExtractor.js`, all skill aliases must be tested using word-boundary regex (`(?:^|\\s|[^a-z0-9])alias(?:$|\\s|[^a-z0-9])`). Never use `string.includes()`.
4. **Async Rules**:
   - `analyzeSkills()` and `runSkillRag()` are asynchronous. Any caller must `await` them.
5. **Module Formats**:
   - Backend = CommonJS (`require` / `module.exports`).
   - Frontend = ES Modules (`import` / `export`).
6. **Temporary File Cleanup**:
   - Always delete uploaded files in `services/resumeParser.js` immediately after parsing.

---

## 🛠️ Essential Commands

| Task | Command | Directory |
| :--- | :--- | :--- |
| Install Backend Dependencies | `npm install` | `Ai_Resume_Analyzer Backend/` |
| Start Backend Server | `npx nodemon server.js` | `Ai_Resume_Analyzer Backend/` |
| Install Frontend Dependencies | `npm install` | `AI_Resume_Analyzer Frontend/` |
| Start Frontend Dev Server | `npm run dev` | `AI_Resume_Analyzer Frontend/` |
| Frontend Production Build | `npm run build` | `AI_Resume_Analyzer Frontend/` |
| Frontend Lint Check | `npm run lint` | `AI_Resume_Analyzer Frontend/` |

---

## 📝 Documentation Maintenance Rules

> **Update documentation ONLY when durable project knowledge changes.**

### When to Update Context:
- Added, modified, or removed an API endpoint → update [`context/API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md)
- Altered backend service flow, RAG pipeline, or ATS rules → update [`context/BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) & [`context/ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md)
- Added/reorganized frontend pages, components, or state → update [`context/FRONTEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/FRONTEND.md)
- Changed environment variables or dev commands → update [`context/DEVELOPMENT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DEVELOPMENT.md)
- Made an architectural design choice → update [`context/DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)
- Discovered a subtle technical trap or gotcha → update [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md)
- Completed a backlog milestone → mark `[x]` in [`context/ROADMAP.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ROADMAP.md)

### Do NOT Update Context for:
- CSS/styling tweaks
- Typo or comment fixes
- Small internal refactors with no interface changes
- Routine bug fixes with no durable architectural impact
- Temporary debugging code
