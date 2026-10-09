import { ArrowUpRight } from "./Arrow";
import { LogoMark } from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-royal-900/15 bg-white">
      <div className="section-wrap pb-8 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-sans text-sm text-royal-950/60">
            Abdulamid Alaran / Graphic design, video & print
          </p>
          <a
            href="#top"
            className="link-underline arrow-hover inline-flex items-center gap-2 font-grotesk text-sm font-bold text-royal-900"
          >
            Back to top <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-14 flex items-center gap-[0.12em]">
          <LogoMark
            idPrefix="footer"
            className="h-[clamp(2.2rem,10vw,10rem)] w-auto shrink-0 object-contain"
          />
          <p className="whitespace-nowrap font-grotesk text-[clamp(2.55rem,11.1vw,11.5rem)] font-bold leading-[0.9] tracking-[-0.09em] text-royal-900">
            graphics<span className="text-gold-500">.</span>
          </p>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-royal-900/15 pt-5 text-xs text-royal-950/45">
          <span>Copyright {new Date().getFullYear()} A Plus Graphics.</span>
          <span>Graphic design / Video editing / Print</span>
        </div>
      </div>
    </footer>
  );
}