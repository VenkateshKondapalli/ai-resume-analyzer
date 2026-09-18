# 🚀 AI Resume Analyzer (Full-Stack Monorepo)

A production-grade, AI-powered Resume Analyzer platform built with **React 19 + Vite + Tailwind CSS v4** on the frontend and **Node.js + Express + Google Gemini AI + RAG + FAISS** on the backend.

The platform provides deterministic skill extraction, explainable match scoring, LLM-generated recommendations, ATS screening simulation, personalized skill roadmaps, and RAG-augmented technical knowledge lookup.

---

## 📁 Repository Structure

```text
ai-resume-analyzer/
├── AI_Resume_Analyzer Frontend/     # React + Vite + Tailwind CSS v4 Frontend App
│   ├── src/                         # React components, pages, hooks, and API integrations
│   ├── public/                      # Static assets
│   ├── package.json                 # Frontend dependencies & scripts
│   └── README.md                    # Frontend specific documentation
│
└── Ai_Resume_Analyzer Backend/      # Node.js + Express + Gemini AI Backend Service
    ├── api/                         # Express controllers and routers
    ├── services/                    # Skill analysis, RAG pipeline, ATS rules, and LLM services
    ├── data/                        # RAG text knowledge base and JD data
    ├── uploads/                     # Temporary storage for uploaded resumes
    ├── package.json                 # Backend dependencies & scripts
    └── README.md                    # Backend specific documentation
```

---

## ✨ Core Features

- 📄 **Resume Parsing & Skill Extraction**: Supports PDF uploads (`pdf-parse` + `multer`) or direct text inputs. Evaluates exact, partial, and missing skills deterministically against target Job Descriptions (JDs).
- 📊 **Explainable Match Scoring**: Hybrid scoring model using deterministic rule-based skill comparison and optional dynamic JD skill weighting.
- 🤖 **LLM-Powered Explanations**: Uses **Google Gemini AI** (`gemini-2.5-flash`) with automatic retries and fallback to deliver natural language feedback without mutating ground-truth scores.
- 🎯 **ATS Screening Simulation**: Predicts pass/reject outcomes, categorizes missing core vs. secondary skills, and provides actionable optimization suggestions.
- 🗺️ **Personalized Skill Roadmaps**: Generates custom, milestone-based learning roadmaps for missing skills tailored to target developer roles.
- 🔍 **RAG Knowledge Base**: Powered by vector search (FAISS / OpenAI embeddings / text retriever) to offer context-rich technical skill explanations.
- 🛠️ **Developer Debug Mode**: High-flexibility UI toggle allowing developers to inspect raw API responses and internal decision metadata.

---

## 🛠️ Tech Stack

### Frontend (`AI_Resume_Analyzer Frontend`)
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 + Tailwind Animate + Lucide React Icons
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Form Management**: React Hook Form

### Backend (`Ai_Resume_Analyzer Backend`)
- **Runtime & Server**: Node.js + Express 5
- **AI & LLM Integrations**: Google Gen AI SDK (`@google/genai`), LangChain (`@langchain/google-genai`, `@langchain/openai`)
- **Embeddings & Vector Store**: OpenAI Embeddings, FAISS (`faiss-node`)
- **Parsing & Uploads**: Multer, PDF-Parse (`pdf-parse`)
- **Validation**: Zod

---

## ⚡ Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Google Gemini API Key (Required for LLM features)

### 2. Backend Setup & Run

Navigate to the backend directory:
```bash
cd "Ai_Resume_Analyzer Backend"
npm install
```

Create a `.env` file inside `Ai_Resume_Analyzer Backend/`:
```env
PORT=3500
FRONTEND_URL1=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:
```bash
# Using nodemon
npx nodemon server.js
# Or standard node
node server.js
```
The backend server will run on `http://localhost:3500`.

### 3. Frontend Setup & Run

In a new terminal, navigate to the frontend directory:
```bash
cd "AI_Resume_Analyzer Frontend"
npm install
```

Create a `.env` file inside `AI_Resume_Analyzer Frontend/`:
```env
VITE_BACKEND_URL=http://localhost:3500/api
```

Start the frontend development server:
```bash
npm run dev
```
The frontend app will be available at `http://localhost:5173`.

---

## 📡 API Reference Summary

Base URL: `http://localhost:3500/api`

| Endpoint | Method | Content-Type | Description |
| :--- | :--- | :--- | :--- |
| `/analyze` | `POST` | `multipart/form-data` or `application/json` | Analyzes resume PDF/text against job description, returning match score, skill breakdown, LLM explanation, and ATS simulation. |
| `/analyze/roadmap` | `POST` | `application/json` | Generates a structured learning roadmap based on an array of `missing_skills` and target `role`. |
| `/analyze/skill-knowledge` | `POST` | `application/json` | Fetches technical explanations for a specific skill via the RAG pipeline. |
| `/ats/simulate` | `POST` | `application/json` | Runs standalone ATS screening simulation for given `resumeText` and `jobDescription`. |

---

## 📄 License

This project is licensed under the ISC License.
