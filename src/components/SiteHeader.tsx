import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ServicePath } from "../content";
import { ArrowUpRight } from "./Arrow";
import Logo from "./Logo";

type Props = {
  onChoosePath: (path: ServicePath) => void;
};

const MENU_LINKS: { number: string; label: string; href: string; path?: ServicePath }[] = [
  { number: "01", label: "Graphic design", href: "#work", path: "design" },
  { number: "02", label: "Video editing", href: "#services", path: "design" },
  { number: "03", label: "Printing", href: "#printing", path: "printing" },
  { number: "04", label: "Starting prices", href: "#pricing" },
  { number: "05", label: "The studio", href: "#about" },
  { number: "06", label: "Get in touch", href: "#contact" },
];

export default function SiteHeader({ onChoosePath }: Props) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key !== "Tab") return;

      const focusables = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-focus]"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string, path?: ServicePath) => {
    if (path) onChoosePath(path);
    if (!open) return;
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      window.history.pushState(null, "", href);
      document.querySelector(href)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`relative z-20 border-b transition-colors duration-500 ${open ? "border-white/20 bg-royal-900 text-white" : "border-royal-900/10 bg-white text-royal-900"}`}>
        <div className="section-wrap flex h-[72px] items-center justify-between gap-6 md:h-[82px]">
          <a
            href="#top"
            data-menu-focus={open ? "" : undefined}
            onClick={(event) => navigate(event, "#top")}
            className="shrink-0"
            aria-label="A Plus Graphics, back to top"
          >
            <Logo
              className="h-9 w-9 md:h-11 md:w-11"
              withWordmark
              wordmarkClassName="text-[20px] md:text-[24px]"
            />
          </a>

          <nav className={`hidden items-center gap-8 lg:flex ${open ? "invisible pointer-events-none" : ""}`} aria-label="Quick navigation">
            <a href="#work" onClick={(event) => navigate(event, "#work", "design")} className="nav-quick">Work</a>
            <a href="#services" onClick={(event) => navigate(event, "#services", "design")} className="nav-quick">Video</a>
            <a href="#printing" onClick={(event) => navigate(event, "#printing", "printing")} className="nav-quick">Printing</a>
            <a href="#pricing" onClick={(event) => navigate(event, "#pricing")} className="nav-quick">Pricing</a>
          </nav>

          <div className="ml-auto flex items-center gap-5 md:gap-8 lg:ml-0">
            <a
              href="#contact"
              onClick={(event) => navigate(event, "#contact")}
              className={`hidden items-center gap-2 font-grotesk text-[13px] font-bold sm:inline-flex ${open ? "invisible pointer-events-none" : ""}`}
            >
              Let's talk <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              ref={menuButton}
              type="button"
              data-menu-focus={open ? "" : undefined}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="group flex min-h-11 items-center gap-3 font-grotesk text-[12px] font-bold uppercase tracking-[0.13em]"
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="flex h-8 w-8 flex-col items-center justify-center gap-[6px]">
                <span className={`h-[2px] w-7 origin-center transition-transform duration-500 ${open ? "translate-y-1 rotate-45 bg-white" : "bg-royal-900"}`} />
                <span className={`h-[2px] w-7 origin-center transition-transform duration-500 ${open ? "-translate-y-1 -rotate-45 bg-white" : "bg-royal-900"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Expanded navigation"
            initial={reduced ? { opacity: 0 } : { y: "-105%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: "-105%" }}
            transition={{ duration: reduced ? 0.15 : 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-10 overflow-y-auto bg-royal-900 pt-[72px] text-white md:pt-[82px]"
          >
            <div className="section-wrap flex min-h-[calc(100svh-82px)] flex-col justify-between pb-8 pt-10 md:pt-12">
              <div>
                <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-400 md:mb-7">
                  What are you here to make?
                </p>
                {MENU_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    data-menu-focus=""
                    onClick={(event) => navigate(event, link.href, link.path)}
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: reduced ? 0 : 0.2 + index * 0.065, ease: [0.22, 1, 0.36, 1] }}
                    className="menu-link group flex items-center gap-4 border-b border-white/20 py-[min(2.3vh,20px)] transition-colors hover:text-gold-400 md:gap-8"
                  >
                    <span className="w-7 self-start pt-2 font-sans text-[11px] font-semibold text-gold-400 md:w-10 md:pt-4">{link.number}</span>
                    <span className="flex-1 font-grotesk text-[clamp(2.1rem,5.1vw,5.6rem)] font-bold leading-[1.05] tracking-[-0.065em]">{link.label}</span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-9 md:w-9" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-end justify-between gap-4 text-xs text-white/55">
                <span>Abdulamid Alaran / A Plus Graphics</span>
                <span>Design. Edit. Print.</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}