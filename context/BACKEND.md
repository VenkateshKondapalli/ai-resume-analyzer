# Backend Architecture & Conventions

For the complete backend technology stack, refer to [`context/PROJECT.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/PROJECT.md).

---

## Directory & File Structure
```text
Ai_Resume_Analyzer Backend/
├── server.js                        # HTTP listener entry point (PORT || 3500)
├── app.js                           # Express app configuration, CORS, JSON parser, route mounts
├── api/
│   ├── routes.js                    # Base API router (mounts /analyze and /ats)
│   ├── analyze/
│   │   ├── analyze.routes.js        # POST / (multer), POST /roadmap, POST /skill-knowledge
│   │   ├── analyze.controller.js    # Orchestrates skill analysis, ATS simulation, and explanation
│   │   ├── roadmap.controller.js    # Generates structured milestone learning paths
│   │   └── skillKnowledge.controller.js # Executes RAG query for specific skill
│   └── ats/
│       ├── ats.routes.js            # POST /simulate
│       └── atsSimulation.controller.js # Standalone ATS simulation endpoint (JSON only)
├── services/
│   ├── resumeParser.js              # Reads PDF buffer, unlinks temp file, caps at 18,000 chars
│   ├── llmService.js                # Google Gen AI client with jittered exponential backoff
│   ├── llm/
│   │   └── explanation.service.js   # Builds prompt and fetches plain-text score explanation
│   ├── skills/
│   │   ├── analyzeSkills.js         # Async orchestrator for deterministic skill pipeline
│   │   ├── skillExtractor.js        # Word-boundary regex matcher against SKILL_DICTIONARY
│   │   ├── skillComparison.js       # Computes exact, partial, and missing skill sets
│   │   ├── skillScore.js            # Calculates weighted match percentage
│   │   ├── skillWeights.js          # Static skill baseline weights
│   │   ├── weightResolver.js        # Merges static weights with dynamic JD importance
│   │   ├── confidenceScore.js       # Categorizes confidence: 'High', 'Medium', 'Low'
│   │   └── partialMatchMap.js       # Maps related skills (e.g., Docker -> containerization)
│   ├── ats/
│   │   ├── atsSimulator.js          # Computes ATS decision and categorizes core vs secondary gaps
│   │   ├── atsRules.js              # Threshold rules: REJECT if missing core or (<40% & missing secondary), else PASS
│   │   └── atsSkillEvaluator.js     # Classifies missing skills by JD priority
│   ├── skillRoadmap/
│   │   ├── roadmap.service.js       # Iterates missing skills and builds structured roadmap
│   │   ├── roadmap.engine.js        # Builds skeleton with categories & estimated effort
│   │   ├── roadmap.llm.js           # Calls LLM and parses sanitized JSON response
│   │   ├── roadmap.prompt.js        # Beginner-friendly mentor prompt template
│   │   └── roadmap.rules.js         # Static mappings for skill category and effort
│   └── rag/
│       ├── ragPipeline.service.js   # initRag and runSkillRag functions
│       ├── vectorStore.js           # In-memory LangChain vector store
│       ├── retriever.js             # Document retriever (top 4 similar chunks)
│       ├── prompt.js                # Prompt template for RAG skill context
│       ├── embeddings.js            # OpenAI Embeddings wrapper (requires OPENAI_API_KEY)
│       ├── ingest/                  # Text loaders and chunkers (loadDocs, loadJobs, chunkText)
│       └── jdImportance/            # JD dataset ingestion, mock/vector search & importance analyzer
└── data/
    └── rag/                         # Text corpora: aws/*.txt and jd/*.txt
```

---

## Data & Datasets
- Uses **file-based text datasets** instead of an external database.
- `data/rag/aws/`: Domain documentation on AWS services for RAG skill lookup.
- `data/rag/jd/`: Sample job descriptions (`backend_jds.txt`, `cloud_backend_jds.txt`, `fullstack_jds.txt`) used by `jdImportance.service.js` to compute real-world skill frequency weights.

---

## Important Backend Conventions
1. **Async Safety**: `analyzeSkills()` and `runSkillRag()` are `async` and must always be `await`ed.
2. **Deterministic Rules First**: Never let LLMs compute scores, weights, or skill comparisons.
3. **Word-Boundary Regex**: In `skillExtractor.js`, always use regex word boundaries (`(?:^|\s|[^a-z0-9])alias(?:$|\s|[^a-z0-9])`) to avoid substring false positives on short names (`ts`, `js`, `py`).
4. **Transient Error Handling**: `llmService.js` implements exponential backoff with jitter for HTTP 429 and 503 errors.
5. **Temporary File Cleanup**: Uploaded resume files in `uploads/` must be unlinked (`fs.unlinkSync`) immediately after text extraction in `resumeParser.js`.
6. **RAG Vector Store Lifecycle**: `initRag()` initializes the AWS vector store. Note that `initRag()` is not auto-invoked in `app.js`/`server.js` on startup; see [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md).

---

## Related Context
- API Endpoint Contracts → [`API.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/API.md)
- System Architecture & Pipeline → [`ARCHITECTURE.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/context/ARCHITECTURE.md)
- Traps & Gotchas → [`memory/MEMORY.md`](file:///c:/Users/VENKATESH/Desktop/ai-resume-analyzer/memory/MEMORY.md)
