# 🧠 Análise do Projeto NAIA

Este documento fornece uma análise detalhada das funcionalidades e da arquitetura do projeto **NAIA**, uma plataforma avançada de escrita criativa e narrativa assistida por inteligência artificial.

---

## 🌟 Visão Geral

O **NAIA** (sigla para *Narrative Artificial Intelligence Assistant*) é um "Oráculo de Histórias" projetado para transformar conceitos abstratos em narrativas estruturadas. O projeto utiliza a **API do Gemini** do Google para gerar conteúdo de alta qualidade em tempo real.

O diferencial do projeto não é apenas a geração de texto, mas a **experiência imersiva** que combina design moderno, animações fluidas e elementos 3D para criar um ambiente inspirador para escritores e entusiastas.

---

## ✨ Funcionalidades Principais

### 1. 🧠 Motor de Criação com IA
- **Geração Dinâmica:** Utiliza a API do Gemini para criar títulos, sinopses e 5 capítulos completos a partir de um prompt estruturado, com schema JSON forçado para garantir consistência da saída.
- **Tradução de Histórias:** Histórias salvas podem ser clonadas e traduzidas para outro idioma sob demanda, preservando as imagens originais.
- **Estruturação Automática:** A saída da IA é processada e organizada em um formato de fácil leitura, separando elementos narrativos.

### 2. 🎭 Experiência Visual e Interativa
- **Scrollytelling:** Implementação de animações baseadas no scroll (rolagem) utilizando **GSAP ScrollTrigger**, onde elementos visuais interagem com a navegação do usuário.
- **Integração 3D:** Uso de **React Three Fiber (Three.js)** para renderizar objetos 3D, como orbes brilhantes e livros flutuantes, aumentando a imersão.
- **Micro-animações:** Feedback visual constante via **Framer Motion** para transições de estado e interações de botão.

### 3. 📖 Visualização de Histórias (Flipbook)
- **Modo Leitura:** Uma interface dedicada que simula um livro real (Flipbook), permitindo "folhear" as histórias geradas.
- **Biblioteca Pessoal:** Sessão de histórico onde todas as narrativas criadas são armazenadas e podem ser revisitadas.

### 4. 🌍 Internacionalização (i18n)
- **Suporte Multilíngue:** Tradução completa da interface para **Português (Brasil)** e **Inglês**, utilizando a biblioteca `i18next`.
- **Adaptação Cultural:** Não apenas o texto, mas a lógica de exibição é adaptada para o idioma selecionado.

### 5. 🗄️ Persistência de Dados (MySQL + TypeORM)
- **Banco Relacional:** MySQL gerenciado para armazenamento das histórias e usuários. Em desenvolvimento local, pode-se usar Docker Compose para subir o banco rapidamente.
- **ORM Tipado:** TypeORM com entidades `User` e `Story`; `chapters` armazenado como coluna JSON, evitando tabela separada e facilitando a evolução do schema.

### 6. 💻 Backend Robusto
- **API REST:** Servidor Express 5 com TypeScript, separado do frontend. Em produção, roda em subdomínio próprio (`apistorytellingnaia.alvf.net.br`) enquanto o frontend é servido em outro subdomínio (`storytellingnaia.alvf.net.br`).
- **Autenticação JWT:** Registro e login de usuários com tokens JWT; middleware de autenticação protege todas as rotas de histórias.
- **Proteção de Credenciais:** A chave da API do Gemini fica exclusivamente no backend, nunca exposta ao browser.

---

## 🏗️ Análise Técnica (Tech Stack)

### **Frontend**
- **Framework:** React.js com Vite (para carregamento ultra-rápido).
- **Estilização:** Tailwind CSS (design responsivo e utilitário).
- **Estado:** React Context API para gerenciamento de temas e dados globais.
- **Gráficos:** Three.js + React Three Fiber + Drei.
- **Animação:** GSAP (GreenSock) para complexidade de linha do tempo e Framer Motion para componentes.

### **Backend**
- **Runtime:** Node.js + Express 5 + TypeScript.
- **ORM / Banco:** TypeORM + MySQL.
- **Autenticação:** JWT (jsonwebtoken) + bcryptjs para hash de senhas.
- **Integração AI:** SDK oficial do Google Generative AI (`@google/generative-ai`).
- **Segurança:** CORS com whitelist de origens, Dotenv para isolamento de credenciais.

---

## 🚀 Conclusão

O projeto NAIA destaca-se pela sua **excelência estética** e **integração tecnológica**. Ele vai além de um simples chatbot de IA, oferecendo uma ferramenta de produtividade criativa completa, embalada em uma interface premium que utiliza as tecnologias mais modernas do ecossistema Web atual.

---
*Análise gerada automaticamente por Antigravity AI.*
