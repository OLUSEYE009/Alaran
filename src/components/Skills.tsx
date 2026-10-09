import Reveal from "./Reveal";

const TOOL_GROUPS = [
  {
    label: "Design",
    tools: ["Photoshop", "Illustrator", "InDesign", "CorelDRAW", "Figma"],
  },
  {
    label: "Video & motion",
    tools: ["Premiere Pro", "After Effects", "Short-form edits"],
  },
  {
    label: "Print",
    tools: ["Print-ready files", "Colour matching", "Large format", "Signage"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Listen & brief",
    desc: "Every job starts with your idea, your audience and your deadline.",
  },
  {
    step: "02",
    title: "Concept & design",
    desc: "Moodboards, first drafts and a clear visual direction.",
  },
  {
    step: "03",
    title: "Refine",
    desc: "You review, I sharpen, until it feels exactly right.",
  },
  {
    step: "04",
    title: "Print & deliver",
    desc: "Files prepared, printed and handed over ready to use.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-royal-900/10 bg-white py-24 md:py-32" aria-labelledby="skills-heading">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">02 / Skills &amp; process</p>
          <h2 id="skills-heading" className="display-heading mt-5 text-[clamp(3rem,6.4vw,6.5rem)]">
            Tools, practice <em className="display-accent">&amp; process.</em>
          </h2>
          <p className="mt-6 max-w-[520px] text-base leading-relaxed text-royal-950/65">
            The software I work in and the simple, reliable way every project gets done.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Tools */}
          <Reveal>
            <div className="space-y-9">
              {TOOL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                    {group.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-royal-900/25 px-4 py-2.5 font-grotesk text-xs font-bold tracking-[-0.01em] text-royal-900 transition-colors duration-300 hover:border-royal-900 hover:bg-royal-900 hover:text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Process */}
          <Reveal delay={120}>
            <div className="border-t border-royal-900/25">
              {PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="group grid grid-cols-[3.2rem_1fr] gap-4 border-b border-royal-900/15 py-6 transition-colors duration-300 hover:bg-royal-50 md:gap-6 md:px-3 md:py-7"
                >
                  <span className="pt-1 font-grotesk text-sm font-bold text-gold-600">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-grotesk text-[clamp(1.2rem,1.9vw,1.7rem)] font-bold leading-tight tracking-[-0.05em] text-royal-900 transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[380px] text-sm leading-relaxed text-royal-950/60">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
