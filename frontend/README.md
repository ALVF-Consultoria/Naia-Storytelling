# NAIA — Frontend

Interface da plataforma NAIA. SPA em React que oferece dois modos de criação de histórias (formulário em etapas ou chat), visualização em flipbook, exportação PDF e biblioteca pessoal.

## Stack

- **Framework:** React 19 + Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router v7
- **3D / Animação:** Three.js + React Three Fiber + Drei + GSAP + Framer Motion
- **i18n:** i18next (PT-BR e EN, strings inline em `src/i18n.js`)
- **PDF:** jsPDF
- **Flipbook:** react-pageflip

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento (http://localhost:5173)
npm run build    # Build de produção (lê .env.production para API_URL)
npm run preview  # Preview do build de produção localmente
npm run lint     # ESLint
```

## Variáveis de ambiente

| Arquivo | Usado quando |
|---------|-------------|
| `frontend/.env` | Desenvolvimento local |
| `frontend/.env.production` | Build de produção |

Conteúdo mínimo:

```env
API_URL=http://localhost:3000
```

> O Vite expõe variáveis com prefixo `API_` e `VITE_` ao browser (`envPrefix` configurado em `vite.config.js`).

## Estrutura

```
src/
├── App.jsx             # Providers e rotas raiz
├── main.jsx            # Entry point
├── i18n.js             # Configuração i18next + strings PT/EN
├── context/
│   ├── StoryProvider   # Estado global da história (formData, chapters, etc.)
│   ├── AuthProvider    # JWT token, login/logout, validação via /api/auth/me
│   └── ThemeProvider   # Tema claro/escuro (persistido em localStorage)
├── hooks/              # useStory, useAuth, useTheme
├── pages/              # Componentes de rota (Home, Login, CreateHistory, Flipbook, etc.)
├── components/         # Componentes reutilizáveis de UI
├── services/
│   └── promptAPI.js    # Wrapper fetch para POST /api/generate
├── utils/
│   ├── buildStoryPrompt.js  # Monta a string de prompt a partir de formData
│   └── exportStoryToPDF.js  # Exportação via jsPDF
├── constants/
│   └── storySteps.js   # Define os 12 campos e a ordem dos passos do formulário
└── routers/            # Definição das rotas protegidas e públicas
```

## Rotas

| Caminho | Componente | Acesso |
|---------|------------|--------|
| `/` | `Home` | Público |
| `/login` | `Login` | Público |
| `/register` | `Register` | Público |
| `/create-history` | `CreateHistory` | Autenticado |
| `/chat` | `Chat` | Autenticado |
| `/history-view` | `HistoryView` | Autenticado |
| `/flipbook` | `FlipbookPage` | Autenticado |
| `/stories-page` | `StoriesPage` | Autenticado |

## Fluxo de criação de história

1. Usuário preenche os 12 campos via formulário (`/create-history`) ou chat (`/chat`).
2. `buildStoryPrompt.js` monta o prompt a partir de `formData`.
3. `promptAPI.js` envia `POST /api/generate` com `{ prompt, visualStyle }`.
4. A resposta é armazenada no `StoryContext` e o usuário é redirecionado para `/history-view` ou `/flipbook`.
