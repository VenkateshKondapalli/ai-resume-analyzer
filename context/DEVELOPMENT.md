# Development & Workflow Guide

## Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **API Keys**: Google Gemini API key (Required for LLM generation)

---

## Environment Variables

### Backend (`Ai_Resume_Analyzer Backend/.env`)
| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | HTTP port for the Express server | No (defaults to 3500) | `3500` |
| `FRONTEND_URL1` | Allowed origin for CORS | Yes | `http://localhost:5173` |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | `<your_gemini_key>` |
| `GENAI_PRIMARY_MODEL` | Gemini model name | No (defaults to `gemini-2.5-flash`) | `gemini-2.5-flash` |
| `OPENAI_API_KEY` | OpenAI key for vector embeddings | Only if `USE_EMBEDDINGS=true` | `<your_openai_key>` |

> ⚠️ **SECURITY INVARIANT**: Never commit actual API keys to git. Ensure `.env` is listed in `.gitignore`.

### Frontend (`AI_Resume_Analyzer Frontend/.env`)
| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Base URL for API requests | Yes | `http://localhost:3500/api` |

---

## Commands

### Backend Server (`Ai_Resume_Analyzer Backend/`)
```bash
# Install dependencies
npm install

# Start server with hot-reloading (nodemon)
npx nodemon server.js

# Or start with standard node
node server.js
```
Local address: `http://localhost:3500`

### Frontend Application (`AI_Resume_Analyzer Frontend/`)
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Run ESLint check
npm run lint

# Preview production build
npm run preview
```
Local address: `http://localhost:5173`

---

## Debugging Workflows
1. **Frontend Debug Mode**: Click the **"Debug Mode"** toggle in the `/analyze` dashboard header to inspect the raw JSON returned from the backend.
2. **Backend Console Logs**: Low-level LLM and skill pipeline events log emojis to stdout (e.g. `🟢 generateExplanation called`, `🔥 callLLMWithPrompt USED`).
3. **Import Casing**: Ensure component imports strictly match file casing (e.g. `import { HomePage } from "./pages/HomePage"`).

---

## Related Context
- Context Navigation Index → [`INDEX.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/INDEX.md)
- Backend Architecture → [`BACKEND.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/BACKEND.md)
