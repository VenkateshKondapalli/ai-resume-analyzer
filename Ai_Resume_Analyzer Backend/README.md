# 🧠 AI Resume Analyzer — Backend

A **production-grade backend** for an AI-powered Resume Analyzer that combines deterministic skill analysis, LLM explanations, dynamic JD-aware scoring, RAG-based knowledge augmentation, and ATS simulation.

Built with **clean architecture**, **phase-based evolution**, and **future scalability** in mind.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

- **📊 Deterministic Skill Analysis** — Rule-based matching with explainable scoring
- **🤖 LLM-Powered Explanations** — Context-aware feedback on resume quality
- **📈 Dynamic Skill Weighting** — JD-aware importance scoring using RAG
- **🗺️ Personalized Learning Roadmaps** — Actionable plans for missing skills
- **🔍 Skill Knowledge Base** — RAG-powered deep dives into technologies
- **🎯 ATS Behavior Simulation** — Predict resume screening outcomes with optimization feedback
- **🏗️ Clean Architecture** — Router → Controller → Service → Engine separation

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js + Express |
| **AI/ML** | OpenAI GPT-4, Google Gemini |
| **RAG Pipeline** | Custom LangChain-inspired architecture |
| **Embeddings** | OpenAI Embeddings (toggleable) |
| **Storage** | File-based datasets (JSON/TXT) |
| **Architecture** | Layered MVC with service-oriented design |

---

## 🏛️ Architecture

```
┌─────────────┐
│   Router    │  Routes incoming requests
└──────┬──────┘
       │
┌──────▼──────┐
│ Controller  │  Request validation & response formatting
└──────┬──────┘
       │
┌──────▼──────┐
│  Service    │  Business logic orchestration
└──────┬──────┘
       │
┌──────▼──────┐
│   Engine    │  Core algorithms & LLM interactions
└─────────────┘
```

---

## 📁 Project Structure

```
backend/
├── api/
│   ├── analyze/
│   │   ├── analyze.controller.js      # Core analysis endpoint
│   │   ├── roadmap.controller.js      # Learning roadmap generation
│   │   ├── skillKnowledge.controller.js  # RAG skill lookup
│   │   └── router.js                  # API route definitions
│   │
│   └── ats/
│       ├── ats.controller.js          # ATS evaluation endpoint
│       └── ats.router.js              # ATS route definitions
│
├── data/
│   ├── rag/
│   │   └── aws/                       # AWS skill knowledge base
│   │       ├── aws_context.txt
│   │       ├── aws_projects.txt
│   │       └── aws_skills.txt
│   └── jd/                            # Job description datasets
│       ├── backend_jds.txt
│       ├── cloud_backend_jds.txt
│       └── fullstack_jds.txt
│
├── services/
│   ├── ats/
│   │   ├── atsRules.js                # ATS screening rules
│   │   ├── atsSkillEvaluator.js       # Skill importance classifier
│   │   ├── simulateATS.js             # ATS decision engine
│   │   └── ats.service.js             # Service orchestration
│   │
│   ├── llm/
│   │   └── explanation.service.js     # LLM explanation generation
│   │
│   ├── rag/
│   │   ├── ingest/                    # Document processing
│   │   │   ├── chunkText.js
│   │   │   ├── loadDocs.js
│   │   │   └── loadJds.js
│   │   │
│   │   ├── jdImportance/              # Dynamic skill weighting
│   │   │   ├── jdImportance.service.js
│   │   │   ├── jdIngest.js
│   │   │   ├── jdRetriever.js
│   │   │   ├── jdSkillAnalyzer.js
│   │   │   └── jdVectorStore.js
│   │   │
│   │   ├── embeddings.js              # Vector embeddings
│   │   ├── ragPipeline.service.js     # RAG orchestration
│   │   ├── retriever.js               # Semantic search
│   │   └── vectorStore.js             # In-memory vector DB
│   │
│   ├── skillRoadmap/
│   │   ├── roadmap.engine.js          # Roadmap generation logic
│   │   ├── roadmap.llm.js             # LLM integration
│   │   ├── roadmap.prompt.js          # Prompt templates
│   │   ├── roadmap.rules.js           # Business rules
│   │   └── roadmap.service.js         # Service orchestration
│   │
│   ├── skills/
│   │   ├── analyzeSkills.js           # Skill extraction & matching
│   │   ├── confidenceScore.js         # Match confidence calculation
│   │   ├── partialMatchMap.js         # Fuzzy skill matching
│   │   ├── skillComparison.js         # Resume vs JD comparison
│   │   ├── skillExtractor.js          # Text → skills parser
│   │   ├── skillScore.js              # Weighted scoring
│   │   ├── skillWeights.js            # Default importance weights
│   │   └── weightResolver.js          # Dynamic weight resolution
│   │
│   ├── llmService.js                  # LLM client abstraction
│   ├── resumeParser.js                # Resume text extraction
│   └── scoringService.js              # Score aggregation
│
├── uploads/                           # Temporary file storage
├── app.js                             # Express app configuration
├── server.js                          # Server entry point
├── package.json
└── .env.example
```

