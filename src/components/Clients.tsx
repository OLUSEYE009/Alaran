import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DESIGN_CLIENTS, PRINT_CLIENTS } from "../content";
import Reveal from "./Reveal";

type Filter = "all" | "design" | "print" | "both";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "both", label: "Design + print" },
  { key: "design", label: "Design only" },
  { key: "print", label: "Print only" },
];

// Short industry labels so each tile says what the brand actually does.
const INDUSTRY: Record<string, string> = {
  "OPay": "Fintech",
  "Whole Shield": "Security",
  "Delta": "Corporate",
  "Amoke Oge": "Fashion",
  "Chef MO's World": "Food & dining",
  "Primux Stride": "Lifestyle",
  "Fola Perfumes": "Fragrance",
  "Mohlad Waters": "Beverage",
  "Ibile Wears": "Streetwear",
  "Heco Productions": "Film & media",
  "Canadah Catering Service and Rentals": "Events",
  "Action Health Incorporated": "Healthcare",
};

type Brand = { name: string; design: boolean; print: boolean; industry: string };

function buildBrands(): Brand[] {
  const names = Array.from(new Set([...DESIGN_CLIENTS, ...PRINT_CLIENTS]));
  return names.map((name) => ({
    name,
    design: DESIGN_CLIENTS.includes(name),
    print: PRINT_CLIENTS.includes(name),
    industry: INDUSTRY[name] ?? "Brand",
  }));
}

function initials(name: string) {
  const words = name.replace(/[^\w\s']/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Clients() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();
  const brands = useMemo(buildBrands, []);

  const visible = brands.filter((brand) => {
    if (filter === "all") return true;
    if (filter === "both") return brand.design && brand.print;
    if (filter === "design") return brand.design && !brand.print;
    return brand.print && !brand.design;
  });

  const bothCount = brands.filter((b) => b.design && b.print).length;

  return (
    <section id="clients" className="overflow-hidden border-t border-royal-900/10 bg-white py-24 md:py-32" aria-labelledby="clients-heading">
      <div className="section-wrap">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <p className="section-label">06 / Brands I've worked with</p>
              <h2 id="clients-heading" className="display-heading mt-5 text-[clamp(3rem,6.2vw,6.5rem)]">
                In good <em className="display-accent">company.</em>
              </h2>
            </div>
            <p className="max-w-[460px] text-base leading-relaxed text-royal-950/65 lg:pb-3">
              From fintech to fragrance, these are the brands that trusted A+ Graphics with their
              look, their print, or both. Tap a filter to see who got what.
            </p>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={80}>
          <dl className="mt-12 grid grid-cols-2 border-y border-royal-900/20 sm:grid-cols-4">
            {[
              { value: brands.length, label: "Brands served" },
              { value: DESIGN_CLIENTS.length, label: "Design projects" },
              { value: PRINT_CLIENTS.length, label: "Print clients" },
              { value: bothCount, label: "Trusted with both" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1 px-1 py-6 sm:px-5 ${index > 0 ? "sm:border-l sm:border-royal-900/15" : ""} ${index % 2 === 1 ? "border-l border-royal-900/15 pl-5 sm:pl-5" : ""}`}
              >
                <dt className="order-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-royal-950/55">{stat.label}</dt>
                <dd className="order-1 font-grotesk text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.06em] text-royal-900">
                  {stat.value}<span className="text-gold-500">+</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Filter chips */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter brands by service">
            {FILTERS.map((item) => {
              const active = filter === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  aria-pressed={active}
                  className={`relative overflow-hidden border px-4 py-2.5 font-grotesk text-xs font-bold transition-colors duration-300 ${active ? "border-gold-500 text-royal-950" : "border-royal-900/20 text-royal-900/60 hover:border-royal-900/50 hover:text-royal-900"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="client-filter-pill"
                      transition={{ duration: reduced ? 0.01 : 0.35, ease }}
                      className="absolute inset-0 bg-gold-500"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
            <span className="ml-auto font-grotesk text-xs font-semibold text-royal-900/50" aria-live="polite">
              {visible.length} {visible.length === 1 ? "brand" : "brands"}
            </span>
          </div>
        </Reveal>

        {/* Brand grid */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-royal-900/15 bg-royal-900/15 sm:grid-cols-3 lg:grid-cols-4" role="list">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((brand, index) => {
              const both = brand.design && brand.print;
              return (
                <motion.div
                  key={brand.name}
                  layout
                  role="listitem"
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduced ? 0.1 : 0.45, delay: reduced ? 0 : index * 0.03, ease }}
                  className="group relative flex min-h-[172px] flex-col justify-between bg-white p-4 transition-colors duration-300 hover:bg-royal-900 sm:min-h-[196px] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Monogram tile */}
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center font-grotesk text-sm font-bold tracking-[-0.04em] transition-colors duration-300 sm:h-12 sm:w-12 ${both ? "bg-gold-500 text-royal-950" : "bg-royal-900 text-white group-hover:bg-gold-500 group-hover:text-royal-950"}`}
                      aria-hidden="true"
                    >
                      {initials(brand.name)}
                    </span>
                    <span className="font-grotesk text-[10px] font-bold text-gold-600 transition-colors duration-300 group-hover:text-gold-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-grotesk text-[clamp(0.95rem,1.3vw,1.15rem)] font-bold leading-tight tracking-[-0.035em] text-royal-900 transition-colors duration-300 group-hover:text-white">
                      {brand.name}
                    </h3>
                    <p className="mt-1 font-sans text-[11px] text-royal-950/55 transition-colors duration-300 group-hover:text-white/60">
                      {brand.industry}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {brand.design && (
                        <span className="border border-royal-900/25 px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-royal-900 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
                          Design
                        </span>
                      )}
                      {brand.print && (
                        <span className="border border-gold-500 bg-gold-500/15 px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-gold-600 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-royal-950">
                          Print
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Corner accent for brands trusted with both */}
                  {both && (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-0 h-0 w-0 border-l-[18px] border-t-[18px] border-l-transparent border-t-gold-500"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[11px] text-royal-950/50">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-gold-500" />
          Gold corner = trusted with both design and print.
        </p>
      </div>

      {/* Marquee ribbon — pauses on hover */}
      <div className="marquee-group mt-16 border-y border-royal-900/15 bg-royal-900 py-4 md:mt-20" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {brands.map((brand) => (
                <span key={`${copy}-${brand.name}`} className="flex items-center">
                  <span className="whitespace-nowrap px-5 font-grotesk text-sm font-bold uppercase tracking-[0.14em] text-white/90 md:px-7 md:text-base">
                    {brand.name}
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
