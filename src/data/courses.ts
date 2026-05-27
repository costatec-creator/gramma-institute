export interface CourseLevel {
  num: number;
  title: string;
  description: string;
}

export interface CourseData {
  id: string;
  lang: string;
  title: string;
  subtitle: string;
  tagline: string;
  gradient: string;
  glowColor: string;
  script: string;
  scriptMeaning: string;
  about: string;
  longDescription: string;
  forWhom: string;
  duration: string;
  frequency: string;
  sessionLength: string;
  format: string;
  investment: string;
  material: string;
  certificate: string;
  levels: CourseLevel[];
}

export const COURSES_DATA: CourseData[] = [
  {
    id: "greek",
    lang: "Ελληνικά",
    title: "Biblical Greek",
    subtitle: "Koine Greek · New Testament",
    tagline: "Read the New Testament as it was written.",
    gradient: "from-[#1a0f05] via-[#2d1a08] to-[#3d2510]",
    glowColor: "rgba(180,130,70,0.15)",
    script: "καὶ ἐν ἀρχῇ ἦν ὁ λόγος",
    scriptMeaning: "In the beginning was the Word",
    about:
      "Biblical Greek was the language in which the New Testament was written. Studying it opens direct access to the original text and its world.",
    longDescription:
      "By studying Biblical Greek, you gain a deeper understanding of the original text and the cultural context in which it was written. Biblical Greek is invaluable for those pursuing theological studies, providing a deeper understanding of the language and concepts used in early Christian writings. Greek is an Indo-European language, and studying it develops your linguistic abilities while providing insights into the evolution of other Indo-European languages. Greek was a major language in the ancient world and was used for many important texts beyond the New Testament. Studying Biblical Greek grants access to these texts and a better understanding of the ancient world.",
    forWhom:
      "This course assumes no prior knowledge and is the perfect place to start your life-long journey of Biblical Greek learning.",
    duration: "3 months",
    frequency: "2 times a week",
    sessionLength: "1 hour each meeting",
    format: "The course is entirely online",
    investment: "Contact us for more info",
    material: "Free study material",
    certificate: "Free certificate included",
    levels: [
      {
        num: 1,
        title: "Greek I",
        description:
          "This course assumes no prior knowledge and is the perfect place to start your life-long journey of Biblical Greek learning. Greek I follows Machen's method.",
      },
      {
        num: 2,
        title: "Greek II",
        description:
          "Begins exactly where Greek I ends. Greek II follows Machen's method.",
      },
    ],
  },
  {
    id: "hebrew",
    lang: "עִבְרִית",
    title: "Biblical Hebrew",
    subtitle: "Classical Hebrew · Old Testament",
    tagline: "Access the Old Testament in its original voice.",
    gradient: "from-[#0a1205] via-[#122008] to-[#1a300d]",
    glowColor: "rgba(90,140,80,0.15)",
    script: "בְּרֵאשִׁית בָּרָא אֱלֹהִים",
    scriptMeaning: "In the beginning God created",
    about:
      "Biblical Hebrew was the language in which most of the Old Testament was written. Studying it opens direct access to the Hebrew Scriptures, their imagery, and their theological depth.",
    longDescription:
      "The Old Testament was written primarily in Biblical Hebrew, a language of remarkable imagery, rhythm, and poetic force. To read the Psalms, the Prophets, or the Torah in Hebrew is to encounter the text as its authors intended it — with all the weight, ambiguity, and beauty that translation necessarily loses. Biblical Hebrew gives you access to the world of ancient Israel: its culture, its theology, and its vision of God. It sharpens your reading of the New Testament by revealing the Jewish background that shapes every page. For pastors, theologians, and serious students of the Bible, knowledge of Biblical Hebrew is not optional — it is essential.",
    forWhom:
      "This course assumes no prior knowledge of Hebrew or any Semitic language. All you need is seriousness and the willingness to work carefully.",
    duration: "3 months",
    frequency: "2 times a week",
    sessionLength: "1 hour each meeting",
    format: "The course is entirely online",
    investment: "Contact us for more info",
    material: "Free study material",
    certificate: "Free certificate included",
    levels: [
      {
        num: 1,
        title: "Hebrew I",
        description:
          "Covers the Hebrew alphabet, vowel system, basic nouns, pronouns, and the foundational verbal system. By the end, students read simple sentences from the Hebrew Bible.",
      },
      {
        num: 2,
        title: "Hebrew II",
        description:
          "Expands the verbal system, introduces the construct chain, and begins sustained reading of prose texts from Genesis and the historical books.",
      },
    ],
  },
  {
    id: "latin",
    lang: "Latīna",
    title: "Latin",
    subtitle: "Classical & Ecclesiastical Latin",
    tagline: "The language of Western thought for two thousand years.",
    gradient: "from-[#0d0a14] via-[#1a1428] to-[#231a36]",
    glowColor: "rgba(120,90,180,0.15)",
    script: "In principio erat Verbum",
    scriptMeaning: "In the beginning was the Word",
    about:
      "Latin was the intellectual language of Western civilisation for over two millennia. Studying it gives direct access to theology, philosophy, law, and literature in their original form.",
    longDescription:
      "From Augustine's Confessions to Aquinas's Summa Theologica, from the Vulgate to the canons of the Church councils, the intellectual heritage of Western Christianity is written in Latin. To read these works in translation is to read them at a distance. To read them in Latin is to read them. Latin also sharpens the mind in ways that few other disciplines can. Its grammar demands precision. Its syntax demands patience. Its vocabulary — much of which passes directly into English, French, Spanish, and Portuguese — illuminates the structure of modern languages from within. Learning Latin is an investment that pays across every domain of intellectual life.",
    forWhom:
      "This course is for students with no prior Latin who wish to read the Latin Fathers, the Vulgate, or the great works of mediaeval and Renaissance scholarship.",
    duration: "3 months",
    frequency: "2 times a week",
    sessionLength: "1 hour each meeting",
    format: "The course is entirely online",
    investment: "Contact us for more info",
    material: "Free study material",
    certificate: "Free certificate included",
    levels: [
      {
        num: 1,
        title: "Latin I",
        description:
          "Covers the Latin noun and adjective declensions, basic verb conjugations, and fundamental sentence structure. Students begin reading adapted Classical and Ecclesiastical texts.",
      },
      {
        num: 2,
        title: "Latin II",
        description:
          "Completes the verb system, introduces the subjunctive, and moves to unadapted readings from the Vulgate and the Latin Fathers.",
      },
    ],
  },
  {
    id: "english",
    lang: "English",
    title: "English",
    subtitle: "Modern English · Language & Style",
    tagline: "Command the language that commands the world.",
    gradient: "from-[#081018] via-[#0d1a28] to-[#112236]",
    glowColor: "rgba(60,120,200,0.15)",
    script: "In the beginning was the Word",
    scriptMeaning: "John 1:1 · King James Version",
    about:
      "English is the primary language of global scholarship, theology, law, and professional communication. Studying it with rigour means learning not just to use it, but to master it.",
    longDescription:
      "Mastery of English is mastery of thought. The most widely read language in the modern world demands to be understood — not merely used. English grammar, rhetoric, and style form the foundation of every significant piece of writing in theology, law, science, and literature. Whether you write sermons, academic papers, professional documents, or correspondence, the difference between competent writing and excellent writing is the difference between being read and being remembered. This course treats English not as a given, but as a discipline — one that rewards study with clarity, precision, and persuasive force.",
    forWhom:
      "This course is for non-native speakers of English who wish to write and speak with precision and authority, as well as native speakers seeking to sharpen their style and correctness.",
    duration: "3 months",
    frequency: "2 times a week",
    sessionLength: "1 hour each meeting",
    format: "The course is entirely online",
    investment: "Contact us for more info",
    material: "Free study material",
    certificate: "Free certificate included",
    levels: [
      {
        num: 1,
        title: "English I — Grammar & Structure",
        description:
          "Covers English grammar systematically — parts of speech, sentence structure, common errors, and the logic of English syntax. Suitable for intermediate learners.",
      },
      {
        num: 2,
        title: "English II — Style & Rhetoric",
        description:
          "Moves from correctness to excellence. Students learn the principles of clear, forceful, and elegant prose through analysis of model texts and extensive writing practice.",
      },
    ],
  },
  {
    id: "portuguese",
    lang: "Português",
    title: "Português",
    subtitle: "Língua Portuguesa · Gramática & Estilo",
    tagline: "Domine a língua de Camões e do mundo lusófono.",
    gradient: "from-[#0a1208] via-[#122010] to-[#183018]",
    glowColor: "rgba(60,160,80,0.15)",
    script: "No princípio era o Verbo",
    scriptMeaning: "João 1:1 · Bíblia Sagrada",
    about:
      "O Português é a língua de Camões, de Fernando Pessoa e de uma tradição literária, teológica e filosófica de séculos. Estudá-lo com rigor é aceder a essa tradição diretamente.",
    longDescription:
      "O Português é uma das grandes línguas do mundo ocidental, falado por mais de 250 milhões de pessoas nos cinco continentes. Para quem prega, ensina, escreve ou exerce qualquer forma de liderança em contexto lusófono, o domínio do Português não é opcional — é a base de tudo o resto. Este curso trata o Português como uma disciplina intelectual: a sua gramática, a sua sintaxe, a sua retórica e o seu estilo. Da correcção formal à elegância expressiva, o objetivo é dotar o aluno das ferramentas para comunicar com precisão, autoridade e beleza.",
    forWhom:
      "Este curso destina-se tanto a falantes nativos que desejam aprofundar o domínio da língua, como a falantes não nativos que procuram escrever e falar com correcção e estilo.",
    duration: "3 meses",
    frequency: "2 vezes por semana",
    sessionLength: "1 hora por sessão",
    format: "O curso é totalmente online",
    investment: "Contacte-nos para mais informações",
    material: "Material de estudo gratuito",
    certificate: "Certificado gratuito incluído",
    levels: [
      {
        num: 1,
        title: "Português I — Gramática e Estrutura",
        description:
          "Cobre a gramática portuguesa sistematicamente — morfologia, sintaxe, pontuação e os erros mais comuns. Adequado para quem procura consolidar e corrigir o seu domínio formal da língua.",
      },
      {
        num: 2,
        title: "Português II — Estilo e Retórica",
        description:
          "Avança da correcção para a excelência. O aluno aprende os princípios da prosa clara, precisa e elegante através da análise de textos modelo e da prática extensiva de escrita.",
      },
    ],
  },
  {
    id: "linguistics",
    lang: "Linguistics",
    title: "Descriptive Linguistics",
    subtitle: "Language Science · Structure & Systems",
    tagline: "Understand how language itself works.",
    gradient: "from-[#100810] via-[#1a1020] to-[#241630]",
    glowColor: "rgba(160,80,180,0.15)",
    script: "/ˈlæŋ.ɡwɪdʒ/",
    scriptMeaning: "The human faculty of language",
    about:
      "Descriptive Linguistics is the scientific study of how language works — its sounds, its structures, its meanings, and its use. It is the foundation beneath every language you study.",
    longDescription:
      "Every language has a system. Descriptive Linguistics gives you the tools to see that system clearly — in any language, living or ancient. Phonology, morphology, syntax, semantics, and pragmatics: these are the sub-disciplines of linguistics, and together they explain how human beings communicate meaning through sound and structure. For students of Biblical Greek, Hebrew, or Latin, a grounding in linguistics transforms how you analyse unfamiliar forms. For students of English or Portuguese, it explains why the language works the way it does. Descriptive Linguistics does not prescribe how language should be used — it describes how it actually is. This scientific approach sharpens every other language skill you possess.",
    forWhom:
      "This course is for students who want to understand the principles underlying all human language — whether as a foundation for ancient language study or as a discipline in its own right.",
    duration: "3 months",
    frequency: "2 times a week",
    sessionLength: "1 hour each meeting",
    format: "The course is entirely online",
    investment: "Contact us for more info",
    material: "Free study material",
    certificate: "Free certificate included",
    levels: [
      {
        num: 1,
        title: "Linguistics I — Foundations",
        description:
          "Introduces the core subfields: phonetics, phonology, morphology, and basic syntax. Students learn to analyse linguistic data systematically and apply their findings to real language examples.",
      },
      {
        num: 2,
        title: "Linguistics II — Meaning & Use",
        description:
          "Covers semantics (the study of meaning) and pragmatics (language in context). Students examine how meaning is constructed, how context shapes interpretation, and how language varies across communities.",
      },
    ],
  },
];