---

## 🧩 Feature Roadmap

### ✅ Phase 1–4: Core Resume Analysis
**Status:** Complete

Deterministic, explainable resume scoring with LLM-enhanced feedback.

**Capabilities:**
- Resume text extraction (file upload or raw text)
- Skill extraction from resume and job description
- Exact and fuzzy skill matching
- Weighted match scoring
- Confidence level calculation
- LLM-generated explanations

**Endpoint:** `POST /analyze`

**Sample Request:**
```json
{
  "jobDescription": "Backend Engineer with Node.js, AWS, Docker, PostgreSQL",
  "resumeText": "Experienced backend developer with 3 years in Node.js and AWS"
}
```

**Sample Response:**
```json
{
  "success": true,
  "result": {
    "matched_skills": ["Node.js", "AWS"],
    "missing_skills": ["Docker", "PostgreSQL"],
    "partial_matches": [],
    "match_score": 50,
    "confidence_level": "Medium",
    "explanation": "Your resume demonstrates strong backend fundamentals with Node.js and cloud experience. Consider adding Docker containerization and database expertise to strengthen your candidacy..."
  }
}
```

---

### ✅ Phase 5.1: Skill Gap Roadmap
**Status:** Complete

Converts missing skills into actionable learning plans with effort estimates, resources, and project ideas.

**Endpoint:** `POST /analyze/roadmap`

**Sample Request:**
```json
{
  "missing_skills": ["AWS", "Docker"],
  "role": "Backend Engineer"
}
```

**Sample Response:**
```json
{
  "success": true,
  "result": {
    "role": "Backend Engineer",
    "missing_skills": ["AWS", "Docker"],
    "roadmap": [
      {
        "skill": "AWS",
        "estimated_effort": "2–3 weeks",
        "difficulty": "Intermediate",
        "what_to_learn": [
          "EC2, S3, Lambda basics",
          "IAM and security best practices",
          "CloudWatch monitoring"
        ],
        "project_ideas": [
          "Deploy a Node.js REST API on EC2",
          "Build a serverless function with Lambda"
        ],
        "learning_resources": [
          "AWS Free Tier hands-on labs",
          "Udemy AWS Certified Developer course"
        ]
      }
    ]
  }
}
```

---

### ✅ Phase 6.1: Skill Knowledge Base (RAG)
**Status:** Infrastructure ready, billing-gated

Provides grounded, context-aware explanations for individual skills using retrieval-augmented generation.

**Endpoint:** `POST /analyze/skill-knowledge`

**Sample Request:**
```json
{
  "skill": "AWS",
  "context": "backend engineering"
}
```

**Sample Response:**
```json
{
  "success": true,
  "result": {
    "skill": "AWS",
    "explanation": "AWS (Amazon Web Services) is the leading cloud computing platform used extensively in backend systems for scalable infrastructure, serverless computing, and managed databases...",
    "relevance": "Essential for modern backend roles requiring cloud deployment and DevOps knowledge",
    "sources": ["aws_context.txt", "aws_skills.txt"]
  }
}
```

> ℹ️ **RAG embeddings are disabled by default to avoid API costs.** All RAG logic has a mock fallback mode, ensuring the system remains fully functional without paid embeddings. The infrastructure is complete and can be enabled by setting `ENABLE_EMBEDDINGS=true` in `.env`.

---

### ✅ Phase 6.2: JD-Aware Dynamic Skill Weighting
**Status:** Complete (mock mode)

Replaces static skill weights with data-driven importance derived from job description analysis.

**How it works:**
1. Retrieves similar job descriptions from the dataset
2. Analyzes skill frequency across relevant JDs
3. Classifies skills as Core, Secondary, or Optional
4. Dynamically adjusts scoring weights

**Integration points:**
- `services/skills/analyzeSkills.js` — Skill analysis engine
- `services/skills/weightResolver.js` — Weight calculation
- `services/rag/jdImportance/` — JD retrieval and analysis

