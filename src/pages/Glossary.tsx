import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const TERMS = [
  {
    lang: "greek",
    label: "Greek",
    labelNative: "Ελληνικά",
    color: "text-[#c8a96e]",
    borderColor: "border-[#c8a96e]/30",
    activeBg: "bg-[#c8a96e]/10",
    entries: [
      { term: "λόγος", transliteration: "lógos", meaning: "Word, reason, discourse", note: "John 1:1 — 'In the beginning was the Word (λόγος).' Central to Johannine theology and Greek philosophy alike." },
      { term: "ἀγάπη", transliteration: "agápē", meaning: "Unconditional love", note: "The highest form of love in the NT, distinct from ἔρως (erotic love) and φιλία (friendship). 1 Cor 13." },
      { term: "χάρις", transliteration: "cháris", meaning: "Grace, favour", note: "The unmerited favour of God. Foundational to Pauline theology. Related to χαίρω, 'to rejoice.'" },
      { term: "πίστις", transliteration: "pístis", meaning: "Faith, trust, faithfulness", note: "Can denote both subjective faith (belief) and objective faithfulness. The ambiguity is often theologically significant." },
      { term: "σάρξ", transliteration: "sárx", meaning: "Flesh", note: "In Paul, 'flesh' often denotes not merely the body but the entire person oriented away from God. Distinct from σῶμα (body)." },
      { term: "εἰρήνη", transliteration: "eirḗnē", meaning: "Peace", note: "Broader than mere absence of conflict — it carries the Hebrew concept of שָׁלוֹם (wholeness, well-being, completion)." },
      { term: "δικαιοσύνη", transliteration: "dikaiosýnē", meaning: "Righteousness, justice", note: "At the heart of Paul's argument in Romans. Encompasses both right standing before God and ethical conduct." },
      { term: "παρουσία", transliteration: "parousía", meaning: "Presence, arrival, coming", note: "Used for the royal visit of a king. In eschatology, refers to the return of Christ. 1 Thess 4:15." },
      { term: "ἐκκλησία", transliteration: "ekklēsía", meaning: "Assembly, church", note: "Literally 'called-out ones.' Used in the LXX for the assembly of Israel. The NT's primary term for the Christian community." },
      { term: "ἀπόστολος", transliteration: "apóstolos", meaning: "Apostle, sent one", note: "From ἀποστέλλω, 'to send.' Designates those commissioned and sent with authority — primarily the Twelve and Paul." },
    ],
  },
  {
    lang: "hebrew",
    label: "Hebrew",
    labelNative: "עִבְרִית",
    color: "text-[#7aad6a]",
    borderColor: "border-[#7aad6a]/30",
    activeBg: "bg-[#7aad6a]/10",
    entries: [
      { term: "אֱמֶת", transliteration: "ʾemet", meaning: "Truth, faithfulness, reliability", note: "More than factual accuracy — it conveys the steadfast reliability of God's character. Connected to אָמֵן (amen)." },
      { term: "שָׁלוֹם", transliteration: "shālôm", meaning: "Peace, wholeness, well-being", note: "Encompasses completeness, soundness, and harmonious relationships — far richer than the English 'peace.'" },
      { term: "חֶסֶד", transliteration: "ḥesed", meaning: "Steadfast love, lovingkindness", note: "Often translated 'mercy' or 'loving-kindness.' Denotes covenant loyalty combined with generous affection. Untranslatable in a single English word." },
      { term: "בְּרִית", transliteration: "berît", meaning: "Covenant", note: "The binding agreement central to Israel's relationship with God. Each covenant (Noahic, Abrahamic, Mosaic, Davidic) shapes the entire narrative." },
      { term: "תּוֹרָה", transliteration: "tôrāh", meaning: "Instruction, law, teaching", note: "Not merely 'law' in the legal sense — tôrāh means teaching or instruction. The first five books of Moses and their divine direction." },
      { term: "רוּחַ", transliteration: "rûaḥ", meaning: "Spirit, wind, breath", note: "The same word covers wind, breath, and spirit. Gen 1:2 — 'the Spirit (rûaḥ) of God was hovering over the waters.'" },
      { term: "קָדוֹשׁ", transliteration: "qādôsh", meaning: "Holy, set apart", note: "To be holy is to be set apart for God's purposes. The root of קֹדֶשׁ (holiness) and מִקְדָּשׁ (sanctuary, temple)." },
      { term: "נֶפֶשׁ", transliteration: "nephesh", meaning: "Soul, life, person, being", note: "Does not denote an immortal soul separate from the body, but the whole living person. Gen 2:7 — man became a living nephesh." },
      { term: "כָּבוֹד", transliteration: "kābôd", meaning: "Glory, weight, honour", note: "From a root meaning 'to be heavy.' God's glory is his weighty, manifest presence. Ezek 1 and Isa 6 depict it as overwhelming." },
      { term: "גְּאֻלָּה", transliteration: "geʾullāh", meaning: "Redemption, right of redemption", note: "The act of a kinsman-redeemer (גֹּאֵל) who restores what was lost. Ruth, Boaz, and ultimately Christ as the ultimate go'el." },
    ],
  },
  {
    lang: "latin",
    label: "Latin",
    labelNative: "Latīna",
    color: "text-[#9b7fd4]",
    borderColor: "border-[#9b7fd4]/30",
    activeBg: "bg-[#9b7fd4]/10",
    entries: [
      { term: "Verbum", transliteration: "VER-bum", meaning: "Word", note: "The Vulgate's translation of λόγος in John 1:1: 'In principio erat Verbum.' Jerome's choice shaped centuries of Latin theology." },
      { term: "Gratia", transliteration: "GRA-ti-a", meaning: "Grace, favour, thanks", note: "Translates χάρις. Augustine's theology of grace (De gratia et libero arbitrio) turned on this word and its relationship to human will." },
      { term: "Fides", transliteration: "FI-des", meaning: "Faith, trust, loyalty", note: "In Roman culture, fides was the cardinal virtue of keeping one's word. Paul's use of πίστις carried similar weight — covenant fidelity." },
      { term: "Pax", transliteration: "paks", meaning: "Peace, treaty", note: "'Pax Romana' — the peace imposed by Rome. The NT's use of εἰρήνη/pax subverts imperial claims: true peace comes from Christ, not Caesar." },
      { term: "Lumen", transliteration: "LU-men", meaning: "Light", note: "Distinct from lux (light as a source), lumen is light as perceived — the illumination that reaches the eye. John 1:4: 'et lux in tenebris lucet.'" },
      { term: "Spiritus", transliteration: "SPI-ri-tus", meaning: "Spirit, breath, wind", note: "The Latin equivalent of רוּחַ and πνεῦμα. Jerome renders Gen 1:2 as 'Spiritus Dei ferebatur super aquas.'" },
      { term: "Veritas", transliteration: "VE-ri-tas", meaning: "Truth", note: "Pilate's 'Quid est veritas?' ('What is truth?') to Jesus in John 18:38 is among the most debated questions in intellectual history." },
      { term: "Caritas", transliteration: "CA-ri-tas", meaning: "Love, charity, esteem", note: "Jerome's preferred rendering of ἀγάπη. Augustine distinguished caritas (love ordered toward God) from cupiditas (love disordered toward self)." },
      { term: "Sapientia", transliteration: "sa-pi-EN-ti-a", meaning: "Wisdom", note: "For the Scholastics, sapientia was the highest intellectual virtue — knowledge ordered toward its ultimate end. Contrasted with scientia (knowledge of particulars)." },
      { term: "Incarnatio", transliteration: "in-car-NA-ti-o", meaning: "Incarnation, enfleshment", note: "From in + caro (flesh). The theological term for the Son of God taking on human flesh. John 1:14: 'Verbum caro factum est.'" },
    ],
  },
];

