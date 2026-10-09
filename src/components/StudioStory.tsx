import { motion, useReducedMotion } from "motion/react";
import { localImage } from "../assets/images";
import { ArrowUpRight } from "./Arrow";
import { LogoMark } from "./Logo";

/**
 * YOUR PORTRAIT
 * Save your photo as:  src/assets/images/abdulamid.jpg
 * It will replace the placeholder automatically when you rebuild.
 */
const PORTRAIT = localImage(
  "src/assets/images/abdulamid.jpg",
  "https://images.pexels.com/photos/9617887/pexels-photo-9617887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1350&w=1000"
);

const DISCIPLINES = ["Graphic design", "Video editing", "Visual storytelling", "Print design"];

const ease = [0.22, 1, 0.36, 1] as const;

export default function StudioStory() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="bg-white py-20 md:py-32" aria-labelledby="about-heading">
      <div className="section-wrap grid items-center gap-16 lg:grid-cols-[0.8fr_1fr] lg:gap-[clamp(4rem,9vw,10rem)]">
        {/* Portrait — above the text on phones, beside it on desktop */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-[460px] pb-5 pr-5 lg:mx-0 lg:max-w-none lg:pb-7 lg:pr-7"
        >
          {/* Gold accent frame, offset behind the photo */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] border-[3px] border-gold-500 lg:h-[calc(100%-3.5rem)] lg:w-[calc(100%-3.5rem)]"
          />
          {/* Solid gold bar on the left edge */}
          <div
            aria-hidden="true"
            className="absolute -left-3 top-8 hidden h-24 w-3 bg-gold-500 lg:block"
          />

          <motion.div
            initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.05, ease }}
            className="relative z-10 aspect-[4/5] overflow-hidden bg-royal-50"
          >
            <motion.img
              src={PORTRAIT}
              alt="Abdulamid Alaran, graphic designer and video editor"
              loading="lazy"
              initial={reduced ? false : { scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.5, ease }}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>

          {/* Small gold name tag at the bottom-left corner */}
          <div className="absolute bottom-0 left-0 z-20 flex items-center gap-3 bg-gold-500 px-4 py-3 lg:px-5">
            <LogoMark className="h-6 w-6 lg:h-7 lg:w-7" idPrefix="about" />
            <span className="font-grotesk text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-royal-950 lg:text-xs">
              Abdulamid Alaran
              <span className="mt-0.5 block font-sans text-[9px] font-semibold normal-case tracking-[0.08em] text-royal-950/70 lg:text-[10px]">
                A+ Graphics · 4+ years
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease }}
        >
          <p className="section-label">01 / A little about me</p>
          <h2 id="about-heading" className="display-heading mt-5 text-[clamp(3.2rem,6.5vw,6.8rem)]">
            Ideas are my <em className="display-accent">thing.</em>
          </h2>
          <p className="mt-8 max-w-[670px] font-grotesk text-[clamp(1.15rem,1.9vw,1.8rem)] font-semibold leading-[1.4] tracking-[-0.045em] text-royal-900">
            I'm Abdulamid Alaran, a graphic designer, video editor and all-round creative with 4+ years of turning ideas into work people remember.
          </p>
          <p className="mt-5 max-w-[590px] text-[15px] leading-[1.9] text-royal-950/65 md:text-base">
            I enjoy moving between still and moving images: building a visual identity, shaping a flyer, then giving an idea rhythm through video. I bring curiosity, an eye for detail and a hands-on approach to every project.
          </p>
          <p className="mt-4 max-w-[590px] text-[15px] leading-[1.9] text-royal-950/65 md:text-base">
            Through A+ Graphics, I work with people and brands to turn a rough idea into something clear, memorable and ready to be seen. Whatever the medium, I want the finished work to feel considered and unmistakably yours.
          </p>

          <div className="mt-7 flex max-w-[570px] flex-wrap gap-x-5 gap-y-2 border-t border-royal-900/15 pt-5">
            {DISCIPLINES.map((discipline, index) => (
              <span key={discipline} className="flex items-center gap-2 font-grotesk text-[11px] font-bold uppercase tracking-[0.12em] text-royal-900/70">
                <span className="text-gold-600">0{index + 1}</span>
                {discipline}
              </span>
            ))}
          </div>

          <a href="#work" className="link-underline arrow-hover mt-8 inline-flex items-center gap-3 font-grotesk text-sm font-bold text-royal-900">
            See what I create <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