🧪 **Current mode:** Mock retrieval (no API costs). Real embeddings can be enabled with `ENABLE_EMBEDDINGS=true`.

---

### ✅ Phase 6.3: ATS Behavior Simulation
**Status:** Complete

Simulates real-world Applicant Tracking System (ATS) behavior to predict resume screening outcomes and provide actionable optimization feedback.

**Capabilities:**
- ATS pass/reject decision
- Core vs secondary skill classification
- JD-aware keyword importance
- ATS rejection reasoning
- Improvement suggestions for ranking

**How it works:**
1. Resume skills are analyzed deterministically
2. JD-aware skill importance is derived (Phase 6.2)
3. Missing skills are categorized:
   - Core (hard rejection)
   - Secondary (ranking penalty)
4. ATS decision and reasoning are generated
5. Optimization suggestions are returned for missing keywords

**Endpoint:** `POST /analyze/ats/evaluate`

**Sample Request:**
```json
{
  "jobDescription": "Backend Engineer with AWS, Docker, and Kubernetes",
  "resumeText": "Node.js backend developer with MongoDB experience"
}
```

**Sample Response:**
```json
{
  "success": true,
  "result": {
    "ats_decision": "REJECT",
    "ats_reason": "Missing important ATS keywords",
    "missing_core_skills": [],
    "missing_secondary_skills": ["AWS", "Docker", "Kubernetes"],
    "suggestions": [
      "Add AWS cloud experience to improve keyword matching",
      "Include Docker containerization projects",
      "Mention Kubernetes orchestration skills"
    ]
  }
}
```

---

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (or Gemini API key)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# LLM Providers (at least one required)
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here

# RAG Settings (optional)
ENABLE_EMBEDDINGS=false  # Set to 'true' to enable RAG with embeddings
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`.

---

## 🧪 API Testing

### Using cURL

**Resume Analysis:**
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Backend Engineer with Node.js and AWS",
    "resumeText": "Experienced developer with Node.js skills"
  }'
```

**Learning Roadmap:**
```bash
curl -X POST http://localhost:5000/analyze/roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "missing_skills": ["AWS", "Docker"],
    "role": "Backend Engineer"
  }'
```

**Skill Knowledge:**
```bash
curl -X POST http://localhost:5000/analyze/skill-knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "skill": "AWS"
  }'
```

**ATS Simulation:**
```bash
curl -X POST http://localhost:5000/analyze/ats/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Backend Engineer with AWS and Docker",
    "resumeText": "Node.js backend developer with MongoDB experience"
  }'
```

### Using Postman

Import the following endpoints:
- `POST /analyze` — Resume analysis
- `POST /analyze/roadmap` — Learning roadmap
- `POST /analyze/skill-knowledge` — Skill knowledge base
- `POST /analyze/ats/evaluate` — ATS simulation

---

## 🎯 Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Separation of Concerns** | Router → Controller → Service → Engine layering |
| **Deterministic First** | Rule-based scoring before LLM augmentation |
| **LLM as Assistant** | AI provides explanations, not authoritative decisions |
| **RAG Isolation** | Embeddings toggleable without code changes |
| **Phase-Based Evolution** | Incremental feature rollout with stable core |
| **Cost Awareness** | Mock modes available for expensive operations |

---

## 🔧 Development

### Adding New Skills

Edit `services/skills/partialMatchMap.js` to add skill synonyms:

```javascript
const partialMatchMap = {
  "react": ["reactjs", "react.js"],
  "node": ["nodejs", "node.js"],
  // Add your mappings here
};
```

### Extending the Knowledge Base

Add new skill documents to `data/rag/[skill-name]/`:
- `[skill]_context.txt` — General overview
- `[skill]_skills.txt` — Technical details
- `[skill]_projects.txt` — Project ideas

### Customizing Skill Weights

Modify `services/skills/skillWeights.js`:

```javascript
const skillWeights = {
  "Node.js": 10,
  "AWS": 9,
  "Docker": 8,
  // Adjust weights (1-10 scale)
};
```

---

## 📊 Current Status

| Feature | Status |
|---------|--------|
| Core Resume Analysis | ✅ Complete |
| LLM Explanations | ✅ Complete |
| Learning Roadmaps | ✅ Complete |
| RAG Infrastructure | ✅ Ready (billing-gated) |
| Dynamic Skill Weighting | ✅ Complete (mock mode) |
| ATS Simulation | ✅ Complete |
| Frontend Integration | 🟡 In Progress |

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Google for Gemini API
- LangChain community for RAG patterns

---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ for better job matching**