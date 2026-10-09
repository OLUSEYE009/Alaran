import { motion, useReducedMotion } from "motion/react";
import { localImage } from "../assets/images";
import { ArrowUpRight } from "./Arrow";

const ease = [0.22, 1, 0.36, 1] as const;

/** Top banner image — replace with src/assets/images/hero-studio.jpg */
const HERO_IMAGE = localImage(
  "hero-studio.jpg",
  "https://images.pexels.com/photos/8546658/pexels-photo-8546658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
);

export default function LandingHero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="overflow-hidden bg-white pt-[72px] md:pt-[82px]" aria-labelledby="hero-title">
      <div className="section-wrap flex min-h-[430px] flex-col justify-between gap-8 pb-10 pt-12 md:min-h-[470px] md:gap-10 md:pb-12 md:pt-14 xl:min-h-[530px]">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-playfair text-[clamp(1.35rem,2.6vw,2.4rem)] italic text-gold-600"
          >
            Hello, I'm
          </motion.p>
          <h1 id="hero-title" className="mt-2 flex flex-wrap items-baseline gap-x-[0.18em] font-grotesk text-[clamp(3.1rem,9.8vw,10.25rem)] font-bold leading-[0.86] tracking-[-0.09em] text-royal-900">
            <span className="hero-type-mask">
              <motion.span
                className="inline-block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: reduced ? 0 : 0.1, ease }}
              >
                Abdulamid
              </motion.span>
            </span>
            <span className="hero-type-mask">
              <motion.span
                className="inline-block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: reduced ? 0 : 0.22, ease }}
              >
                Alaran<span className="text-gold-500">.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        <div className="grid gap-6 border-t border-royal-900/15 pt-6 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-14 md:pt-7 xl:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduced ? 0 : 0.34, ease }}
          >
            <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.19em] text-gold-600 md:text-xs">
              A+ Graphics / 4+ years of design, video &amp; print
            </p>
            <h2 className="mt-3 max-w-[760px] font-grotesk text-[clamp(1.8rem,3.9vw,4rem)] font-bold leading-[1.08] tracking-[-0.06em] text-royal-950">
              Graphic designer <span className="font-playfair font-medium italic text-gold-600">&amp;</span>{" "}
              video editor.
            </h2>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: reduced ? 0 : 0.5, ease }}
          >
            <p className="max-w-[410px] text-[14px] leading-[1.75] text-royal-950/65 md:text-base">
              I turn ideas into expressive visuals, thoughtful designs and videos with a point of view. Welcome to my creative world.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-7">
              <a href="#work" className="arrow-hover inline-flex items-center gap-3 bg-gold-500 px-5 py-3.5 font-grotesk text-sm font-bold text-royal-950 transition-colors hover:bg-gold-400">
                See what I create <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="link-underline arrow-hover inline-flex items-center gap-2 font-grotesk text-sm font-bold text-royal-900">
                Let's make something <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.35, delay: reduced ? 0 : 0.3, ease }}
        className="hidden h-[42svh] min-h-[280px] w-full overflow-hidden sm:block md:h-[48svh] md:min-h-[365px]"
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Royal blue, gold and white graphic design and print samples on a studio table"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
          initial={reduced ? false : { scale: 1.075 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.9, delay: reduced ? 0 : 0.3, ease }}
        />
      </motion.div>
    </section>
  );
}