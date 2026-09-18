# Project Overview

## Purpose
**AI Resume Analyzer** is an explainable, full-stack recruitment tool that evaluates developer resumes against job descriptions (JDs). It bridges the gap between opaque ATS algorithms and candidates by providing deterministic skill matching, ATS pass/fail predictions, Google Gemini-powered feedback, and targeted learning roadmaps.

---

## Core Capabilities
1. **Resume Ingestion**: Accepts PDF uploads or pasted plain text (capped at 18,000 characters).
2. **Deterministic Skill Extraction**: Extracts skills using canonical alias dictionaries and word-boundary matching.
3. **JD Importance Weighting**: Analyzes similar job descriptions via RAG to assign dynamic weights to core vs. secondary skills.
4. **ATS Simulation**: Computes screening decision (`PASS`, `BORDERLINE`, `REJECT`) with explicit reasoning.
5. **LLM Explanations**: Generates professional, human-readable match explanations using Google Gemini without altering ground-truth scores.
6. **AI Learning Roadmap**: On-demand generation of study topics and milestone project ideas for missing skills.
7. **Skill Knowledge Deep Dive**: On-demand RAG lookup for detailed context on specific technical skills.

---

## Repository Structure (Monorepo)
```text
ai-resume-analyzer/
├── AI_Resume_Analyzer Frontend/     # React 19 + Vite 7 SPA
├── Ai_Resume_Analyzer Backend/      # Node.js + Express 5 API Server
├── context/                         # Token-efficient AI agent knowledge layer
├── memory/                          # Durable AI agent memory & lessons
├── gemini.md                        # Primary AI agent instructions (entry point)
└── README.md                        # Human-facing project overview
```

---

## Technology Stack Summary
| Area | Technologies | Location |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite 7, Tailwind CSS v4, Framer Motion, Axios, React Hook Form | `AI_Resume_Analyzer Frontend/` |
| **Backend** | Node.js (CommonJS), Express 5, Multer, Zod, PDF-Parse | `Ai_Resume_Analyzer Backend/` |
| **AI / LLM** | Google Gen AI SDK (`@google/genai`), Gemini 2.5 Flash | `Ai_Resume_Analyzer Backend/services/llmService.js` |
| **RAG / Vector**| LangChain (`@langchain/core`), FAISS (`faiss-node`), OpenAI Embeddings (toggleable) | `Ai_Resume_Analyzer Backend/services/rag/` |
| **Data** | File-based text corpora for JDs and AWS documentation | `Ai_Resume_Analyzer Backend/data/rag/` |

---

## Key Entry Points
- **Frontend Entry**: `AI_Resume_Analyzer Frontend/src/main.jsx` -> `App.jsx` -> `pages/AnalyzePage.jsx`
- **Backend Entry**: `Ai_Resume_Analyzer Backend/server.js` -> `app.js` -> `api/routes.js`
- **Skill Engine**: `Ai_Resume_Analyzer Backend/services/skills/analyzeSkills.js`

---

## External Services
- **Google Gemini API**: Generates explanations and roadmaps (`GEMINI_API_KEY`).
- **OpenAI API** *(Optional)*: Embeddings for vector search when `USE_EMBEDDINGS=true` (`OPENAI_API_KEY`). Defaults to in-memory mock keyword similarity.
