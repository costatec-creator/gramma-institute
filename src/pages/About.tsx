import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

function PageHero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden bg-[#0a0805]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-[#120e07] to-[#0a0805]" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["περὶ ἡμῶν", "ABOUT", "אוֹדוֹתֵינוּ"].map((text, i) => (
          <div
            key={i}
            className="absolute font-cormorant text-white/[0.025] font-light select-none"
            style={{
              fontSize: `${100 + i * 30}px`,
              left: `${[5, 40, 65][i]}%`,
              top: `${[15, 30, 10][i]}%`,
              transform: `rotate(${[-3, 0, 4][i]}deg)`,
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
          {t("about.hero.label")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant text-5xl md:text-7xl font-light text-foreground leading-[1.1]"
        >
          {t("about.hero.title1")}<br />
          <span className="italic text-primary">{t("about.hero.title2")}</span>
        </motion.h1>
      </div>
    </section>
  );
}

function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 bg-background" data-testid="section-mission">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="border-l-2 border-primary/40 pl-8 mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4">{t("about.mission.label")}</p>
          <p className="font-cormorant text-3xl md:text-4xl font-light text-foreground leading-relaxed">
            {t("about.mission.text")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed mb-6">
              {t("about.mission.p1")}
            </p>
            <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed">
              {t("about.mission.p2")}
            </p>
          </div>
          <div>
            <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed mb-6">
              {t("about.mission.p3")}
            </p>
            <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed">
              {t("about.mission.p4")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const PILLAR_KEYS = [
  { num: "I.", titleKey: "about.pillars.1.title", bodyKey: "about.pillars.1.body" },
  { num: "II.", titleKey: "about.pillars.2.title", bodyKey: "about.pillars.2.body" },
  { num: "III.", titleKey: "about.pillars.3.title", bodyKey: "about.pillars.3.body" },
  { num: "IV.", titleKey: "about.pillars.4.title", bodyKey: "about.pillars.4.body" },
];

function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 bg-[hsl(222,20%,6%)]" data-testid="section-pillars">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4">{t("about.pillars.label")}</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-foreground">
            {t("about.pillars.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {PILLAR_KEYS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="border border-white/8 p-8 hover:border-primary/30 transition-colors duration-400"
            >
              <span className="font-cinzel text-primary/50 text-sm tracking-[0.2em] block mb-3">
                {item.num}
              </span>
              <h3 className="font-cormorant text-2xl font-light text-foreground mb-4">
                {t(item.titleKey)}
              </h3>
              <p className="font-eb-garamond text-base text-muted-foreground leading-relaxed">
                {t(item.bodyKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 bg-background text-center" data-testid="section-cta">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-6">{t("about.cta.label")}</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
            {t("about.cta.title")}
          </h2>
          <p className="font-eb-garamond text-lg text-muted-foreground mb-10 leading-relaxed">
            {t("about.cta.body")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="font-cinzel text-sm tracking-[0.2em] px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
            >
              {t("about.cta.courses")}
            </Link>
            <Link
              href="/contact"
              className="font-cinzel text-sm tracking-[0.2em] px-8 py-3 border border-primary/50 text-primary hover:border-primary transition-colors duration-300"
            >
              {t("about.cta.touch")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen" data-testid="page-about">
      <NavBar />
      <PageHero />
      <MissionSection />
      <PillarsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
