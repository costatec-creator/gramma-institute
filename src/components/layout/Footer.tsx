import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const FOOTER_LINKS = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.glossary"), href: "/glossary" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[hsl(222,20%,8%)] border-t border-white/5 py-12" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="font-cinzel text-lg tracking-[0.3em] text-white/60 hover:text-white/90 transition-colors"
            data-testid="link-footer-logo"
          >
            GRAMMA
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" data-testid="nav-footer">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-eb-garamond text-white/40 hover:text-white/70 transition-colors text-sm"
                data-testid={`link-footer-${href.replace("/", "") || "home"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="font-eb-garamond text-white/30 text-sm" data-testid="text-copyright">
            {t("footer.copy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
