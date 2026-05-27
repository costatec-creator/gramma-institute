import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const COURSES = [
  {
    id: "greek",
    lang: "Ελληνικά",
    title: "Biblical Greek",
    subtitle: "Koine Greek · New Testament",
    description:
      "Stop relying on translations. Start reading the text. Biblical Greek gives you direct access to the New Testament: its precision, its subtleties, its full intellectual and spiritual force. What others read secondhand, you will read firsthand. This is not a casual skill. It is a decisive advantage. It distinguishes serious thinkers from passive readers. It equips you to interpret, teach, and engage Scripture with authority. If you want depth, not summaries, this is where it begins.",
    gradient: "from-[#1a0f05] via-[#2d1a08] to-[#3d2510]",
    glowColor: "rgba(180,130,70,0.15)",
    script: "καὶ ἐν ἀρχῇ ἦν ὁ λόγος",
    scriptMeaning: "In the beginning was the Word",
    href: "/courses/greek",
  },
  {
    id: "hebrew",
    lang: "עִבְרִית",
    title: "Biblical Hebrew",
    subtitle: "Classical Hebrew · Old Testament",
    description:
      "Translation simplifies. Hebrew reveals. The Old Testament speaks in a language of power, imagery, and structure that cannot be replicated. Biblical Hebrew restores that voice. It brings you into the logic, rhythm, and conceptual world of the text itself. This is the difference between reading about Scripture and truly understanding it. Those who know Hebrew do not guess meaning; they see it.",
    gradient: "from-[#0a1205] via-[#122008] to-[#1a300d]",
    glowColor: "rgba(90,140,80,0.15)",
    script: "בְּרֵאשִׁית בָּרָא אֱלֹהִים",
    scriptMeaning: "In the beginning God created",
    href: "/courses/hebrew",
  },
  {
    id: "latin",
    lang: "Latīna",
    title: "Latin",
    subtitle: "Classical & Ecclesiastical Latin",
    description:
      "For over two millennia, the most influential ideas in theology, law, and philosophy have been written in Latin. To study Latin is to train your mind for precision, discipline, and clarity. It restructures how you think. It sharpens how you argue. It elevates how you write. This is why Latin has never disappeared: it produces intellectual strength. Learn it, and you join a tradition of thinkers who shaped civilization.",
    gradient: "from-[#0d0a14] via-[#1a1428] to-[#231a36]",
    glowColor: "rgba(120,90,180,0.15)",
    script: "In principio erat Verbum",
    scriptMeaning: "In the beginning was the Word",
    href: "/courses/latin",
  },
  {
    id: "english",
    lang: "English",
    title: "English",
    subtitle: "Modern English · Language & Style",
    description:
      "Mastery of English is mastery of thought. The most precise, most widely read, and most professionally consequential language in the modern world demands to be understood — not merely used. English grammar, rhetoric, and style form the foundation of every significant piece of writing in law, theology, science, and literature. To command English is to command your reader. This is not a secondary skill. It is the primary one.",
    gradient: "from-[#081018] via-[#0d1a28] to-[#112236]",
    glowColor: "rgba(60,120,200,0.15)",
    script: "In the beginning was the Word",
    scriptMeaning: "John 1:1 · King James Version",
    href: "/courses/english",
  },
  {
    id: "portuguese",
    lang: "Português",
    title: "Português",
    subtitle: "Língua Portuguesa · Gramática & Estilo",
    description:
      "O Português é uma das grandes línguas do mundo ocidental — língua de Camões, de Pessoa, de uma tradição literária e teológica de séculos. Conhecer o Português com profundidade é conhecer a estrutura do pensamento lusófono: a sua gramática, a sua sintaxe, o seu peso histórico e espiritual. Para quem ensina, escreve, ou prega em Português, a precisão não é um luxo. É uma obrigação.",
    gradient: "from-[#0a1208] via-[#122010] to-[#183018]",
    glowColor: "rgba(60,160,80,0.15)",
    script: "No princípio era o Verbo",
    scriptMeaning: "João 1:1 · Bíblia Sagrada",
    href: "/courses/portuguese",
  },
  {
    id: "linguistics",
    lang: "Linguistics",
    title: "Descriptive Linguistics",
    subtitle: "Language Science · Structure & Systems",
    description:
      "Language is not arbitrary. It is structured, systematic, and deeply human. Descriptive Linguistics gives you the tools to understand how any language works: phonology, morphology, syntax, semantics, and pragmatics. It is the science beneath all the languages. Those who understand linguistics do not merely speak languages — they understand them. Every language you study becomes clearer. Every text you read becomes richer.",
    gradient: "from-[#100810] via-[#1a1020] to-[#241630]",
    glowColor: "rgba(160,80,180,0.15)",
    script: "/ˈlæŋ.ɡwɪdʒ/",
    scriptMeaning: "The human faculty of language",
    href: "/courses/linguistics",
  },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { t } = useLanguage();

  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ];

  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true); // true = A, false = B

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % videos.length;
        return next;
      });

      setActive((prev) => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentVideo = active ? videoA.current : videoB.current;

    if (currentVideo) {
      currentVideo.src = videos[index];
      currentVideo.load();
      currentVideo.play().catch(() => {});
    }
  }, [index, active]);

  const VideoLayer = ({
    videoRef,
    isActive,
  }: {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isActive: boolean;
  }) => (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-[#0a0805]" />

        {/* 🎬 LAYER A */}
        <VideoLayer videoRef={videoA} isActive={active} />

        {/* 🎬 LAYER B */}
        <VideoLayer videoRef={videoB} isActive={!active} />
      </motion.div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

      {/* TEXTO (igual ao teu original) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["αληθεια", "אֱמֶת", "VERITAS", "λόγος", "שָׁלוֹם", "LUMEN"].map(
          (text, i) => (
            <div
              key={i}
              className="absolute font-cormorant text-white/[0.04] font-light select-none"
              style={{
                fontSize: `${60 + i * 15}px`,
                left: `${(i * 19 + 3) % 88}%`,
                top: `${(i * 27 + 10) % 80}%`,
                transform: `rotate(${(i % 3 - 1) * 5}deg)`,
              }}
            >
              {text}
            </div>
          )
        )}
      </div>

      {/* CONTEÚDO ORIGINAL */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          className="font-cinzel text-xs text-amber-400/70 tracking-[0.4em] uppercase mb-8"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.h1
          className="font-cormorant text-white font-light leading-none mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          {t("hero.headline1")}
          <br />
          <span className="italic text-amber-200/90">
            {t("hero.headline2")}
          </span>
        </motion.h1>

        <motion.p className="font-eb-garamond text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          {t("hero.subtitle")}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#courses"
            className="font-cinzel text-sm tracking-[0.2em] px-8 py-3.5 bg-amber-700 text-amber-50 hover:bg-amber-600 transition-colors duration-300"
          >
            {t("hero.explore")}
          </a>

          <Link
            href="/contact"
            className="font-cinzel text-sm tracking-[0.2em] px-8 py-3.5 border border-white/30 text-white/80 hover:border-white/60 hover:text-white transition-all duration-300"
          >
            {t("hero.touch")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CourseCard({ course, index }: { course: typeof COURSES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
      data-testid={`card-course-${course.id}`}
    >
      <Link href={course.href} className="block">
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${course.gradient} aspect-[16/9] mb-8`}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${course.glowColor}, transparent 70%)` }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div
              className="font-cormorant text-white/10 absolute inset-0 flex items-center justify-center select-none pointer-events-none"
              style={{ fontSize: "clamp(5rem, 15vw, 14rem)", fontStyle: "italic" }}
            >
              {course.lang}
            </div>

            <div className="relative z-10">
              <p className="font-cormorant text-white/50 text-2xl md:text-3xl italic mb-3 tracking-wide" dir={course.id === "hebrew" ? "rtl" : "ltr"}>
                {course.script}
              </p>
              <p className="font-cinzel text-white/25 text-xs tracking-[0.3em] uppercase">
                {course.scriptMeaning}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute bottom-0 right-0 p-5">
            <div
              className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 group-hover:border-white/50 group-hover:text-white/70 transition-all duration-300"
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-1">
          <p className="font-cinzel text-xs tracking-[0.3em] text-muted-foreground mb-2 uppercase">
            {course.subtitle}
          </p>
          <h3 className="font-cormorant text-foreground font-medium mb-4 group-hover:text-primary transition-colors duration-300" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            {course.title}
          </h3>
          <p className="font-eb-garamond text-muted-foreground leading-relaxed text-lg">
            {course.description}
          </p>
          <div className="mt-5 flex items-center gap-2 text-primary">
            <span className="font-cinzel text-xs tracking-[0.25em] uppercase group-hover:gap-3 transition-all duration-300">
              {t("courses.learn")}
            </span>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M0 5H14M14 5L10 1M14 5L10 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CoursesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const { t } = useLanguage();

  return (
    <section id="courses" className="py-32 bg-background" data-testid="section-courses">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] text-primary uppercase mb-4">
            {t("courses.label")}
          </p>
          <h2 className="font-cormorant text-foreground font-light mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            {t("courses.title1")}
            <br />
            <span className="italic">{t("courses.title2")}</span>
          </h2>
          <p className="font-eb-garamond text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            {t("courses.body")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS_KEYS = [
  { num: "I.", titleKey: "why.1.title", bodyKey: "why.1.body" },
  { num: "II.", titleKey: "why.2.title", bodyKey: "why.2.body" },
  { num: "III.", titleKey: "why.3.title", bodyKey: "why.3.body" },
  { num: "IV.", titleKey: "why.4.title", bodyKey: "why.4.body" },
];

function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[hsl(38,15%,93%)] relative overflow-hidden" data-testid="section-why">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a08060' fill-opacity='0.08'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-cinzel text-xs tracking-[0.4em] text-primary uppercase mb-4">
            {t("why.label")}
          </p>
          <h2 className="font-cormorant text-foreground font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            {t("why.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {WHY_ITEMS_KEYS.map((item, i) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-5%" });
            return (
              <motion.div
                key={item.num}
                ref={itemRef}
                initial={{ opacity: 0, y: 30 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                className="flex gap-6"
                data-testid={`item-why-${i + 1}`}
              >
                <div className="font-cinzel text-primary/50 text-lg tracking-wide shrink-0 w-8">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-cormorant text-foreground font-medium text-2xl mb-3">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-eb-garamond text-muted-foreground text-lg leading-relaxed">
                    {t(item.bodyKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="rule-ornament mb-10">
            <span className="font-cormorant italic text-muted-foreground text-2xl px-6">
              {t("why.quote")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLanguage();

  return (
    <section className="relative py-40 overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0b07] via-[#18130a] to-[#0a0806]" />

      <div className="absolute inset-0">
        {["ΑΩ", "אׅ", "ET", "λόγ", "אֵת", "VER"].map((text, i) => (
          <div
            key={i}
            className="absolute font-cormorant text-white/[0.025] font-light select-none pointer-events-none"
            style={{
              fontSize: `${100 + i * 20}px`,
              left: `${(i * 19 + 3) % 90}%`,
              top: `${(i * 29 + 5) % 80}%`,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="font-cinzel text-xs tracking-[0.4em] text-amber-400/60 uppercase mb-8">
            {t("cta.label")}
          </p>
          <h2
            className="font-cormorant text-white font-light mb-8 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {t("cta.title1")}
            <br />
            <span className="italic text-amber-200/80">{t("cta.title2")}</span>
          </h2>
          <p className="font-eb-garamond text-white/50 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            {t("cta.body")}
          </p>
          <Link
            href="/contact"
            className="inline-block font-cinzel text-sm tracking-[0.25em] px-10 py-4 bg-amber-700 text-amber-50 hover:bg-amber-600 transition-colors duration-300"
            data-testid="button-cta-contact"
          >
            {t("cta.button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <NavBar />
      <Hero />
      <CoursesSection />
      <WhySection />
      <CTASection />
      <Footer />
    </div>
  );
}
