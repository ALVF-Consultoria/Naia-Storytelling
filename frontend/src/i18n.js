
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        powered: "Powered by Gemini 2.5 Flash",
        title_prefix: "NAIA",
        title_suffix: "AI",
        subtitle: "Forging infinite worlds from a single spark of imagination.",
        cta_start: "Start Creating 🚀",
        cta_library: "Library 📚",
        features_orbit: "Features Orbit",
        features_orbit_desc: "Everything revolves around your story.",
        why_naia: "Why Naia?",
        vivid_imagery: "Vivid Imagery",
        vivid_imagery_desc: "Our engine describes scenes with such detail you can almost see them.",
        deep_logic: "Deep Logic",
        deep_logic_desc: "Powered by Gemini 2.5, characters remember details and act consistently.",
        instant_speed: "Instant Speed",
        instant_speed_desc: "Generate entire chapters in seconds with our optimized cloud backend.",
        ready_creator: "Ready to become\na",
        creator_highlight: "Creator?",
        launch_studio: "Launch Studio"
      },
      showcase: {
        ai_characters: "AI Characters",
        ai_characters_desc: "Deep personalities & motives",
        world_building: "World Building",
        world_building_desc: "Rich environments & lore",
        plot_twists: "Plot Twists",
        plot_twists_desc: "Unexpected narratives",
        multi_language: "Multi-language",
        multi_language_desc: "Translate instantly",
        export_pdf: "Export to PDF",
        export_pdf_desc: "Publish your story",
        center_core: "Naia Core",
        scroll_hint: "Scroll to Rotate 🖱️"
      },
      book: {
        cover_title: "The Naia Chronicles",
        cover_subtitle: "Open to discover your power",
        page1_title: "Vivid Imagery",
        page1_text: "Our engine describes scenes with such detail you can almost see them.",
        page2_title: "Deep Logic",
        page2_text: "Powered by Gemini 2.5, characters remember details and act consistently.",
        page3_title: "Instant Speed",
        page3_text: "Generate entire chapters in seconds with our optimized cloud backend.",
        back_text: "Start your story now."
      },
      create_story: {
        title: "Create Your Story",
        subtitle: "Develop the pillars of your narrative, step by step.",
        steps: {
          protagonist: "Protagonist",
          protagonist_desc: "Define the hero of your story and what they are seeking.",
          antagonist: "Antagonist & Conflict",
          antagonist_desc: "Who or what opposes your hero and how the action begins.",
          setting: "Setting & Atmosphere",
          setting_desc: "Where and when the story takes place and the emotional tone.",
          plot: "Plot & Climax",
          plot_desc: "The greatest challenge and the final confrontation.",
          theme: "Theme & Message",
          theme_desc: "The essence and meaning of your narrative.",
          visualStyle: "Visual Style",
          visualStyle_desc: "Choose the artistic style for your story illustrations."
        },
        fields: {
          protagonistName: { label: "Protagonist Name", placeholder: "Ex: Arthur" },
          protagonistDescription: { label: "Protagonist Description", placeholder: "Ex: Young blacksmith with an innocent heart." },
          protagonistGoal: { label: "Main Goal", placeholder: "Ex: Retrieve the stolen magical sword." },
          antagonistNature: { label: "Antagonist Nature", placeholder: "Ex: The Dark Queen, consumed by envy." },
          conflictStartingPoint: { label: "Conflict Starting Point", placeholder: "Ex: He receives a mysterious letter on a rainy day." },
          settingLocation: { label: "Location", placeholder: "Ex: Kingdom of Eldoria" },
          settingTime: { label: "Time Period (year)", placeholder: "Ex: 1423" },
          settingTone: { label: "Tone & Atmosphere", placeholder: "Ex: Melancholic, with touches of hope." },
          storyLanguage: { label: "Story Language", placeholder: "Ex: Portuguese, English, Spanish..." },
          plotObstacle: { label: "The Greatest Obstacle", placeholder: "Ex: Being captured and having to escape a flying dungeon." },
          plotClimax: { label: "Climactic Action", placeholder: "Ex: Final magical duel at the top of the Antagonist's tower." },
          themeMessage: { label: "Central Message / Theme", placeholder: "Ex: True strength lies in kindness." },
          visualStyle: { label: "Visual Style", placeholder: "" }
        },
        buttons: {
          back: "Back",
          next: "Next Step",
          finish: "Finish Draft",
          restart: "Restart",
          generate: "Generate Story",
          generating: "Generating Story..."
        },
        summary: {
          title: "🎉 Story Draft Completed!",
          subtitle: "Summary of the elements you created.",
          not_filled: "Not filled"
        }
      },
      my_stories: {
        title: "📚 My Stories",
        empty_title: "No stories yet...",
        empty_desc: "Create your first story and it will appear here!",
        create_btn: "Create Story",
        delete_btn: "Delete",
        flipbook_btn: "📖 Flipbook",
        read_btn: "Read",
        buttons: {
          flipbook: "📖 Flipbook",
          view: "👁️ View",
          pdf: "⬇️ PDF",
          translate: "🌍 Translate",
          google_books: "📚 Upload to Google Books",
          delete: "🗑️ Delete"
        }
      },
      idea_lamp: {
        title: "💡 Ask NAIA",
        placeholder: "Type your question...",
        button: "Ask NAIA",
        button_loading: "Thinking..."
      },
      navbar: {
        home: "Home",
        create: "Create",
        library: "Library"
      },
      login: {
        email_label: "IDENTIFICATION (EMAIL)",
        email_placeholder: "adventurer@naia.com",
        password_label: "ACCESS KEY (PASSWORD)",
        password_placeholder: "••••••••",
        submit: "Enter the Arena ✦"
      },
      register: {
        username_label: "USERNAME (UNIQUE ID)",
        username_placeholder: "adventurer_naia.01",
        email_label: "IDENTIFICATION (EMAIL)",
        email_placeholder: "your@email.com",
        password_label: "ACCESS KEY (PASSWORD)",
        password_placeholder: "••••••••",
        submit: "Consecrate Registration ✦"
      }
    }
  },
  pt: {
    translation: {
      hero: {
        powered: "Desenvolvido com Gemini 2.5 Flash",
        title_prefix: "NAIA",
        title_suffix: "IA",
        subtitle: "Forjando mundos infinitos a partir de uma única faísca de imaginação.",
        cta_start: "Começar a Criar 🚀",
        cta_library: "Biblioteca 📚",
        features_orbit: "Órbita de Recursos",
        features_orbit_desc: "Tudo gira em torno da sua história.",
        why_naia: "Por que a Naia?",
        vivid_imagery: "Imagens Vívidas",
        vivid_imagery_desc: "Nosso motor descreve cenas com tanto detalhe que você quase pode vê-las.",
        deep_logic: "Lógica Profunda",
        deep_logic_desc: "Com Gemini 2.5, personagens lembram detalhes e agem com consistência.",
        instant_speed: "Velocidade Instantânea",
        instant_speed_desc: "Gere capítulos inteiros em segundos com nosso backend otimizado.",
        ready_creator: "Pronto para ser\num",
        creator_highlight: "Criador?",
        launch_studio: "Abrir Estúdio"
      },
      showcase: {
        ai_characters: "Personagens IA",
        ai_characters_desc: "Personalidades profundas",
        world_building: "Construção de Mundo",
        world_building_desc: "Ambientes ricos e lore",
        plot_twists: "Reviravoltas",
        plot_twists_desc: "Narrativas inesperadas",
        multi_language: "Multi-idioma",
        multi_language_desc: "Traduza instantaneamente",
        export_pdf: "Exportar PDF",
        export_pdf_desc: "Publique sua história",
        center_core: "Núcleo Naia",
        scroll_hint: "Role para Girar 🖱️"
      },
      book: {
        cover_title: "As Crônicas de Naia",
        cover_subtitle: "Abra para descobrir seu poder",
        page1_title: "Imagens Vívidas",
        page1_text: "Nosso motor descreve cenas com tanto detalhe que você quase pode vê-las.",
        page2_title: "Lógica Profunda",
        page2_text: "Com Gemini 2.5, personagens lembram detalhes e agem com consistência.",
        page3_title: "Velocidade Instantânea",
        page3_text: "Gere capítulos inteiros em segundos com nosso backend otimizado.",
        back_text: "Comece sua história agora."
      },
      create_story: {
        title: "Crie Sua História",
        subtitle: "Desenvolva os pilares da sua narrativa, passo a passo.",
        steps: {
          protagonist: "Protagonista",
          protagonist_desc: "Defina o herói da sua história e o que ele busca.",
          antagonist: "Antagonista e Conflito",
          antagonist_desc: "Quem ou o que se opõe ao seu herói e como a ação começa.",
          setting: "Cenário e Atmosfera",
          setting_desc: "Onde e quando a história se passa e o tom emocional.",
          plot: "Enredo e Clímax",
          plot_desc: "O maior desafio e o confronto final.",
          theme: "Tema e Mensagem",
          theme_desc: "A essência e o significado da sua narrativa.",
          visualStyle: "Estilo Visual",
          visualStyle_desc: "Escolha o estilo artístico para as ilustrações da sua história."
        },
        fields: {
          protagonistName: { label: "Nome do Protagonista", placeholder: "Ex: Arthur" },
          protagonistDescription: { label: "Descrição do Protagonista", placeholder: "Ex: Jovem ferreiro com coração inocente." },
          protagonistGoal: { label: "Objetivo Principal", placeholder: "Ex: Recuperar a espada mágica roubada." },
          antagonistNature: { label: "Natureza do Antagonista", placeholder: "Ex: A Rainha Sombria, consumida pela inveja." },
          conflictStartingPoint: { label: "Ponto de Partida do Conflito", placeholder: "Ex: Ele recebe uma carta misteriosa em um dia chuvoso." },
          settingLocation: { label: "Localização", placeholder: "Ex: Reino de Eldoria" },
          settingTime: { label: "Época (ano)", placeholder: "Ex: 1423" },
          settingTone: { label: "Tom e Atmosfera", placeholder: "Ex: Melancólico, com toques de esperança." },
          storyLanguage: { label: "Idioma da História", placeholder: "Ex: Português, Inglês, Espanhol..." },
          plotObstacle: { label: "O Maior Obstáculo", placeholder: "Ex: Ser capturado e ter que escapar de uma masmorra voadora." },
          plotClimax: { label: "Ação Climática", placeholder: "Ex: Duelo mágico final no topo da torre do Antagonista." },
          themeMessage: { label: "Mensagem Central / Tema", placeholder: "Ex: A verdadeira força reside na bondade." },
          visualStyle: { label: "Estilo Visual", placeholder: "" }
        },
        buttons: {
          back: "Voltar",
          next: "Próximo Passo",
          finish: "Imprimir Rascunho",
          restart: "Reiniciar",
          generate: "Gerar História",
          generating: "Gerando História..."
        },
        summary: {
          title: "🎉 Rascunho da História Concluído!",
          subtitle: "Resumo dos elementos que você criou.",
          not_filled: "Não preenchido"
        }
      },
      my_stories: {
        title: "📚 Minhas Histórias",
        empty_title: "Nenhuma história ainda...",
        empty_desc: "Crie sua primeira história e ela aparecerá aqui!",
        create_btn: "Criar História",
        delete_btn: "Excluir",
        flipbook_btn: "📖 Flipbook",
        read_btn: "Ler",
        buttons: {
          flipbook: "📖 Flipbook",
          view: "👁️ Ler",
          pdf: "⬇️ PDF",
          translate: "🌍 Traduzir",
          google_books: "📚 Upload Google Books",
          delete: "🗑️ Excluir"
        }
      },
      idea_lamp: {
        title: "💡 Pergunte à NAIA",
        placeholder: "Digite sua pergunta...",
        button: "Perguntar",
        button_loading: "Pensando..."
      },
      navbar: {
        home: "Início",
        create: "Criar",
        library: "Biblioteca"
      },
      login: {
        email_label: "IDENTIFICAÇÃO (EMAIL)",
        email_placeholder: "aventureiro@naia.com",
        password_label: "CHAVE DE ACESSO (SENHA)",
        password_placeholder: "••••••••",
        submit: "Entrar na Arena ✦"
      },
      register: {
        username_label: "USERNAME (ID ÚNICO)",
        username_placeholder: "aventureiro_naia.01",
        email_label: "IDENTIFICAÇÃO (EMAIL)",
        email_placeholder: "seu@email.com",
        password_label: "CHAVE DE ACESSO (SENHA)",
        password_placeholder: "••••••••",
        submit: "Consagrar Registro ✦"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
    }
  });

export default i18n;
