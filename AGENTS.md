# Universal Agent Instructions

This repository uses a structured, token-efficient 3-tier context and memory system for all AI coding agents (Antigravity, Gemini CLI, Claude Code, Cursor, Windsurf, Codex).

---

## ⚡ Universal Agent Protocol

1. **Tier 1 (Always Read)**: Read [`GEMINI.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/GEMINI.md) for core invariants, commands, and rules, then read [`context/INDEX.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/INDEX.md) for task routing.
2. **Tier 2 (Read When Relevant)**: Read ONLY the specific context file required for your task:
   - UI / Components / Pages: [`context/FRONTEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/FRONTEND.md)
   - Backend Services / RAG / ATS: [`context/BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md)
   - API Endpoints / Payloads: [`context/API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md)
   - Pipeline Flow & Architecture: [`context/ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md)
   - Setup & Commands: [`context/DEVELOPMENT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DEVELOPMENT.md)
   - Project Overview: [`context/PROJECT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/PROJECT.md)
3. **Tier 3 (Read Selectively)**: Read only if historical or directional context is needed:
   - Traps & Gotchas: [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md)
   - Architectural Decisions: [`context/DECISIONS.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/DECISIONS.md)
   - Backlog & Roadmap: [`context/ROADMAP.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ROADMAP.md)
4. **Targeted Code Inspection**: Read only the specific files identified in the context index. Do not scan the entire repository.
5. **Context Integrity**: Source code is the implementation source of truth. If documentation conflicts with code, update the stale documentation.
