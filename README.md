# 🧠 NAIA
### *The Story Oracle – Where ideas become stories.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AI](https://img.shields.io/badge/AI-Gemini_API-blue?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🌟 Overview

**NAIA** is a fullstack AI-powered creative writing platform. It turns concepts into structured narratives, acting as an intelligent oracle for writers, RPG players, and creators. Stories are generated via the **Gemini API**, organized into 5 chapters, and presented as an interactive flipbook, scroll reader, or downloadable PDF.

This version features a **fully immersive, localized, and animated experience**, leveraging modern web technologies like GSAP and Three.js for visual storytelling.

> “The NAIA framework offers a dashboard for the beginning of stories — an oracle of imagination.”

---

## ✨ Key Features

### 🚀 **Visual Experience**
- **Scrollytelling Animations**: A floating logo travels across the interface, interacting with 3D elements as you scroll.
- **3D Integrations**: Interactive glowing orbs and floating 3D books powered by Three.js/React Three Fiber.
- **Modern UI**: Glassmorphism, dynamic gradients, and a robust Dark/Light theme system.

### 🧠 **Intelligent Creative Engine**
- **Powered by the Gemini API**: Fast, structured story generation with enforced JSON schema output.
- **Structured Storytelling**: Automatically organizes outputs into title, chapters, and synopsis.
- **Story Translation**: Clone and translate any saved story into another language on demand.

### 📖 **Reading & Export**
- **Flipbook Viewer**: Page-turning animation to read stories like a real book.
- **PDF Export**: Download any story as a formatted PDF.
- **Personal Library**: All generated stories are saved per user and accessible anytime.

### 🌍 **Accessible & Localized**
- **Multi-language Support**: Full English and Portuguese (PT-BR) support via `i18next`.
- **Responsive Design**: Optimized for everything from mobile phones to 4K desktops.

---

## 🏗️ Tech Stack

**Frontend**
🔹 React 19 + Vite + Tailwind CSS
🔹 Animation: GSAP (ScrollTrigger) + Framer Motion
🔹 3D Graphics: React Three Fiber (R3F) + Drei
🔹 Internationalization: i18next
🔹 State: React Context API

**Backend**
🔹 Node.js + Express 5 + TypeScript
🔹 ORM: TypeORM + MySQL
🔹 Auth: JWT (jsonwebtoken + bcryptjs)
🔹 AI: Gemini API (`@google/generative-ai`)

---

## 🧩 Installation

```bash
# Clone this repository
git clone https://github.com/ALVF-Consultoria/Naia-Storytelling.git
cd Naia-Storytelling
```

### Backend

```bash
cd backend
npm install

# Create backend/.env with the following variables:
# GEMINI_API_KEY=your_api_key_here
# STORY_MODEL=gemini-2.5-flash
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_db_password
# DB_NAME=naia
# JWT_SECRET=your_jwt_secret
# FRONTEND_URL=http://localhost:5173
# NODE_ENV=development

npm run dev
```

### Frontend

```bash
cd frontend
npm install

# Create frontend/.env with:
# API_URL=http://localhost:3000

npm run dev
```

---

## 🇧🇷 Versão em Português

# 🧠 NAIA
### *O Oráculo das Histórias – Onde ideias viram narrativas.*

---

## 🌟 Visão Geral

**NAIA** é uma plataforma fullstack de escrita criativa com IA. Ela transforma conceitos em narrativas estruturadas, atuando como um oráculo inteligente para escritores, jogadores de RPG e criadores de conteúdo. As histórias são geradas pela **API do Gemini**, organizadas em 5 capítulos e apresentadas como flipbook interativo, leitor em scroll ou PDF para download.

Esta versão traz uma experiência **totalmente imersiva, localizada e animada**, utilizando tecnologias web modernas como GSAP e Three.js para contar histórias visualmente.

---

## ✨ Principais Funcionalidades

### 🚀 **Experiência Visual**
- **Animações Scrollytelling**: A logo da NAIA viaja pela tela enquanto você rola a página, interagindo com elementos 3D (órbita, livro).
- **Integração 3D**: Orbes brilhantes e livros 3D flutuantes (Three.js).
- **UI Moderna**: Efeito de vidro (Glassmorphism), gradientes dinâmicos e sistema completo de Tema Claro/Escuro.

### 🧠 **Motor Criativo Inteligente**
- **API do Gemini**: Geração de histórias estruturada com saída em JSON forçada por schema.
- **Narrativa Estruturada**: Organiza automaticamente a saída em título, capítulos e sinopse.
- **Tradução de Histórias**: Clone e traduza qualquer história salva para outro idioma sob demanda.

### 📖 **Leitura e Exportação**
- **Flipbook**: Vire as páginas como num livro real.
- **Exportação PDF**: Baixe qualquer história formatada em PDF.
- **Biblioteca Pessoal**: Todas as histórias geradas são salvas por usuário.

### 🌍 **Acessível e Localizado**
- **Suporte Multilíngue**: Totalmente traduzido para Inglês e Português (PT-BR).
- **Design Responsivo**: Otimizado para celulares e desktops.

---

## 💻 Equipe

👤 **[Cristian Santos]** — Full Stack Developer & Engenheiro de Software
👤 **[Alex Leandro Freitas]** — Gerente de Projeto

---

MIT License | Copyright (c) 2025
