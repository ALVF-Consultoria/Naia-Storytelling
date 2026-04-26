export const INITIAL_FORM_DATA = {
  protagonistName: '',
  protagonistDescription: '',
  protagonistGoal: '',
  antagonistNature: '',
  conflictStartingPoint: '',
  settingLocation: '',
  settingTime: '',
  settingTone: '',
  plotObstacle: '',
  plotClimax: '',
  themeMessage: '',
  visualStyle: 'Cinematográfico', // Estilo padrão
  storyLanguage: 'Portuguese', // Default to Portuguese per user context
};

export const visualStyles = [
  { id: 'Cinematográfico', label: 'Cinematográfico', icon: '🎬', description: 'Cenas épicas e iluminação dramática.' },
  { id: 'Anime', label: 'Anime', icon: '🇯🇵', description: 'Estilo clássico de animação japonesa.' },
  { id: 'Cyberpunk', label: 'Cyberpunk', icon: '🧬', description: 'Neon, tecnologia e ambiente futurista.' },
  { id: 'Aquarela', label: 'Aquarela', icon: '🎨', description: 'Traços suaves e cores fluidas.' },
  { id: 'Realista', label: 'Realista', icon: '📸', description: 'Como uma fotografia de alta definição.' },
  { id: 'Épico/Fantasia', label: 'Épico/Fantasia', icon: '⚔️', description: 'Ilustrações de livros de fantasia clássica.' },
];

export const stepsConfig = [
  {
    id: 'protagonist',
    title: "Protagonista",
    iconName: "User",
    description: "Defina o herói da sua história e o que ele busca.",
    fields: [
      { id: 'protagonistName', label: 'Nome do Protagonista', type: 'text', placeholder: 'Ex: Arthur' },
      { id: 'protagonistDescription', label: 'Descrição do Protagonista', type: 'textarea', placeholder: 'Ex: Um jovem ferreiro com um coração inocente.' },
      { id: 'protagonistGoal', label: 'Objetivo Principal', type: 'text', placeholder: 'Ex: Recuperar a espada mágica roubada.' },
    ],
  },
  {
    id: 'antagonist',
    title: "Antagonista e Conflito",
    iconName: "Zap",
    description: "Quem ou o que se opõe ao seu herói e como a ação começa.",
    fields: [
      { id: 'antagonistNature', label: 'Natureza do Antagonista', type: 'textarea', placeholder: 'Ex: A Rainha das Trevas, consumida pela inveja.' },
      { id: 'conflictStartingPoint', label: 'Ponto de Partida do Conflito', type: 'text', placeholder: 'Ex: Ele recebe uma carta misteriosa em um dia chuvoso.' },
    ],
  },
  {
    id: 'setting',
    title: "Cenário e Atmosfera",
    iconName: "Globe",
    description: "Onde e quando a história se passa e o tom emocional.",
    fields: [
      { id: 'settingLocation', label: 'Localização', type: 'text', placeholder: 'Ex: Reino de Eldoria' },
      { id: 'settingTime', label: 'Época (ano)', type: 'number', placeholder: 'Ex: 1423' },
      { id: 'settingTone', label: 'Tom e Atmosfera', type: 'text', placeholder: 'Ex: Melancólico, com toques de esperança.' },
      { id: 'storyLanguage', label: 'Idioma da História', type: 'text', placeholder: 'Ex: Português, Inglês, Espanhol...' },
    ],
  },
  {
    id: 'plot',
    title: "Enredo e Clímax",
    iconName: "BookOpen",
    description: "O maior desafio e o confronto final.",
    fields: [
      { id: 'plotObstacle', label: 'O Maior Obstáculo', type: 'textarea', placeholder: 'Ex: Ser capturado e ter que escapar de uma masmorra flutuante.' },
      { id: 'plotClimax', label: 'Ação do Clímax', type: 'text', placeholder: 'Ex: Duelo mágico final no topo da torre do Antagonista.' },
    ],
  },
  {
    id: 'theme',
    title: "Tema e Mensagem",
    iconName: "MessageSquare",
    description: "A essência e o significado da sua narrativa.",
    fields: [
      { id: 'themeMessage', label: 'Mensagem Central / Tema', type: 'textarea', placeholder: 'Ex: A verdadeira força reside na bondade.' },
    ],
  },
  {
    id: 'visualStyle',
    title: "Estilo Visual",
    iconName: "Zap",
    description: "Escolha o estilo artístico para as ilustrações da sua história.",
    fields: [
      { id: 'visualStyle', label: 'Estilo Visual', type: 'visual_selector' },
    ],
  },
];
