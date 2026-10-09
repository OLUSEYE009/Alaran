import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DESIGN_SERVICES, INQUIRY_ITEMS, PRINT_SERVICES, type ServicePath } from "../content";
import { makeWhatsAppLink, WHATSAPP_NUMBER } from "../contactConfig";
import { ArrowUpRight } from "./Arrow";
import Reveal from "./Reveal";

export type InquiryRequest = {
  id: number;
  path: ServicePath | "both";
  item?: string;
  project?: string;
};

type Props = { request: InquiryRequest | null };
type InquiryPath = ServicePath | "both";

const PATHS: { key: InquiryPath; label: string }[] = [
  { key: "design", label: "Graphic design" },
  { key: "printing", label: "Printing" },
  { key: "both", label: "Both" },
];

const SERVICE_ALIASES: Record<string, string> = {
  "Flyer or poster": "Flyers & campaigns",
  "Packaging or label": "Packaging & labels",
};

const DESIGN_OPTIONS = Array.from(new Set([...INQUIRY_ITEMS.design, ...DESIGN_SERVICES.map((service) => service.title)]));
const PRINT_OPTIONS = Array.from(new Set([...INQUIRY_ITEMS.printing, ...PRINT_SERVICES.map((service) => service.title)]));

export default function Inquiry({ request }: Props) {
  const [path, setPath] = useState<InquiryPath>("design");
  const [items, setItems] = useState<string[]>([]);
  const [project, setProject] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!request) return;
    setPath(request.path);
    setItems(request.item ? [SERVICE_ALIASES[request.item] || request.item] : []);
    setProject(request.project || "");
    setCopyStatus("");
  }, [request]);

  const options = useMemo(() => {
    const base = path === "design" ? DESIGN_OPTIONS : path === "printing" ? PRINT_OPTIONS : [...DESIGN_OPTIONS, ...PRINT_OPTIONS];
    return Array.from(new Set([...items, ...base]));
  }, [items, path]);

  const message = useMemo(() => {
    const greeting = `Hi Abdulamid${name.trim() ? `, I'm ${name.trim()}` : ""}.`;
    const service = path === "both" ? "graphic design and printing" : path === "design" ? "graphic design" : "printing";
    return [
      greeting,
      `I found A Plus Graphics and I'd like to discuss ${service}.`,
      items.length ? `I'm interested in: ${items.join(", ")}.` : "I have an idea I'd like to ask you about.",
      project ? `I liked the ${project} concept on your website and would like to discuss something similar.` : "",
      details.trim() ? `A little more about it: ${details.trim()}` : "",
      "Could you let me know the next steps and a starting quote?",
    ].filter(Boolean).join("\n\n");
  }, [name, path, items, project, details]);

  const choosePath = (next: InquiryPath) => {
    setPath(next);
    setItems([]);
    setProject("");
    setCopyStatus("");
  };

  const toggleItem = (item: string) => {
    setItems((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
    setCopyStatus("");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Message copied. Paste it into your chat with Abdulamid.");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = message;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      const copied = document.execCommand("copy");
      temp.remove();
      setCopyStatus(copied ? "Message copied. Paste it into your chat with Abdulamid." : "Copy unavailable. Use the WhatsApp button instead.");
    }
  };

  return (
    <section id="contact" className="border-t border-royal-900/15 bg-white py-24 md:py-36" aria-labelledby="contact-heading">
      <div className="section-wrap grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-[clamp(4rem,8vw,9rem)]">
        <Reveal>
          <p className="section-label">08 / Let's talk</p>
          <h2 id="contact-heading" className="display-heading mt-5 text-[clamp(3.7rem,7.5vw,8rem)]">
            Got an <em className="display-accent">idea?</em>
          </h2>
          <p className="mt-8 max-w-[410px] text-base leading-[1.8] text-royal-950/65">
            Tell me what you want to create. Pick your services, add a little context and send a ready-made message on WhatsApp.
          </p>
          <p className="mt-9 font-playfair text-[clamp(1.4rem,2.1vw,2rem)] italic text-royal-900">
            The good stuff starts with a conversation.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-royal-900/25 pt-7">
            <p id="inquiry-path-label" className="font-grotesk text-xs font-bold uppercase tracking-[0.18em] text-royal-900">01 / What do you need?</p>
            <div className="mt-5 grid grid-cols-3 border border-royal-900/20" role="group" aria-labelledby="inquiry-path-label">
              {PATHS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => choosePath(option.key)}
                  aria-pressed={path === option.key}
                  className={`relative min-h-[58px] border-r border-royal-900/20 px-2 py-3 font-grotesk text-[11px] font-bold leading-tight transition-colors last:border-r-0 sm:text-sm ${path === option.key ? "text-royal-950" : "text-royal-900/50 hover:text-royal-900"}`}
                >
                  {path === option.key && <motion.span layoutId="inquiry-selected-path" transition={{ duration: reduced ? 0.01 : 0.32 }} className="absolute inset-0 bg-gold-500" />}
                  <span className="relative z-10">{option.label}</span>
                </button>
              ))}
            </div>

            <p id="inquiry-services-label" className="mt-9 font-grotesk text-xs font-bold uppercase tracking-[0.18em] text-royal-900">02 / Pick what you have in mind</p>
            <div className="mt-4 grid border-t border-royal-900/20 sm:grid-cols-2" role="group" aria-labelledby="inquiry-services-label">
              {options.map((item) => {
                const active = items.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(item)}
                    aria-pressed={active}
                    className="group flex min-h-[56px] items-center justify-between gap-3 border-b border-royal-900/15 py-3 pr-3 text-left font-grotesk text-[13px] font-semibold text-royal-900 transition-colors hover:text-royal-700 sm:mr-5"
                  >
                    <span>{item}</span>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border text-[12px] leading-none transition-colors ${active ? "border-gold-500 bg-gold-500 text-royal-950" : "border-royal-900/30 text-transparent group-hover:border-gold-500"}`} aria-hidden="true">+</span>
                  </button>
                );
              })}
            </div>

            {project && (
              <div className="mt-6 flex items-center justify-between gap-4 border-l-[3px] border-gold-500 bg-royal-50 px-4 py-3 text-sm text-royal-900">
                <span>Inspired by: <strong>{project}</strong></span>
                <button type="button" onClick={() => setProject("")} aria-label="Remove selected project" className="font-grotesk text-xl leading-none">×</button>
              </div>
            )}

            <div className="mt-9 grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="inquiry-name" className="font-grotesk text-xs font-bold uppercase tracking-[0.18em] text-royal-900">Your name / optional</label>
                <input id="inquiry-name" type="text" autoComplete="name" maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="What should I call you?" className="mt-3 w-full rounded-none border-0 border-b border-royal-900/25 bg-white px-0 py-3 text-sm text-royal-900 outline-none transition-colors placeholder:text-royal-900/40 focus:border-gold-600 focus:ring-0" />
              </div>
              <div>
                <label htmlFor="inquiry-details" className="font-grotesk text-xs font-bold uppercase tracking-[0.18em] text-royal-900">A few details / optional</label>
                <input id="inquiry-details" type="text" maxLength={400} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Quantity, deadline, the idea..." className="mt-3 w-full rounded-none border-0 border-b border-royal-900/25 bg-white px-0 py-3 text-sm text-royal-900 outline-none transition-colors placeholder:text-royal-900/40 focus:border-gold-600 focus:ring-0" />
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <a href={makeWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="arrow-hover inline-flex items-center gap-4 bg-gold-500 px-6 py-4 font-grotesk text-sm font-bold text-royal-950 transition-colors hover:bg-gold-400">
                Continue in WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
              <button type="button" onClick={copyMessage} className="link-underline font-grotesk text-sm font-bold text-royal-900">Copy message instead</button>
            </div>
            <p className="mt-5 max-w-[620px] text-xs leading-[1.7] text-royal-950/55">
              {WHATSAPP_NUMBER ? "WhatsApp opens Abdulamid's chat with your selections already in the message. Review and send it there." : "WhatsApp opens with your message ready. Choose Abdulamid's chat to send it. A direct chat link can be enabled when his verified number is supplied."}
            </p>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs font-semibold text-royal-700">{copyStatus}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}