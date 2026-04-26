# 🎨 Design System - NAIA Storytelling

Este documento define os padrões visuais e métricas do projeto Frontend (NAIA). Nosso objetivo é um visual **High-Tech, Premium, Mistico e Focado no Usuário (Dark Mode First)**, ideal para uma plataforma de IA.

Todas essas definições estão automaticamente integradas no arquivo `tailwind.config.js`. Use apenas as classes documentadas aqui para manter a coesão.

---

## 1. 🌈 Paleta de Cores (Colors)

O Tema é estritamente baseado em Dark Mode, com brilhos (glows) interativos. Evite "branco puro" (usaremos off-white/grafite claro).

### **Backgrounds (Superfícies Escuras)**
- **`bg-background` (Dark Base):** `#09090b` (Quase preto, fundo principal)
- **`bg-surface` (Containers/Cards):** `#18181b` (Cinza muito escuro, para os cards visíveis)
- **`bg-surface-light` (Hover de Cards):** `#27272a` (Cinza ligeiramente mais claro)

### **Textos (Tipografia)**
- **`text-primary` (Títulos e ênfase):** `#f8fafc` (Branco gelo)
- **`text-secondary` (Textos longos e parágrafos):** `#a1a1aa` (Cinza suave para dar descanso aos olhos)
- **`text-muted` (Dicas informativas e desabilitados):** `#52525b` 

### **Acentos (Marcas e Destaques Místicos)**
Usamos uma variação de Cyan (Neon) e Roxo (Magia/Mistério):
- **`text-accent` / `bg-accent` (Ação/Botões primários):** `#06b6d4` (Cyan)
- **`text-accent-hover` / `bg-accent-hover`:** `#0891b2` (Cyan escuro)
- **`text-magic` / `bg-magic` (Ações relacionadas à IA do Gemini):** `#8b5cf6` (Roxo Vibrante)
- **`ring-magic` / `shadow-magic`:** Usado para criar aura ao preencher campos ou interagir com IA.

---

## 2. 🔠 Tipografia (Fontes)

O sistema utiliza fontes modernas do Google Fonts (`Inter` e `Outfit`).

### **Famílias de Fontes**
- **Sans (Padrão/Textos):** `'Inter', sans-serif` -> Usado em descrições, modais e botões. (Classe padrão)
- **Display (Títulos/Hero):** `'Outfit', sans-serif` -> Apenas para títulos H1..H3 (Chama atenção). Use a classe `font-display`.

### **Tamanhos e Pesos Cadenciados**
Use as classes nativas do Tailwind, que variam de `text-xs` a `text-6xl`.
- Para títulos de Card: `text-lg font-bold font-display`
- Para texto gerado pela IA (Histórias): `text-base leading-relaxed text-secondary`

---

## 3. 📐 Espaçamento e Layout (Sizes)

Nós limitamos as dimensões principais para uma fluidez ágil em telas Ultra-Wide e Mobile.

### **Paddings Internos Padrão (Containers e Cards)**
- **Secção Inteira:** `py-16 px-4 sm:px-8`
- **Card Interno / Modal:** `p-6` ou `p-8`
- **Botões Grandes:** `px-6 py-3`
- **Botões Pequenos/Tags:** `px-3 py-1.5`

### **Bordas e Arredondamento (Border Radius)**
Design suave requer bordas arredondadas moderadas para não parecer "brinquedo", mas evitar caixas rígidas:
- **Padrão dos Cards/Inputs (Moderado):** `rounded-xl`
- **Superfícies Maiores (Modais grandes):** `rounded-2xl`
- **Botões Principais:** `rounded-lg` (Para manter um aspecto moderno e interativo).

---

## 4. 🪟 Transições e Animações (Motion/Glass)

Nós implementamos o efeito "Glassmorphism" sutil e animações responsivas de Micro-Interações nos botões.

### **Comportamento Interativo (Hover)**
- Sempre adicione transição suave aos elementos passíveis de clique:
  **Classe base de clique:** `transition-all duration-300 ease-out`
- **Em botões:** Combine `hover:-translate-y-1 hover:shadow-lg` para que "flutuem" de encontro ao mouse do usuário.
- **Micro-Opacidade:** Utilize `hover:bg-opacity-80` sobre as cores sólidas.

### **Efeito Glass (Glassmorphism)**
Para criar modais que fluem com o background:
**Classe customizada:** `backdrop-blur-md bg-surface/60 border border-white/5`

---

## 🛠️ Exemplo de Uso de Componente Padrão

**Botão Primário (Ação IA):**
```jsx
<button className="px-6 py-3 bg-magic text-primary rounded-lg font-medium transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
  Gerar História ✦
</button>
```

**Card de Formulário / Superfície de Leitura:**
```jsx
<div className="p-8 bg-surface rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
  <h2 className="font-display text-2xl text-primary mb-2">Bem-vindo ao NAIA</h2>
  <p className="text-secondary leading-relaxed mb-6">
    Comece sua jornada criando um conto único...
  </p>
  ...
</div>
```
