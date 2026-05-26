# NAIA Storytelling — Architecture & Technical Reference

## Product Summary

NAIA is an AI-driven storytelling platform that turns a structured creative brief into a fully rendered 5-chapter narrative. Users compose their story either through a step-by-step wizard form or via a conversational chat interface that guides them through the same fields. The generated output is presented as an interactive flipbook, a scroll reader, or a downloadable PDF. Stories are persisted per user and can be translated between languages on demand.

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                          │
│                                                                │
│   React SPA (Vite)                                             │
│   ├── Auth flow          (JWT → localStorage)                  │
│   ├── Story wizard       (6-step form)                         │
│   ├── Chat interface     (mirrors wizard fields)               │
│   ├── Flipbook viewer    (react-pageflip + Three.js)           │
│   └── PDF export         (jsPDF)                               │
└──────────────────────────────┬─────────────────────────────────┘
                               │ HTTPS + JWT Bearer
                               │ API_URL = https://apistorytellingnaia.alvf.net.br
                               ▼
┌────────────────────────────────────────────────────────────────┐
│                    BACKEND  (Node.js / Express 5)              │
│                                                                │
│   app.ts                                                       │
│   ├── CORS (origin whitelist + preflight OPTIONS handler)      │
│   ├── /api/auth     → AuthController → AuthService             │
│   └── /api         → StoryController → StoryService           │
│                              │                                 │
│                              ├── GeminiService                 │
│                              │    └── Google Gemini 2.5 Flash  │
│                              │        (structured JSON schema) │
│                              ├── ImagenService (optional)      │
│                              │    └── Imagen API (disabled)    │
│                              └── StoryRepository / UserRepo    │
│                                   └── TypeORM + MySQL          │
└────────────────────────────────────────────────────────────────┘
```

### Deployment Topology (Hostinger)

| Layer | URL | Technology |
|---|---|---|
| Frontend | `https://storytellingnaia.alvf.net.br` | Apache/Nginx serving Vite `dist/` |
| Backend API | `https://apistorytellingnaia.alvf.net.br` | Node.js (Passenger or PM2) |
| Database | Internal | MySQL (Hostinger managed) |

---

## Backend

**Stack:** Express 5, TypeScript, TypeORM, MySQL, bcryptjs, jsonwebtoken, `@google/generative-ai`

### Layer Responsibilities

| Layer | Files | Responsibility |
|---|---|---|
| Entry | `server.ts` | Load env, initialize TypeORM DataSource, start HTTP server |
| App config | `app.ts` | CORS, middleware order, route mounting, SPA fallback |
| Routes | `auth.routes.ts`, `story.routes.ts` | URL → controller mapping |
| Controllers | `AuthController`, `StoryController` | Parse request, call service, send response |
| Services | `AuthService`, `StoryService`, `GeminiService`, `ImagenService` | Business logic and external API calls |
| Repositories | `StoryRepository`, `UserRepository` | TypeORM query wrappers |
| Entities | `User`, `Story` | DB schema (auto-synced on startup) |
| Middleware | `auth.middleware.ts` | JWT verification, attaches `req.user` |

### API Endpoints

