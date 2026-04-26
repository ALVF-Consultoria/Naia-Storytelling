
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        powered: "Driven by Infinite Imagination",
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
        deep_logic_desc: "Our advanced technology ensures characters remember details and act consistently.",
        instant_speed: "Instant Speed",
        instant_speed_desc: "Generate entire chapters in seconds with our optimized creative infrastructure.",
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
        page2_text: "Our advanced intelligence ensures characters remember details and act consistently.",
        page3_title: "Instant Speed",
        page3_text: "Generate entire chapters in seconds with our optimized creative infrastructure.",
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
          generating: "Generating Story...",
          step_of: "Step {{current}} of {{total}}"
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
      },
      selection: {
        title: "How do you want to create your <0>story</0>?",
        story_word: "story",
        subtitle: "Choose the path that best suits your creativity today.",
        form_title: "Magic Form",
        form_desc: "The traditional method. Fill in the fields step-by-step and define every detail of your world.",
        form_btn: "Start now",
        chat_title: "Chat with Naia",
        chat_desc: "An interactive experience. Tell Naia your idea and she will ask the right questions.",
        chat_btn: "Have a chat",
        footer: "Different paths, same result"
      },
      chat: {
        intro: "Hello! I am Naia, your creative companion. Let's build a legendary world together! ✨\n\nTo start our journey, **what is the name of our protagonist?**",
        phase_prefix: "Fascinating. Now let's dive into: **{{title}}**.",
        completion: "Magnificent! I have everything I need to forge your narrative. Shall we give life to this story now?",
        style_selected: "An inspired choice! Everything is ready. Let's begin the generation process!",
        input_placeholder: "Tell me more...",
        input_hint: "Naia is listening. Press Enter to share your thought.",
        questions: {
          protagonistName: "What shall we call our hero?",
          protagonistDescription: "Tell me, what do they look like? What is their essence?",
          protagonistGoal: "What is the great dream or goal driving them forward?",
          antagonistNature: "Every hero needs a challenge. Who or what stands in their way?",
          conflictStartingPoint: "How did this all begin? What was the spark that changed everything?",
          settingLocation: "Where does this adventure take place? Describe the world to me.",
          settingTime: "In what era or year does this chronicle unfold?",
          settingTone: "What is the 'soul' of this story? Is it dark and heavy, or light and hopeful?",
          storyLanguage: "In which language should I weave this narrative?",
          plotObstacle: "What is the greatest wall they will have to climb during the journey?",
          plotClimax: "The moment of truth! How will the final, epic confrontation be?",
          themeMessage: "When the dust settles, what is the lesson or message this story leaves behind?",
          visualStyle: "To finish in style, which artistic look best matches this universe?"
        }
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
        deep_logic_desc: "Nossa tecnologia avançada garante que personagens lembrem detalhes e ajam com consistência.",
        instant_speed: "Velocidade Instantânea",
        instant_speed_desc: "Gere capítulos inteiros em segundos com nossa infraestrutura criativa otimizada.",
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
        page2_text: "Nossa inteligência avançada garante que personagens lembrem detalhes e ajam com consistência.",
        page3_title: "Velocidade Instantânea",
        page3_text: "Gere capítulos inteiros em segundos com nossa infraestrutura criativa otimizada.",
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
          generating: "Gerando História...",
          step_of: "Passo {{current}} de {{total}}"
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
      },
      selection: {
        title: "Como deseja criar sua <0>história</0>?",
        story_word: "história",
        subtitle: "Escolha o caminho que mais combina com sua criatividade hoje.",
        form_title: "Formulário Mágico",
        form_desc: "O método tradicional. Preencha os campos passo a passo e defina cada detalhe do seu mundo.",
        form_btn: "Começar agora",
        chat_title: "Conversar com Naia",
        chat_desc: "Uma experiência interativa. Conte sua ideia para a Naia e ela fará as perguntas certas.",
        chat_btn: "Bater um papo",
        footer: "Caminhos diferentes, mesmo resultado"
      },
      chat: {
        intro: "Olá! Eu sou a Naia, sua companheira criativa. Vamos construir um mundo lendário juntos! ✨\n\nPara iniciarmos nossa jornada, **como se chama o nosso protagonista?**",
        phase_prefix: "Fascinante. Agora, vamos mergulhar em: **{{title}}**.",
        completion: "Magnífico! Já tenho tudo o que preciso para forjar sua narrativa. Vamos dar vida a essa história agora?",
        style_selected: "Uma escolha inspirada! Tudo pronto. Vamos iniciar o processo de geração!",
        input_placeholder: "Conte-me mais...",
        input_hint: "A Naia está ouvindo. Pressione Enter para compartilhar sua ideia.",
        questions: {
          protagonistName: "Qual será o nome do nosso herói?",
          protagonistDescription: "Me diga, como ele é fisicamente? Qual a sua essência?",
          protagonistGoal: "Qual o grande sonho ou objetivo que o move adiante?",
          antagonistNature: "Todo herói precisa de um desafio. Quem ou o que está no caminho dele?",
          conflictStartingPoint: "Como tudo isso começou? Qual foi a faísca que mudou tudo?",
          settingLocation: "Onde essa aventura acontece? Me descreva esse mundo.",
          settingTime: "Em que época ou ano essa crônica se desenrola?",
          settingTone: "Qual é a 'alma' dessa história? É algo sombrio e denso, ou leve e esperançoso?",
          storyLanguage: "Em qual idioma você deseja que eu escreva essa narrativa?",
          plotObstacle: "Qual a maior barreira que eles terão que escalar durante a jornada?",
          plotClimax: "A hora da verdade! Como será o grande e épico confronto final?",
          themeMessage: "Quando a poeira baixar, qual a lição ou mensagem que essa história deixa?",
          visualStyle: "Para fecharmos com chave de ouro, qual estilo artístico mais combina com esse universo?"
        }
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
