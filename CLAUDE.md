# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NAIA Storytelling is a fullstack AI-powered story generation platform. Users fill a structured form (or chat with an agent that mimics the same fields) and the backend calls the Gemini API to produce a 5-chapter story with optional AI-generated images. The result is displayed as a flipbook, a scroll reader, or exported to PDF.

## Commands

### Backend (`/backend`)
```bash
npm run dev       # Development with hot-reload via nodemon + ts-node/esm
npm run build     # Compile TypeScript to JS
npm start         # Production (ts-node-esm src/server.ts)
npm test          # Jest test suite
npm run test:cov  # Jest with coverage
```

### Frontend (`/frontend`)
```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # Production build — reads .env.production for API_URL
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

### Running a single test (backend)
```bash
npx jest --testPathPattern="AuthController" --verbose
```

## Architecture

### Monorepo layout
```
naiastorytelling/
├── backend/          # Express 5 + TypeScript + TypeORM + MySQL
│   └── src/
│       ├── app.ts          # CORS, middleware, routes registration
│       ├── server.ts       # DB init, app.listen
│       ├── entities/       # TypeORM entities: User, Story
│       ├── repositories/   # Data access layer
│       ├── services/       # Business logic: AuthService, StoryService, GeminiService, ImagenService
│       ├── controllers/    # Request/response handlers
│       ├── routes/         # auth.routes.ts, story.routes.ts
│       ├── middleware/      # JWT auth (authMiddleware)
│       └── config/         # data-source.ts (TypeORM DataSource)
└── frontend/         # React + Vite + Tailwind + i18next
    └── src/
        ├── context/        # StoryProvider (cross-page story state), AuthProvider (JWT session), ThemeProvider
        ├── hooks/          # useStory, useAuth, useTheme
        ├── pages/          # Route-level components
        ├── components/     # UI components
        ├── services/       # promptAPI.js (fetch wrapper for /api/generate)
        ├── utils/          # buildStoryPrompt.js, exportStoryToPDF.js
        └── constants/      # storySteps.js — defines form fields and step order
```

### Data flow: story generation
1. User fills `storySteps.js` fields (form) or chats with `StoryChat` (which mirrors the same fields).
2. `buildStoryPrompt.js` assembles the prompt string from `formData`.
3. `promptAPI.js` POSTs to `POST /api/generate` with `{ prompt, visualStyle }`.
4. `StoryController → StoryService` calls `GeminiService.generateStructuredStory()`, which enforces a JSON schema response with `{ title, synopsis, chapters[] }`.
5. `StoryService` saves the story, then optionally calls `ImagenService` to generate per-chapter images (controlled by `ENABLE_IMAGE_GENERATION` env var). Images are saved to `backend/public/uploads/stories/`.
6. Response is stored in `StoryContext` (`setFinalStory`) and the user is redirected to `/history-view` or `/flipbook`.

### Auth
JWT-based. Token is stored in `localStorage` under `naia_token`. `authMiddleware` validates the token on every protected route. `AuthProvider` validates the stored token against `GET /api/auth/me` on app mount.

### Frontend state
`StoryContext` is the primary cross-page state store — it holds `formData`, `storyTitle`, `storyChapters`, `storySynopsis`. It lives at the `App` level, wrapping all routes. Pages like `FlipbookPage`, `HistoryView`, and `StoriesPage` all consume this context to access the loaded story.

### Internationalisation
All UI strings go through `i18next` (configured in `src/i18n.js`). Supported languages: `pt` and `en`. Language is auto-detected from `localStorage` → browser navigator. Do not hardcode user-facing strings outside the i18n resources object.

## Environment Variables

### Backend (`backend/.env`)
| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key |
| `STORY_MODEL` | Gemini model (default: `gemini-2.5-flash`) |
| `ENABLE_IMAGE_GENERATION` | `true`/`false` — toggles ImagenService |
| `DB_HOST/PORT/USER/PASSWORD/NAME` | MySQL connection |
| `JWT_SECRET` | JWT signing key |
| `FRONTEND_URL` | Added to CORS allowlist (production: `https://storytellingnaia.alvf.net.br`) |
| `NODE_ENV` | `development` bypasses CORS origin check entirely |

### Frontend
Vite is configured with `envPrefix: ['VITE_', 'API_']`, so both prefixes are exposed to the browser.

| File | Used when |
|---|---|
| `frontend/.env` | Local development (`API_URL=http://localhost:3000`) |
| `frontend/.env.production` | Production build (`API_URL=https://apistorytellingnaia.alvf.net.br`) |

`API_BASE_URL` is read as `import.meta.env.API_URL` across `promptAPI.js`, `AuthProvider.jsx`, and `StoriesPage.jsx`.

## Deployment

**Architecture:** separated subdomains on Hostinger.
- Frontend: `https://storytellingnaia.alvf.net.br` (Apache/Nginx serving the Vite `dist/`)
- Backend: `https://apistorytellingnaia.alvf.net.br` (Node.js)

**Build steps:**
```bash
# 1. Build frontend (uses .env.production automatically)
cd frontend && npm run build

# 2. Upload dist/ to the frontend subdomain public folder

# 3. Ensure backend .env has:
#    FRONTEND_URL=https://storytellingnaia.alvf.net.br
#    NODE_ENV=production
```

**CORS:** `app.options("*", cors(corsOptions))` handles preflight before any route. The origin whitelist is built from `FRONTEND_URL` env var + hardcoded fallbacks.

## TypeORM Note

`synchronize: true` is set in `data-source.ts`. This auto-creates/alters tables on startup and is intentional for the current development phase. Set to `false` and use migrations before any production deployment with existing data.

## GeminiService JSON Fallbacks

`GeminiService.parseAndValidateStory()` has two fallback layers if the model returns malformed JSON:
1. Regex-based chapter splitting on "Capítulo N" headings.
2. Brute-force paragraph splitting.

When modifying the story schema or prompt, verify these fallbacks still handle edge cases.
