import { useState } from "react";
import { DESIGN_SERVICES, PRINT_SERVICES, type ServicePath } from "../content";
import { localImage } from "../assets/images";
import { ArrowUpRight } from "./Arrow";
import Reveal from "./Reveal";

type Props = {
  onPickService: (path: ServicePath, service: string) => void;
};

const DESIGN_IMAGE = localImage(
  "service-design.jpg",
  "https://images.pexels.com/photos/8768116/pexels-photo-8768116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100"
);

const PRINTING_IMAGE = localImage(
  "service-printing.jpg",
  "https://images.pexels.com/photos/10617290/pexels-photo-10617290.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100"
);

const GROUPS: {
  number: string;
  title: string;
  path: ServicePath;
  description: string;
  link: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  services: typeof DESIGN_SERVICES;
}[] = [
  {
    number: "01",
    title: "Graphic design",
    path: "design",
    description: "Visual identity, campaign artwork and motion designed to stand out.",
    link: "#work",
    linkLabel: "See design work",
    image: DESIGN_IMAGE,
    imageAlt: "Close-up of an artist's hand drawing on a graphics tablet",
    services: DESIGN_SERVICES,
  },
  {
    number: "02",
    title: "Printing",
    path: "printing",
    description: "From flyers and business cards to large-scale banners and signage.",
    link: "#printing",
    linkLabel: "Explore printing",
    image: PRINTING_IMAGE,
    imageAlt: "People creating a handprint mural on a large white printed sheet",
    services: PRINT_SERVICES,
  },
];

export default function ServicePaths({ onPickService }: Props) {
  const [mobilePath, setMobilePath] = useState<ServicePath>("design");

  return (
    <section id="services" className="border-t border-royal-900/10 bg-white py-24 md:py-36" aria-labelledby="services-heading">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">04 / What I do</p>
          <h2 id="services-heading" className="display-heading mt-4 text-[clamp(4rem,9.4vw,10rem)]">
            services<span className="text-gold-500">.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-base leading-relaxed text-royal-950/65">
            Two distinct disciplines under one roof: strategic visual design and physical print production.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 border border-royal-900/20 sm:hidden" role="group" aria-label="Choose a service area">
          {GROUPS.map((group) => (
            <button
              key={group.path}
              type="button"
              aria-pressed={mobilePath === group.path}
              aria-controls={`service-panel-${group.path}`}
              onClick={() => setMobilePath(group.path)}
              className={`min-h-14 px-3 py-3 font-grotesk text-sm font-bold transition-colors duration-300 first:border-r first:border-royal-900/20 ${mobilePath === group.path ? "bg-gold-500 text-royal-950" : "bg-white text-royal-900 hover:bg-royal-50"}`}
            >
              {group.title}
            </button>
          ))}
        </div>

        <div className="mt-0 border-t border-royal-900/25 sm:mt-14">
          {GROUPS.map((group) => (
            <Reveal key={group.path} className={mobilePath === group.path ? "" : "max-sm:hidden"}>
              <div id={`service-panel-${group.path}`} className="grid gap-7 border-b border-royal-900/25 py-8 sm:gap-9 sm:py-12 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 xl:gap-20">
                {/* Left side: Information with full-bleed background image on desktop/tablet */}
                <div className="relative overflow-hidden bg-royal-950 p-6 text-white sm:flex sm:min-h-[460px] sm:flex-col sm:justify-between sm:p-9 md:p-12 lg:min-h-[500px]">
                  {/* Image background - only on tablet/desktop */}
                  <div className="absolute inset-0 hidden sm:block" aria-hidden="true">
                    <img
                      src={group.image}
                      alt=""
                      className="h-full w-full object-cover opacity-35 transition-transform duration-[1200ms] hover:scale-105"
                    />
                  </div>

                  {/* Decorative border at the very bottom edge */}
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gold-500" aria-hidden="true" />

                  <div className="relative z-10">
                    <p className="font-grotesk text-[10px] font-bold tracking-[0.2em] text-gold-400 sm:text-xs">
                      {group.number} / {group.path === "design" ? "VISUAL IDEAS & MOTION" : "PHYSICAL PRODUCTION"}
                    </p>
                    <h3 className="mt-4 font-grotesk text-[clamp(2.2rem,4.2vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.07em] text-white">
                      {group.title}
                    </h3>
                    <p className="mt-4 max-w-[390px] text-sm leading-relaxed text-white/80 sm:text-base">
                      {group.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 sm:mt-0">
                    <a
                      href={group.link}
                      className="link-underline arrow-hover inline-flex items-center gap-3 font-grotesk text-sm font-bold text-gold-400 hover:text-white"
                    >
                      {group.linkLabel} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Right side: Interactive Service list */}
                <div className="border-t border-royal-900/15 sm:mt-2 lg:mt-0">
                  {group.services.map((service, index) => (
                    <button
                      key={service.title}
                      type="button"
                      onClick={() => onPickService(group.path, service.title)}
                      className="group flex w-full items-center gap-4 border-b border-royal-900/15 py-5 text-left transition-colors duration-300 hover:text-gold-600 md:gap-6 md:py-6"
                      aria-label={`Enquire about ${service.title}`}
                    >
                      <span className="self-start pt-1 font-grotesk text-[11px] font-bold text-gold-600">0{index + 1}</span>
                      <span className="flex-1">
                        <span className="block font-grotesk text-[clamp(1.2rem,2vw,2rem)] font-bold leading-tight tracking-[-0.05em] text-royal-900 transition-transform duration-300 group-hover:translate-x-1">{service.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-royal-950/55">{service.description}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-royal-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
