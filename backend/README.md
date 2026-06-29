# NAIA — Backend

API REST da plataforma NAIA. Responsável por autenticação de usuários, geração de histórias via Gemini API e persistência no MySQL.

## Stack

- **Runtime:** Node.js ≥ 18 + TypeScript
- **Framework:** Express 5
- **ORM:** TypeORM + MySQL (mysql2)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **IA:** `@google/generative-ai` (Gemini API)
- **Testes:** Jest + Supertest

## Comandos

```bash
npm run dev       # Desenvolvimento com hot-reload (nodemon + ts-node/esm)
npm run build     # Compila TypeScript → JS
npm start         # Produção (ts-node-esm src/server.ts)
npm test          # Suite de testes Jest
npm run test:cov  # Testes com relatório de cobertura
```

## Variáveis de ambiente

Crie um arquivo `backend/.env` com:

```env
# Gemini API
GEMINI_API_KEY=your_api_key_here
STORY_MODEL=gemini-2.5-flash

# Banco de dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=naia

# Auth
JWT_SECRET=your_jwt_secret

# CORS
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Imagens (desabilitado por padrão)
ENABLE_IMAGE_GENERATION=false
```

## Estrutura

```
src/
├── app.ts              # CORS, middlewares, registro de rotas
├── server.ts           # Inicializa TypeORM DataSource e sobe o servidor
├── config/
│   └── data-source.ts  # Configuração do TypeORM (synchronize: true em dev)
├── entities/           # User, Story (mapeamento das tabelas)
├── repositories/       # Wrappers de query do TypeORM
├── services/           # AuthService, StoryService, GeminiService, ImagenService
├── controllers/        # AuthController, StoryController
├── routes/             # auth.routes.ts, story.routes.ts
└── middleware/
    └── auth.middleware.ts  # Verificação do JWT, injeta req.user
```

## Endpoints principais

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/auth/register` | — | Cria conta |
| POST | `/api/auth/login` | — | Retorna JWT |
| GET | `/api/auth/me` | ✓ | Usuário atual |
| DELETE | `/api/auth/account` | ✓ | Remove conta e histórias |
| POST | `/api/generate` | ✓ | Gera história |
| GET | `/api/stories` | ✓ | Lista histórias do usuário |
| POST | `/api/stories/:id/translate` | ✓ | Clona e traduz história |
| DELETE | `/api/stories/:id` | ✓ | Remove história |

## Observações

- `synchronize: true` no TypeORM cria/altera tabelas automaticamente no startup. Desabilitar antes de qualquer deploy em produção com dados existentes.
- Imagens geradas são salvas em `backend/public/uploads/stories/`.
- `ENABLE_IMAGE_GENERATION=false` por padrão — o ImagenService está integrado mas não é chamado a menos que explicitamente habilitado.
