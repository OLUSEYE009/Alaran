import { useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RATE_GUIDE, type ServicePath } from "../content";
import { ArrowUpRight } from "./Arrow";
import Reveal from "./Reveal";

type Props = {
  path: ServicePath;
  onPathChange: (path: ServicePath) => void;
  onPickRate: (path: ServicePath, service: string) => void;
};

const PATHS: { key: ServicePath; label: string }[] = [
  { key: "design", label: "Graphic design" },
  { key: "printing", label: "Printing" },
];

export default function RateGuide({ path, onPathChange, onPickRate }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % PATHS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + PATHS.length) % PATHS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PATHS.length - 1;
    else return;
    event.preventDefault();
    onPathChange(PATHS[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="pricing" className="border-t border-royal-900/15 bg-white py-24 md:py-36" aria-labelledby="pricing-heading">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">07 / Price guide</p>
          <h2 id="pricing-heading" className="display-heading mt-4 text-[clamp(3.5rem,8vw,8.5rem)]">
            Starting <em className="display-accent">from.</em>
          </h2>
          <p className="mt-7 max-w-[610px] text-base leading-[1.8] text-royal-950/60">
            A starting point, not a fixed invoice. Choose the service you need and tell me about the brief for a tailored quote.
          </p>
        </Reveal>

        <div className="mt-12 flex gap-9 border-b border-royal-900/20 md:gap-14" role="tablist" aria-label="Price categories">
          {PATHS.map((item, index) => (
            <button
              key={item.key}
              type="button"
              id={`price-tab-${item.key}`}
              role="tab"
              aria-selected={path === item.key}
              aria-controls="price-panel"
              tabIndex={path === item.key ? 0 : -1}
              ref={(node) => { tabRefs.current[index] = node; }}
              onClick={() => onPathChange(item.key)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`relative pb-5 font-grotesk text-sm font-bold transition-colors md:text-base ${path === item.key ? "text-royal-900" : "text-royal-900/40 hover:text-royal-900"}`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gold-500 transition-transform duration-500 ${path === item.key ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>

        <div id="price-panel" role="tabpanel" aria-labelledby={`price-tab-${path}`} tabIndex={0}>
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0.1 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="divide-y divide-royal-900/15"
            >
              {RATE_GUIDE[path].map((rate, index) => (
                <button
                  key={rate.service}
                  type="button"
                  onClick={() => onPickRate(path, rate.service)}
                  className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-6 text-left transition-colors hover:bg-royal-50 md:grid-cols-[44px_minmax(0,1fr)_minmax(210px,0.65fr)_28px] md:gap-x-8 md:px-3 md:py-7"
                  aria-label={`Enquire about ${rate.service}, starting from ${rate.amount}`}
                >
                  <span className="hidden font-grotesk text-[11px] font-bold text-gold-600 md:block">0{index + 1}</span>
                  <span>
                    <span className="block font-grotesk text-[clamp(1.35rem,2.3vw,2.4rem)] font-bold leading-tight tracking-[-0.055em] text-royal-900 transition-transform duration-300 group-hover:translate-x-1">{rate.service}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-royal-950/55">{rate.detail}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-600">Starting from</span>
                    <span className="mt-1 block font-grotesk text-lg font-bold text-royal-900 md:text-[1.65rem]">{rate.amount}</span>
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 text-royal-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block" />
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-8 border-t border-royal-900/20 pt-7">
          <p className="max-w-[740px] border-l-[3px] border-gold-500 pl-5 text-sm leading-[1.8] text-royal-950/60">
            These are illustrative starting prices pending confirmation. Quantity, size, materials and turnaround affect the final quote. Design plus printing can be bundled, and every quote is open to negotiation.
          </p>
          <button type="button" onClick={() => onPickRate(path, "")} className="arrow-hover inline-flex items-center gap-3 bg-gold-500 px-6 py-4 font-grotesk text-sm font-bold text-royal-950 transition-colors hover:bg-gold-400">
            Request a quote <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}