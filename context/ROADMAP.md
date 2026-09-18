# Future Roadmap & Project Backlog

This document tracks planned features, architectural improvements, and completed milestones. Update checkboxes as features are completed.

---

## 🔴 High Priority (Must-Have)

### 1. 🔐 Security — Remove Exposed API Keys
- [ ] Remove API keys from `.env` that are committed to git.
- [ ] Add `.env` to `.gitignore` in both frontend and backend.
- [ ] Rotate all exposed API keys.
- [ ] Add `.env.example` templates with placeholder values.

### 2. 📝 DOCX Resume Parsing Support
- [ ] Frontend advertises "PDF or DOCX", but `resumeParser.js` currently only handles PDFs via `pdf-parse`.
- [ ] Add `mammoth` or `docx-parser` to extract text from `.docx` files.
- [ ] Implement file-type routing in `extractResumeText()`.

### 3. 🧠 Expand Skill Dictionary
- [ ] Current `skillExtractor.js` recognizes only **14 skills**.
- [ ] Move skill dictionary to a JSON/YAML file (e.g. `data/skills/skill_dictionary.json`).
- [ ] Expand to 50+ modern skills (Java, Spring Boot, Go, Rust, Django, FastAPI, Next.js, Redis, Kafka, Terraform, etc.).

### 4. 📊 Automated Testing Suite
- [ ] Add Jest test suites for backend services:
  - `skillExtractor.test.js`: Edge cases, false positives, multi-word skills.
  - `skillComparison.test.js`: Exact, partial, and missing detection.
  - `skillScore.test.js`: Weighted calculation math.
  - `atsSimulator.test.js`: ATS threshold rules.
- [ ] Add React Testing Library tests for key frontend components (`ResumeForm`, `ResultCard`).

---

## 🟡 Medium Priority (Good-to-Have)

### 5. 🗄️ Database Integration
- [ ] Replace file-based RAG datasets with PostgreSQL (pgvector) or MongoDB.
- [ ] Store analysis history per candidate/session.
- [ ] Add a `/api/history` endpoint to view past analyses.

### 6. 👤 User Authentication
- [ ] Implement JWT or OAuth (Google) authentication.
- [ ] Allow users to save target jobs, resumes, and track improvement over time.

### 7. 🎯 Role-Aware Analysis
- [ ] Replace hardcoded `"Backend Engineer"` roadmap role with dynamic role selection.
- [ ] Add role selector dropdown on frontend (Frontend, Full-Stack, DevOps, Data Engineer).
- [ ] Load role-specific skill weights and JD corpora.

### 8. 📄 Resume Formatting & Structural Quality Score
- [ ] Evaluate resume structure: header sections, quantified metrics, length, contact information.
- [ ] Introduce a "Resume Quality Score" alongside the Job Match Score.

### 9. 🔄 Real-Time Streaming Analysis
- [ ] Stream results progressively via WebSockets / Server-Sent Events (SSE) as stages complete.
- [ ] Display step-by-step progress indicators on frontend.

### 10. 📊 Analytics Dashboard
- [ ] Admin dashboard showing average match scores, most common skill gaps, and frequent target roles.

---

## 🟢 Low Priority (Nice-to-Have)

- [ ] **Multi-Language Support**: Detect resume language and support multilingual skill extraction.
- [ ] **PDF Report Export**: Generate downloadable summary PDF report using `puppeteer` or `pdfkit`.
- [ ] **LinkedIn Profile Import**: Extract candidate profile directly from public URL.
- [ ] **Comparison Mode**: Side-by-side screening of multiple candidate resumes against one JD.
- [ ] **Docker Compose**: Single-command containerized local setup (`docker-compose.yml`).
- [ ] **CI/CD Pipeline**: GitHub Actions for automated linting, testing, and deployment.

---

## 🏗️ Architecture Improvements

- [ ] **TypeScript Migration**: Migrate backend to TypeScript for compile-time contract safety.
- [ ] **API Validation Layer**: Wire Zod schemas into Express middleware to catch malformed inputs.
- [ ] **Rate Limiting & Caching**: Add `express-rate-limit` and cache repetitive LLM/RAG queries.
- [ ] **Structured Logging**: Replace `console.log` with Pino or Winston.

---

## ✅ Completed Fixes

- [x] Fixed typo `stimulateATS` → `simulateATS` in ATS controller (`atsSimulation.controller.js`).
- [x] Added missing `await` for `runSkillRag()` in skill knowledge controller (`skillKnowledge.controller.js`).
- [x] Made `analyzeSkills()` async and added `await` for `getJDSkillImportance()` (`analyzeSkills.js`).
- [x] Fixed global variable pollution `(options = {})` → `{}` in `analyze.controller.js`.
- [x] Fixed skill extractor false positives using word-boundary regex (`skillExtractor.js`).
- [x] Fixed frontend API response schema mismatch for skill knowledge (`ResultCard.jsx`).
- [x] Fixed case-sensitive import `./pages/Homepage` → `./pages/HomePage` (`App.jsx`).
- [x] Added `onClick` handler for "View Demo" button (`HomePage.jsx`).
- [x] Fixed export name mismatch `resolveSkillsWeights` → `resolveSkillWeights` in `weightResolver.js`.
