import { useParams, Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { COURSES_DATA } from "@/data/courses";
import NotFound from "./not-found";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/8 py-4 last:border-0">
      <p className="font-cinzel text-xs tracking-[0.2em] text-muted-foreground/60 mb-1 uppercase">
        {label}
      </p>
      <p className="font-eb-garamond text-base text-foreground/80">{value}</p>
    </div>
  );
}

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const course = COURSES_DATA.find((c) => c.id === params.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-60px" });
  const levelsInView = useInView(levelsRef, { once: true, margin: "-60px" });

  if (!course) return <NotFound />;

  return (
    <div className="min-h-screen" data-testid={`page-course-${course.id}`}>
      <NavBar />

      <section
        className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden"
        style={{ background: "#0a0805" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-black/40" />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-cormorant text-white/[0.06] font-light"
            style={{ fontSize: "clamp(6rem, 20vw, 18rem)", fontStyle: "italic" }}
          >
            {course.lang}
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Link
              href="/"
              className="font-cinzel text-xs tracking-[0.25em] text-white/40 hover:text-white/70 transition-colors"
            >
              HOME
            </Link>
            <span className="text-white/20 text-xs">›</span>
            <span className="font-cinzel text-xs tracking-[0.25em] text-primary/70">
              {course.title.toUpperCase()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-cinzel text-xs tracking-[0.35em] text-amber-400/60 mb-4"
          >
            {course.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-white font-light leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            {course.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-eb-garamond text-white/60 text-xl max-w-xl leading-relaxed"
          >
            {course.tagline}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-background" ref={contentRef}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <div className="border border-white/8 p-6 sticky top-24">
                <p className="font-cinzel text-xs tracking-[0.25em] text-primary mb-4 uppercase">
                  Course Info
                </p>
                <InfoItem label="Total Duration" value={course.duration} />
                <InfoItem label="Frequency" value={course.frequency} />
                <InfoItem label="Session Length" value={course.sessionLength} />
                <InfoItem label="Format" value={course.format} />
                <InfoItem label="Investment" value={course.investment} />
                <InfoItem label="Material" value={course.material} />
                <InfoItem label="Certificate" value={course.certificate} />

                <Link
                  href="/contact"
                  className="block w-full text-center font-cinzel text-sm tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 mt-6"
                  data-testid="button-course-contact"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="md:col-span-2 flex flex-col gap-12"
            >
              <div>
                <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4 uppercase">
                  About the Course
                </p>
                <p className="font-cormorant text-foreground text-2xl md:text-3xl font-light leading-relaxed border-l-2 border-primary/40 pl-6 mb-8">
                  {course.about}
                </p>
                <div className="font-eb-garamond text-lg text-muted-foreground leading-relaxed space-y-4">
                  {course.longDescription.split(". ").reduce((acc: string[], sentence, i, arr) => {
                    if (i % 3 === 0) {
                      acc.push(arr.slice(i, i + 3).join(". ") + (arr.slice(i, i + 3).length === 3 && !arr[i + 3 - 1]?.endsWith(".") ? "." : ""));
                    }
                    return acc;
                  }, []).filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4 uppercase">
                  Who Is This For
                </p>
                <p className="font-eb-garamond text-lg text-muted-foreground leading-relaxed">
                  {course.forWhom}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[hsl(222,20%,6%)]" ref={levelsRef}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={levelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-4 uppercase">
              The Levels
            </p>
            <h2 className="font-cormorant text-foreground text-3xl md:text-4xl font-light">
              Course Structure
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {course.levels.map((level, i) => (
              <motion.div
                key={level.num}
                initial={{ opacity: 0, y: 24 }}
                animate={levelsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-8 border border-white/8 p-8 hover:border-primary/20 transition-colors duration-300"
                data-testid={`level-${level.num}`}
              >
                <div className="font-cinzel text-primary/40 text-3xl font-light shrink-0 w-8">
                  {level.num}
                </div>
                <div>
                  <h3 className="font-cormorant text-foreground text-2xl font-light mb-3">
                    {level.title}
                  </h3>
                  <p className="font-eb-garamond text-muted-foreground text-lg leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-cinzel text-xs tracking-[0.3em] text-primary mb-6 uppercase">
            Ready to Begin
          </p>
          <h2 className="font-cormorant text-foreground text-3xl md:text-4xl font-light mb-6">
            Start Your Study of {course.title}
          </h2>
          <p className="font-eb-garamond text-muted-foreground text-lg mb-8 leading-relaxed">
            Contact us for enrolment information, schedules, and any questions you may have. We respond to every inquiry personally.
          </p>
          <Link
            href="/contact"
            className="inline-block font-cinzel text-sm tracking-[0.2em] px-8 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