type Lang = "greek" | "hebrew" | "latin" | "all";

function PageHero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden bg-[#0a0805]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-[#120e07] to-[#0a0805]" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["λεξικόν", "GLOSSARY", "מִלּוֹן"].map((text, i) => (
          <div
            key={i}
            className="absolute font-cormorant text-white/[0.025] font-light select-none"
            style={{
              fontSize: `${90 + i * 25}px`,
              left: `${[5, 35, 62][i]}%`,
              top: `${[20, 25, 12][i]}%`,
              transform: `rotate(${[-2, 0, 3][i]}deg)`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-cinzel text-xs tracking-[0.35em] text-primary mb-4"
        >
          {t("glossary.hero.label")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant text-5xl md:text-7xl font-light text-foreground leading-[1.1]"
        >
          {t("glossary.hero.title1")}<br />
          <span className="italic text-primary">{t("glossary.hero.title2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-eb-garamond text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed"
        >
          {t("glossary.hero.subtitle")}
        </motion.p>
      </div>
    </section>
  );
}

function GlossarySection() {
  const [activeLang, setActiveLang] = useState<Lang>("all");
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLanguage();

  const LANG_TABS: { id: Lang; label: string }[] = [
    { id: "all", label: t("glossary.tab.all") },
    { id: "greek", label: t("glossary.tab.greek") },
    { id: "hebrew", label: t("glossary.tab.hebrew") },
    { id: "latin", label: t("glossary.tab.latin") },
  ];

  const filteredTerms = TERMS.filter(
    (group) => activeLang === "all" || group.lang === activeLang
  ).map((group) => ({
    ...group,
    entries: group.entries.filter(
      (e) =>
        search === "" ||
        e.term.toLowerCase().includes(search.toLowerCase()) ||
        e.meaning.toLowerCase().includes(search.toLowerCase()) ||
        e.transliteration.toLowerCase().includes(search.toLowerCase()) ||
        e.note.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((group) => group.entries.length > 0);

  return (
    <section ref={ref} className="py-16 bg-background" data-testid="section-glossary">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="flex gap-2 flex-wrap">
            {LANG_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLang(tab.id)}
                className={`font-cinzel text-xs tracking-[0.15em] px-4 py-2 border transition-all duration-200 ${
                  activeLang === tab.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground"
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder={t("glossary.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-eb-garamond text-base bg-transparent border border-white/10 px-4 py-2 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 w-full sm:w-64 transition-colors"
          />
        </motion.div>

        {filteredTerms.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-eb-garamond text-muted-foreground text-center py-16 text-lg"
          >
            {t("glossary.empty")} "{search}".
          </motion.p>
        ) : (
          filteredTerms.map((group, gi) => (
            <motion.div
              key={group.lang}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="mb-16"
            >
              <div className={`flex items-center gap-4 mb-8 border-b ${group.borderColor} pb-4`}>
                <span className={`font-cinzel text-xs tracking-[0.3em] ${group.color}`}>
                  {group.label.toUpperCase()}
                </span>
                <span className={`font-cormorant text-2xl font-light ${group.color} opacity-60`}>
                  {group.labelNative}
                </span>
              </div>

              <div className="grid gap-4">
                {group.entries.map((entry, ei) => (
                  <motion.div
                    key={entry.term}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: gi * 0.1 + ei * 0.04 }}
                    className={`border ${group.borderColor} p-6 hover:${group.activeBg} transition-colors duration-300 group`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                      <span className={`font-cormorant text-3xl font-light ${group.color} leading-none`}>
                        {entry.term}
                      </span>
                      <span className="font-eb-garamond text-sm text-muted-foreground/70 italic">
                        {entry.transliteration}
                      </span>
                      <span className="font-eb-garamond text-base text-foreground/80">
                        — {entry.meaning}
                      </span>
                    </div>
                    <p className="font-eb-garamond text-sm text-muted-foreground leading-relaxed">
                      {entry.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}

export default function Glossary() {
  return (
    <div className="min-h-screen" data-testid="page-glossary">
      <NavBar />
      <PageHero />
      <GlossarySection />
      <Footer />
    </div>
  );
}
