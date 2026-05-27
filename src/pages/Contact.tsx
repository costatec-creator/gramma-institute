import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

function PageHero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[45vh] flex items-end pb-20 overflow-hidden bg-[#0a0805]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-[#120e07] to-[#0a0805]" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["ἐπικοινωνία", "CONTACT", "קֶשֶׁר"].map((text, i) => (
          <div
            key={i}
            className="absolute font-cormorant text-white/[0.025] font-light select-none"
            style={{
              fontSize: `${80 + i * 22}px`,
              left: `${[3, 32, 60][i]}%`,
              top: `${[18, 28, 12][i]}%`,
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
          {t("contact.hero.label")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant text-5xl md:text-7xl font-light text-foreground leading-[1.1]"
        >
          {t("contact.hero.title1")}<br />
          <span className="italic text-primary">{t("contact.hero.title2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-eb-garamond text-lg text-muted-foreground mt-6 max-w-lg leading-relaxed"
        >
          {t("contact.hero.subtitle")}
        </motion.p>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLanguage();

  const ENQUIRY_TYPES = [
    t("contact.enquiry.course"),
    t("contact.enquiry.enrol"),
    t("contact.enquiry.partner"),
    t("contact.enquiry.media"),
    t("contact.enquiry.other"),
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: ENQUIRY_TYPES[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const COURSES_LIST = ["Biblical Greek", "Biblical Hebrew", "Latin", "English", "Português", "Descriptive Linguistics"];

  return (
    <section ref={ref} className="py-24 bg-background" data-testid="section-contact">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-10"
          >
            <div>
              <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4">
                {t("contact.info.label")}
              </p>
              <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed">
                {t("contact.info.body")}
              </p>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <p className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground mb-2">
                {t("contact.email.label")}
              </p>
              <a
                href="mailto:info@grammainstitute.pro"
                className="font-eb-garamond text-base text-primary hover:text-primary/80 transition-colors"
              >
                info@grammainstitute.pro
              </a>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <p className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground mb-2">
                {t("contact.response.label")}
              </p>
              <p className="font-eb-garamond text-base text-foreground/70">
                {t("contact.response.value")}
              </p>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <p className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground mb-3">
                {t("contact.courses.label")}
              </p>
              <div className="flex flex-col gap-2">
                {COURSES_LIST.map((c) => (
                  <span
                    key={c}
                    className="font-eb-garamond text-sm text-muted-foreground"
                  >
                    → {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-primary/30 p-12 text-center"
                data-testid="message-success"
              >
                <div className="font-cormorant text-6xl text-primary mb-6">✓</div>
                <h2 className="font-cormorant text-3xl font-light text-foreground mb-4">
                  {t("contact.success.title")}
                </h2>
                <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed">
                  {t("contact.success.body").replace("{name}", form.name.split(" ")[0])}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                data-testid="form-contact"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name.ph")}
                      className="font-eb-garamond text-base bg-transparent border border-white/10 px-4 py-3 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email.ph")}
                      className="font-eb-garamond text-base bg-transparent border border-white/10 px-4 py-3 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground">
                    {t("contact.form.type")}
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="font-eb-garamond text-base bg-background border border-white/10 px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                  >
                    {ENQUIRY_TYPES.map((ty) => (
                      <option key={ty} value={ty}>
                        {ty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder={t("contact.form.message.ph")}
                    className="font-eb-garamond text-base bg-transparent border border-white/10 px-4 py-3 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="font-cinzel text-sm tracking-[0.2em] px-8 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all duration-300 self-start"
                  data-testid="button-submit"
                >
                  {loading ? t("contact.form.sending") : t("contact.form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen" data-testid="page-contact">
      <NavBar />
      <PageHero />
      <ContactSection />
      <Footer />
    </div>
  );
}