**Auth** (prefix: `/api/auth`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | — | Create user account |
| POST | `/login` | — | Returns JWT token |
| GET | `/me` | ✓ | Returns current user |
| DELETE | `/account` | ✓ | Deletes account and all stories |

**Stories** (prefix: `/api`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/generate` | ✓ | Generate story from prompt |
| GET | `/stories` | ✓ | List user's stories |
| POST | `/stories/:id/translate` | ✓ | Clone and translate story |
| DELETE | `/stories/:id` | ✓ | Delete story |

### Story Generation Pipeline

```
POST /api/generate
  { prompt, visualStyle }
       │
       ▼
  GeminiService.generateStructuredStory()
    → Enforces JSON schema: { title, synopsis, chapters[5] }
    → Fallback 1: regex chapter split on "Capítulo N"
    → Fallback 2: paragraph split
       │
       ▼
  StoryRepository.save() ← initial save to get story ID
       │
       ▼
  GeminiService.optimizeImagePromptsBatch()
    → Generates English image prompts for all 5 chapters in one call
       │
       ▼
  ImagenService.generateImage() × 5  ← only if ENABLE_IMAGE_GENERATION=true
    → Saves JPEGs to backend/public/uploads/stories/
       │
       ▼
  StoryRepository.save() ← update with chapters + imageUrls
       │
       ▼
  Return { storyId, title, synopsis, chapters[] }
```

### Data Model

**User**
```
id, username (unique), email (unique), password (bcrypt), createdAt
```

**Story**
```
id, prompt, title, synopsis, visualStyle, chapters (JSON), content (JSON string),
createdAt, user (FK → User, CASCADE DELETE)
```

`chapters` is a JSON column storing an array of `{ chapterNumber, title, content, imageUrl }`.

---

## Frontend

**Stack:** React 18, Vite, Tailwind CSS, React Router v6, i18next, Three.js / @react-three/fiber, Framer Motion, react-pageflip, jsPDF

### State Architecture

All state flows through three React Contexts:

```
<ThemeProvider>       ← dark/light theme, persisted to localStorage
  <AuthProvider>      ← JWT token, user object, login/register/logout
    <StoryProvider>   ← formData, storyTitle, storyChapters, storySynopsis, isGenerating
      <Router />
```

`StoryContext` is the cross-page store. Pages write to it on generation and read from it on display. Navigating `/create-history → /history-view → /flipbook` all share the same story object without URL params.

### Routing

| Path | Component | Auth |
|---|---|---|
| `/` | `Home` | Public |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/create-history` | `CreateHistory` | Protected |
| `/chat` | `Chat` | Protected |
| `/history-view` | `HistoryView` | Protected |
| `/flipbook` | `FlipbookPage` | Protected |
| `/stories-page` | `StoriesPage` | Protected |

### Story Input: Two Paths, One Schema

Both creation modes collect the same 12 fields defined in `src/constants/storySteps.js`:

| Field | Step |
|---|---|
| `protagonistName`, `protagonistDescription`, `protagonistGoal` | Protagonist |
| `antagonistNature`, `conflictStartingPoint` | Antagonist |
| `settingLocation`, `settingTime`, `settingTone`, `storyLanguage` | Setting |
| `plotObstacle`, `plotClimax` | Plot |
| `themeMessage` | Theme |
| `visualStyle` | Visual Style |

- **Form path** (`/create-history`): `StoryForm` component renders each step as a wizard page using `stepsConfig`.
- **Chat path** (`/chat`): `StoryChat` steps through the same field order, maps each user message to the corresponding `formData` key, then calls `buildStoryPrompt()` and `promptAPI()`.

`buildStoryPrompt()` (`src/utils/buildStoryPrompt.js`) assembles the final prompt string from `formData` before any API call.

### Environment & API URL

`vite.config.js` sets `envPrefix: ['VITE_', 'API_']`, exposing `API_URL` to the browser.

```
frontend/.env            → API_URL=http://localhost:3000        (dev)
frontend/.env.production → API_URL=https://apistorytellingnaia.alvf.net.br (prod build)
```

All fetch calls use `const API_BASE_URL = import.meta.env.API_URL || ""`.

### Internationalisation

`src/i18n.js` contains all PT and EN strings inline (no separate locale files). Language is detected from `localStorage` → browser navigator, with `en` as fallback. Use `useTranslation()` hook for all user-facing text.

---

## CORS Configuration

The backend uses a whitelist-based CORS setup in `app.ts`:

```typescript
// Explicit preflight handler — must come first
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
```

The origin whitelist is built from:
- `process.env.FRONTEND_URL` (set per environment)
- `http://localhost:5173` (dev)
- `https://storytellingnaia.alvf.net.br` (hardcoded fallback)
- `https://apistorytellingnaia.alvf.net.br`

All routes require `credentials: true` on both CORS config and fetch calls (`credentials: 'include'`).

---

## Key Technical Decisions

| Decision | Rationale |
|---|---|
| `synchronize: true` in TypeORM | Intended for active development. Must be set to `false` before any production deployment where data persistence matters. |
| Gemini structured JSON output | `responseMimeType: "application/json"` + `responseSchema` enforces chapter structure. Two regex fallback layers handle model deviations. |
| Image generation disabled by default | `ENABLE_IMAGE_GENERATION=false` in `.env`. The ImagenService is wired but not called unless explicitly enabled. |
| `chapters` stored as JSON column | Avoids a separate `chapters` table. Enables flexible schema evolution without migrations. |
| Translation creates a new story | `translateStory()` clones the original record rather than overwriting it. Original image URLs are preserved in the translation. |
| `API_` prefix in Vite envPrefix | Allows using `API_URL` instead of `VITE_API_URL` as the env variable name. Intentional custom config. |
