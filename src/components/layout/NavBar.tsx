import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import type { Lang } from "@/contexts/LanguageContext";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.glossary"), href: "/glossary" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  const handleLangSelect = (code: Lang) => {
    setLang(code);
    setLangOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-cinzel text-xl tracking-[0.25em] text-foreground hover:text-primary transition-colors duration-300"
          data-testid="link-logo"
        >
          GRAMMA
        </Link>

        <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-eb-garamond text-base tracking-wide transition-colors duration-200 ${
                location === href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`link-nav-${href.replace("/", "") || "home"}`}
            >
              {label}
            </Link>
          ))}

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="font-cinzel text-xs tracking-[0.15em] px-3 py-1.5 border border-white/20 text-white/60 hover:border-primary/60 hover:text-primary transition-all duration-300 flex items-center gap-1.5 min-w-[3rem] justify-center"
              aria-label="Select language"
              data-testid="button-lang-toggle"
            >
              {currentLang.nativeLabel}
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="currentColor"
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              >
                <path d="M0 0L4 5L8 0H0Z" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 right-0 bg-[hsl(222,20%,10%)] border border-white/10 shadow-xl z-50 min-w-[160px]"
                  data-testid="dropdown-lang"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors duration-150 ${
                        lang === l.code ? "text-primary" : "text-white/60 hover:text-white/90"
                      }`}
                      data-testid={`option-lang-${l.code}`}
                    >
                      <span className="font-cinzel text-xs tracking-[0.1em] w-6 shrink-0">
                        {l.nativeLabel}
                      </span>
                      <span className="font-eb-garamond text-sm">
                        {l.label}
                      </span>
                      {lang === l.code && (
                        <span className="ml-auto text-primary">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="currentColor">
                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact"
            className="font-cinzel text-sm tracking-[0.15em] px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            data-testid="button-nav-contact"
          >
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <div ref={undefined} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="font-cinzel text-xs tracking-[0.15em] px-2.5 py-1 border border-white/20 text-white/60 hover:border-primary/60 hover:text-primary transition-all duration-300"
              data-testid="button-lang-toggle-mobile"
            >
              {currentLang.nativeLabel}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full mt-1 right-0 bg-[hsl(222,20%,10%)] border border-white/10 shadow-xl z-50 min-w-[150px]"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5 transition-colors ${
                        lang === l.code ? "text-primary" : "text-white/60"
                      }`}
                    >
                      <span className="font-cinzel text-xs w-5 shrink-0">{l.nativeLabel}</span>
                      <span className="font-eb-garamond text-sm">{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4"
            data-testid="nav-mobile"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`font-eb-garamond text-lg ${
                  location === href ? "text-primary" : "text-foreground"
                }`}
                data-testid={`link-mobile-nav-${href.replace("/", "") || "home"}`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-cinzel text-sm tracking-[0.15em] px-5 py-2.5 border border-primary text-primary text-center"
              data-testid="button-mobile-contact"
            >
              {t("nav.contact")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
