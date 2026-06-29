# Deploy Manual — Hostinger

Guia para publicar o backend e o frontend da NAIA nos subdomínios da Hostinger.

## Arquitetura de produção

| Camada | URL | O que sobe |
|--------|-----|------------|
| Frontend | `https://storytellingnaia.alvf.net.br` | `frontend/dist/` (Vite build) |
| Backend | `https://apistorytellingnaia.alvf.net.br` | pasta `api/` (código Node.js) |
| Banco | interno Hostinger | MySQL gerenciado |

---

## Backend — pasta `api/`

### O que deve estar na pasta `api/` antes do upload

```
api/
├── src/                        # Todo o código-fonte
│   ├── app.ts
│   ├── server.ts
│   ├── config/data-source.ts
│   ├── controllers/
│   ├── entities/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── scripts/
│   └── services/
├── package.json
├── package-lock.json
└── tsconfig.json
```

### O que NÃO incluir no upload

- `node_modules/` — rodar `npm install` no servidor após o upload
- `.env` — configurar manualmente no painel da Hostinger ou via SSH
- `api.zip` — artefato temporário, não commitar

### Passos para atualizar o backend

1. **Sincronizar com `backend/`** — copiar as alterações de `backend/src/` para `api/src/`, e atualizar `package.json`/`tsconfig.json` se houver mudanças.

2. **Gerar o `.zip`** para upload:
   ```bash
   # Na raiz do projeto
   Compress-Archive -Path api\* -DestinationPath api.zip -Force
   ```
   ou no bash:
   ```bash
   zip -r api.zip api/ --exclude "api/node_modules/*"
   ```

3. **Fazer upload** do `.zip` no File Manager da Hostinger no diretório do subdomínio `apistorytellingnaia.alvf.net.br` e extrair.

4. **Via SSH**, instalar dependências:
   ```bash
   cd ~/domains/apistorytellingnaia.alvf.net.br/public_html
   npm install --omit=dev
   ```

5. **Configurar o `.env`** no servidor (via SSH ou painel):
   ```env
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://storytellingnaia.alvf.net.br

   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha_mysql
   DB_NAME=naia_storytell

   JWT_SECRET=chave_secreta_longa_e_aleatoria

   GEMINI_API_KEY=sua_chave_gemini
   STORY_MODEL=gemini-2.5-flash

   ENABLE_IMAGE_GENERATION=false
   ```

6. **Reiniciar o processo Node.js** via painel da Hostinger ou PM2:
   ```bash
   pm2 restart naia-api
   # ou, para primeira vez:
   pm2 start npm --name "naia-api" -- start
   ```

---

## Frontend — `frontend/dist/`

### Passos para atualizar o frontend

1. **Verificar o `frontend/.env.production`**:
   ```env
   API_URL=https://apistorytellingnaia.alvf.net.br
   ```

2. **Gerar o build de produção**:
   ```bash
   cd frontend
   npm run build
   ```
   O Vite gera os arquivos estáticos em `frontend/dist/`.

3. **Fazer upload do conteúdo de `dist/`** para o diretório público do subdomínio `storytellingnaia.alvf.net.br` no File Manager da Hostinger.

4. **Verificar o `.htaccess`** (necessário para SPA com React Router). Se não existir, criar em `dist/.htaccess`:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

---

## Checklist de deploy

- [ ] `api/` está sincronizado com `backend/` (sem alterações pendentes)
- [ ] `.env` de produção configurado no servidor do backend
- [ ] `frontend/.env.production` aponta para a URL correta da API
- [ ] Build do frontend gerado com `npm run build`
- [ ] `dist/` enviado para o subdomínio do frontend
- [ ] `.htaccess` presente na raiz do frontend para suporte ao React Router
- [ ] Processo Node.js reiniciado no backend
- [ ] Testar login, geração de história e visualização no flipbook em produção
