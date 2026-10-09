import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WORK_CATEGORIES, WORK_PREVIEWS, type WorkCategory } from "../content";
import { ArrowRight, ArrowUpRight } from "./Arrow";

type Props = { onDiscussProject: (title: string) => void };

export default function Portfolio({ onDiscussProject }: Props) {
  const [category, setCategory] = useState<WorkCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Build the project list. "All work" flattens every category.
  const projects = category === "all"
    ? [
        ...WORK_PREVIEWS.mockups,
        ...WORK_PREVIEWS.flyers,
        ...WORK_PREVIEWS.branding,
        ...WORK_PREVIEWS.signage,
      ]
    : WORK_PREVIEWS[category];

  const active = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") || []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const close = () => {
    setActiveIndex(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const chooseCategory = (next: WorkCategory) => {
    setCategory(next);
    setActiveIndex(null);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % WORK_CATEGORIES.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + WORK_CATEGORIES.length) % WORK_CATEGORIES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = WORK_CATEGORIES.length - 1;
    else return;
    event.preventDefault();
    chooseCategory(WORK_CATEGORIES[next].key);
    tabRefs.current[next]?.focus();
  };

  const openProject = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const discuss = () => {
    if (!active) return;
    const title = active.title;
    setActiveIndex(null);
    requestAnimationFrame(() => onDiscussProject(title));
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? 360) + 28;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="work" className="bg-white pb-28 pt-10 md:pb-40 md:pt-16" aria-labelledby="work-heading">
      <div className="section-wrap">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6"
        >
          <div>
            <p className="section-label">03 / Selected</p>
            <h2 id="work-heading" className="display-heading mt-4 text-[clamp(4.5rem,10.5vw,11rem)]">
              works<span className="text-gold-500">.</span>
            </h2>
          </div>
          <div className="max-w-[420px] pb-2">
            <p className="text-[15px] leading-[1.8] text-royal-950/60">
              A look at the ideas, formats and finishes I've shaped for brands. Pick a category to filter the carousel.
            </p>
            <div className="mt-6 hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll carousel left"
                className="flex h-12 w-12 items-center justify-center border border-royal-900/25 text-royal-900 transition-all hover:border-gold-500 hover:bg-gold-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="M19 12H5M5 12l6-6M5 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll carousel right"
                className="flex h-12 w-12 items-center justify-center border border-royal-900/25 text-royal-900 transition-all hover:border-gold-500 hover:bg-gold-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 12h14M19 12l-6-6M19 12l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex gap-9 overflow-x-auto border-b border-royal-900/20 md:gap-14" role="tablist" aria-label="Project categories">
          {WORK_CATEGORIES.map((item, index) => (
            <button
              key={item.key}
              type="button"
              id={`work-tab-${item.key}`}
              role="tab"
              aria-selected={category === item.key}
              aria-controls="work-panel"
              tabIndex={category === item.key ? 0 : -1}
              ref={(node) => { tabRefs.current[index] = node; }}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onClick={() => chooseCategory(item.key)}
              className={`relative shrink-0 pb-5 font-grotesk text-sm font-bold transition-colors md:text-base ${category === item.key ? "text-royal-900" : "text-royal-900/40 hover:text-royal-900"}`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gold-500 transition-transform duration-500 ${category === item.key ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
      </div>

      <div
        id="work-panel"
        role="tabpanel"
        aria-labelledby={`work-tab-${category}`}
        tabIndex={0}
        className="mt-12 overflow-x-hidden"
      >
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-8 md:gap-9"
          style={{ scrollBehavior: reduced ? "auto" : "smooth", scrollbarWidth: "none" }}
        >
          <div className="hidden w-[max(24px,calc((100vw-1480px)/2+24px))] shrink-0 md:block" aria-hidden="true" />
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.button
                key={`${category}-${project.title}`}
                layout
                data-carousel-card
                type="button"
                aria-label={`View ${project.title} project`}
                onClick={(event) => openProject(event, index)}
                initial={reduced ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group w-[80vw] shrink-0 snap-start text-left sm:w-[min(56vw,360px)] md:w-[min(33vw,420px)] xl:w-[400px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-royal-50">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.055] group-focus-visible:scale-[1.055]"
                  />
                  <span className="absolute left-5 top-5 font-playfair text-lg italic text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    0{index + 1}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-white text-royal-900 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-royal-900/20 pb-5 pt-5">
                  <div>
                    <h3 className="font-grotesk text-[clamp(1.35rem,1.9vw,1.85rem)] font-bold tracking-[-0.05em] text-royal-900">{project.title}</h3>
                    <p className="mt-1 text-[13px] text-royal-950/55">{project.discipline}</p>
                  </div>
                  <span className="pt-2 font-grotesk text-[11px] font-bold text-gold-600">{project.discipline.split(" ")[0]}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
          <div className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <div className="section-wrap">
        <p className="mt-2 text-xs leading-relaxed text-royal-950/45">
          Click any project to open more detail. To show your real work, drop your files into <code className="font-grotesk text-royal-900/70">src/assets/images/</code> with the same names (e.g. <code className="font-grotesk text-royal-900/70">work-flyer-food.jpg</code>, <code className="font-grotesk text-royal-900/70">mockup-01.jpg</code>) &mdash; they replace these placeholders automatically.
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-royal-950/80 p-3 py-5 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-auto grid w-full max-w-[1220px] bg-white lg:grid-cols-[1.15fr_0.85fr]"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close project details"
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-white font-grotesk text-2xl font-normal text-royal-900 transition-colors hover:bg-gold-500 md:right-5 md:top-5"
              >
                ×
              </button>
              <div key={active.image} className="h-[32svh] min-h-[230px] bg-royal-50 md:h-[45svh] lg:h-auto lg:min-h-[610px]">
                <img src={active.image} alt={active.alt} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between p-6 pt-8 md:p-11 lg:p-14">
                <div>
                  <p className="section-label">Concept study / {WORK_CATEGORIES.find((item) => item.key === category)?.label ?? "All work"}</p>
                  <h3 id="project-dialog-title" className="display-heading mt-8 text-[clamp(2.6rem,4.4vw,5rem)]">{active.title}</h3>
                  <p className="mt-6 max-w-[460px] text-base leading-[1.75] text-royal-950/65">{active.description}</p>
                  <p className="mt-5 max-w-[460px] text-[15px] leading-[1.8] text-royal-950/65">{active.approach}</p>
                  <ul className="mt-8 border-t border-royal-900/20">
                    {active.details.map((detail, index) => (
                      <li key={detail} className="flex items-center gap-4 border-b border-royal-900/15 py-3 text-sm font-medium text-royal-900">
                        <span className="font-grotesk text-[11px] text-gold-600">0{index + 1}</span>{detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
                  <button type="button" onClick={discuss} className="arrow-hover inline-flex items-center gap-4 bg-gold-500 px-5 py-4 font-grotesk text-sm font-bold text-royal-950 transition-colors hover:bg-gold-400">
                    Ask about this style <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setActiveIndex((current) => ((current ?? 0) + 1) % projects.length)} className="arrow-hover inline-flex items-center gap-2 font-grotesk text-sm font-bold text-royal-900">
                    Next study <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-5 text-xs text-royal-950/45">Illustrative visual. Replace with your real project image in <code className="font-grotesk text-royal-900/70">src/assets/images/</code>.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
