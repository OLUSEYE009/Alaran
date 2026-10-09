import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { PRINT_FORMATS, type PrintFormat } from "../content";
import { ArrowUpRight } from "./Arrow";
import Reveal from "./Reveal";

type Props = {
  onPickPrint: (service: string) => void;
  onPrintPricing: () => void;
};

function PrintedArtwork({ format }: { format: PrintFormat }) {
  return (
    <div className="print-sheet" aria-hidden="true">
      <span className="crop-mark crop-tl" /><span className="crop-mark crop-tr" />
      <span className="crop-mark crop-bl" /><span className="crop-mark crop-br" />

      {format === "flyer" && (
        <div className="sheet-art sheet-art-flyer">
          <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.2em] text-white/80">
            <span>A+ graphics.</span><span>01 / Poster</span>
          </div>
          <div className="mt-auto">
            <span className="block font-playfair text-[clamp(1.7rem,5vw,3rem)] italic leading-none text-gold-400">Make</span>
            <span className="block font-grotesk text-[clamp(3.5rem,9vw,5rem)] font-bold uppercase leading-[0.8] tracking-[-0.09em] text-white">IT</span>
            <span className="block font-grotesk text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-[0.9] tracking-[-0.085em] text-white">matter.</span>
          </div>
          <div className="flex items-end justify-between border-t border-white/30 pt-3 text-[8px] uppercase tracking-[0.16em] text-white/80">
            <span>Ideas made tangible</span><span>Design / Print</span>
          </div>
        </div>
      )}

      {format === "cards" && (
        <div className="sheet-art sheet-art-cards">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-royal-900/60">A study in first impressions</p>
          <div className="printed-card printed-card-front">
            <span className="font-grotesk text-[51px] font-bold leading-none tracking-[-0.1em] text-gold-400">A+</span>
            <span className="mt-auto self-end font-grotesk text-[9px] font-bold uppercase tracking-[0.16em] text-white">graphics.</span>
          </div>
          <div className="printed-card printed-card-back">
            <span className="font-grotesk text-[15px] font-bold tracking-[-0.06em] text-royal-900">Abdulamid Alaran</span>
            <span className="mt-1 text-[9px] text-royal-900/65">Design & print, considered together.</span>
            <span className="mt-auto h-[2px] w-9 bg-gold-500" />
          </div>
        </div>
      )}

      {format === "labels" && (
        <div className="sheet-art sheet-art-labels">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-royal-900/55">Small format / big presence</p>
          <div className="label-grid">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className={`printed-label ${index % 2 === 0 ? "bg-royal-900 text-white" : "bg-gold-500 text-royal-950"}`}>
                <span className="font-grotesk text-[35px] font-bold leading-none tracking-[-0.1em]">A+</span>
                <span className="mt-1 font-grotesk text-[7px] font-bold uppercase tracking-[0.16em]">made to matter</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {format === "signage" && (
        <div className="sheet-art sheet-art-signage">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-royal-900/55">Presence, at any scale.</p>
          <div className="signage-preview">
            <span className="font-grotesk text-[65px] font-bold leading-none tracking-[-0.1em] text-gold-400">A+</span>
            <span className="mt-2 font-grotesk text-[clamp(1.2rem,4vw,2rem)] font-bold leading-none tracking-[-0.08em] text-white">graphics.</span>
            <span className="mt-5 h-[2px] w-12 bg-gold-500" />
          </div>
          <p className="text-right font-playfair text-[18px] italic text-royal-900">Be seen.</p>
        </div>
      )}

      <div className="sheet-footer">
        <span>A+ GRAPHICS / PRINT STUDY</span>
        <span>{format.toUpperCase()} / 001</span>
      </div>
    </div>
  );
}

export default function PrintStudio({ onPickPrint, onPrintPricing }: Props) {
  const [selected, setSelected] = useState<PrintFormat>("flyer");
  const [printed, setPrinted] = useState<PrintFormat>("flyer");
  const [run, setRun] = useState(0);
  const [printing, setPrinting] = useState(false);
  const [status, setStatus] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const print = () => {
    if (printing) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("");
    setPrinting(true);
    setPrinted(selected);
    setRun((value) => value + 1);
    timerRef.current = setTimeout(() => {
      setPrinting(false);
      setStatus(`${PRINT_FORMATS.find((format) => format.key === selected)?.title} preview printed.`);
    }, reduced ? 200 : 1450);
  };

  const selectedInfo = PRINT_FORMATS.find((format) => format.key === selected)!;

  return (
    <section id="printing" className="bg-white pb-28 pt-5 md:pb-40 md:pt-10" aria-labelledby="printing-heading">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">05 / The print room</p>
          <h2 id="printing-heading" className="display-heading mt-4 max-w-[1200px] text-[clamp(3.7rem,8.8vw,9.5rem)]">
            Make it <em className="display-accent">real.</em>
          </h2>
          <p className="mt-7 max-w-[600px] text-[15px] leading-[1.8] text-royal-950/60 md:text-base">
            Pick a format, run a sample and see the idea leave the screen. A playful preview of what print can feel like &mdash; from small-run flyers to large-scale signage for names like OPay, Whole Shield and Delta.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-l-[3px] border-gold-500 pl-5">
            <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.18em] text-gold-600">Print work for</p>
            <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.18em] text-royal-900/70">OPay · Whole Shield · Delta · Chef MO's World · Mohlad Waters · Fola Perfumes · Heco Productions · Action Health Inc.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid border border-royal-900/15 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="flex flex-col justify-between bg-white p-6 md:p-10 lg:p-12">
            <div>
              <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.22em] text-gold-600">Choose a print format</p>
              <div className="mt-6 border-t border-royal-900/20">
                {PRINT_FORMATS.map((format, index) => (
                  <button
                    key={format.key}
                    type="button"
                    onClick={() => setSelected(format.key)}
                    aria-pressed={selected === format.key}
                    className={`group flex w-full items-center gap-4 border-b border-royal-900/15 py-5 text-left transition-colors hover:text-royal-900 ${selected === format.key ? "text-royal-900" : "text-royal-900/50"}`}
                  >
                    <span className="font-grotesk text-[11px] font-bold text-gold-600">0{index + 1}</span>
                    <span className="flex-1 font-grotesk text-[clamp(1.18rem,1.7vw,1.65rem)] font-bold tracking-[-0.05em]">{format.title}</span>
                    <span className={`h-2 w-2 rounded-full bg-gold-500 transition-opacity ${selected === format.key ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                  </button>
                ))}
              </div>
              <p className="mt-5 font-playfair text-lg italic text-royal-900/65">{selectedInfo.detail}</p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={print}
                disabled={printing}
                className="arrow-hover inline-flex w-full items-center justify-between bg-gold-500 px-5 py-4 font-grotesk text-sm font-bold text-royal-950 transition-colors hover:bg-gold-400 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[230px]"
              >
                {printing ? "Printing..." : "Print a preview"} <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-4 min-h-5 text-xs text-royal-900/55" role="status" aria-live="polite">{status || "An illustrative on-screen print preview."}</p>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-royal-900/15 pt-6">
                <button type="button" onClick={() => onPickPrint(selectedInfo.inquiryItem)} className="link-underline arrow-hover inline-flex items-center gap-2 font-grotesk text-sm font-bold text-royal-900">
                  Ask about printing <ArrowUpRight className="h-4 w-4" />
                </button>
                <a href="#pricing" onClick={onPrintPricing} className="link-underline font-grotesk text-sm font-bold text-royal-900/65">See starting prices</a>
              </div>
            </div>
          </div>

          <div ref={stageRef} className="print-stage relative min-h-[520px] overflow-hidden bg-royal-900 md:min-h-[630px]">
            <div className="press-head absolute inset-x-0 top-0 z-20 flex h-[70px] items-center justify-between px-7 text-white md:px-10" aria-hidden="true">
              <span className="font-grotesk text-[12px] font-bold tracking-[-0.04em]">A+ / PRESSROOM</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/55">Digital proof / 01</span>
            </div>
            <div className="press-slot absolute left-1/2 top-[68px] z-30 h-[7px] w-[min(70%,390px)] -translate-x-1/2 bg-royal-950" aria-hidden="true" />
            <div className="relative flex h-full min-h-[520px] items-start justify-center px-5 pb-8 pt-[76px] md:min-h-[630px] md:px-10 md:pb-9">
              <AnimatePresence mode="wait">
                {inView && (
                  <motion.div
                    key={`${printed}-${run}`}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: -390, rotate: -2 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -2 }}
                    exit={reduced ? { opacity: 0, transition: { duration: 0.08 } } : { opacity: 0, y: -125, rotate: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                    transition={{ duration: reduced ? 0.12 : run === 0 ? 1.35 : 0.92, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-[min(76%,345px)] origin-top md:w-[min(60%,350px)]"
                  >
                    <PrintedArtwork format={printed} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}