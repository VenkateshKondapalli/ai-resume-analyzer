# Context Router & Navigation Index

> **AI Agent Navigation Layer**: Use this routing index to identify the exact documentation files required for your task. Do NOT read every context file.

---

## 🧭 Task-Based Context Router

| Task / Concern | Primary Context File | Secondary Files (Only if needed) |
| :--- | :--- | :--- |
| **Understand project scope & stack** | [`PROJECT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/PROJECT.md) | [`ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md) |
| **Modify system design or data flow** | [`ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md) | [`DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md) |
| **Frontend UI, pages, components** | [`FRONTEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/FRONTEND.md) | [`API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md) |
| **Backend routes, services, engines** | [`BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) | [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md) |
| **API endpoints, contracts, payloads**| [`API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md) | [`BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) |
| **Setup, commands, environment variables** | [`DEVELOPMENT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DEVELOPMENT.md) | — |
| **Understand architectural rationale ("Why?")** | [`DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md) | [`ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md) |
| **Known traps, bugs, gotchas** | [`../memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md) | — |
| **Feature planning & backlog status** | [`ROADMAP.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ROADMAP.md) | — |

---

## 🎯 Multi-File Task Combinations

When a task spans multiple areas, load only the specific combination below:

- **New Backend API Feature**:
  1. [`context/API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md) (Define endpoint contract)
  2. [`context/BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) (Locate service & controller)
  3. *(Optional)* [`context/ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md) (Only if pipeline flow changes)

- **Connecting New UI Component to Backend**:
  1. [`context/FRONTEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/FRONTEND.md) (Component conventions)
  2. [`context/API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md) (Endpoint payload contract)

- **Modifying Skill Extraction or Scoring Rules**:
  1. [`context/BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) (`services/skills/` file map)
  2. [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md) (Word-boundary regex trap)
  3. [`context/DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md) (ADR 001 on determinism)

- **Modifying ATS Simulation Rules**:
  1. [`context/BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md) (`services/ats/` file map)
  2. [`context/API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md) (ATS response shape)

---

## 🚫 What NOT to Read

- Do NOT read `FRONTEND.md` when working solely on backend algorithms or APIs.
- Do NOT read `BACKEND.md` when working solely on UI styling or page layout.
- Do NOT read `DECISIONS.md` or `ROADMAP.md` for routine bug fixes.
- Do NOT read `memory/MEMORY.md` unless touching skill matching, async flows, or RAG initialization.
