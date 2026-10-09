import { localImage } from "./assets/images";

/* ==========================================================================
   HOW TO ADD YOUR REAL PROJECT IMAGES
   --------------------------------------------------------------------------
   Put each image inside:   src/assets/images/
   Name it EXACTLY like the filename inside localImage(...) below.
   Example: localImage("work-flyer-food.jpg", "https://...")
     → drop your file at  src/assets/images/work-flyer-food.jpg
     → rebuild → your image appears automatically.
   Until you add the file, the fallback photo is shown.

   Key Images:
   - Your portrait:   src/assets/images/abdulamid.jpg   (About section)
   - Top banner:      src/assets/images/hero-studio.jpg (Hero workspace photo)
   - Graphic Design:  src/assets/images/service-design.jpg (Services section)
   - Printing:        src/assets/images/service-printing.jpg (Services section)
   - Mockups:         src/assets/images/mockup-01.jpg, mockup-02.jpg, mockup-03.jpg
   - Flyers:          src/assets/images/work-flyer-food.jpg, work-flyer-perfume.jpg, work-flyer-event.jpg
   - Branding:        src/assets/images/work-brand-perfume.jpg, work-brand-water.jpg, work-brand-fashion.jpg
   - Signage:         src/assets/images/work-sign-health.jpg, work-sign-studio.jpg, work-sign-shield.jpg
   ========================================================================== */

export const DESIGN_CLIENTS = [
  "Whole Shield",
  "Delta",
  "Amoke Oge",
  "Chef MO's World",
  "Primux Stride",
  "Fola Perfumes",
  "Mohlad Waters",
  "Ibile Wears",
  "Heco Productions",
  "Canadah Catering Service and Rentals",
  "Action Health Incorporated",
];

export const PRINT_CLIENTS = [
  "OPay",
  "Whole Shield",
  "Delta",
  "Chef MO's World",
  "Fola Perfumes",
  "Mohlad Waters",
  "Heco Productions",
  "Action Health Incorporated",
];

export type WorkCategory = "all" | "mockups" | "flyers" | "branding" | "signage";

export const WORK_CATEGORIES: { key: WorkCategory; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "mockups", label: "Mockups" },
  { key: "flyers", label: "Flyers & posters" },
  { key: "branding", label: "Brand design" },
  { key: "signage", label: "Signage" },
];

export type WorkPreview = {
  title: string;
  discipline: string;
  description: string;
  approach: string;
  details: string[];
  image: string;
  alt: string;
};

export const WORK_PREVIEWS: Record<WorkCategory, WorkPreview[]> = {
  all: [],
  mockups: [
    {
      title: "Perfume packaging",
      discipline: "Product mockup",
      description: "Luxury fragrance packaging with gold foil details and premium finishes.",
      approach: "A restrained visual system lets the material, monogram and finish carry the character of the brand.",
      details: ["3D mockup", "Packaging design", "Foil finish"],
      // REPLACE → src/assets/images/mockup-01.jpg
      image: localImage("mockup-01.jpg", "https://images.pexels.com/photos/36779953/pexels-photo-36779953.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Perfume packaging mockup",
    },
    {
      title: "Business card set",
      discipline: "Stationery mockup",
      description: "Premium business cards with embossed logo and spot UV details.",
      approach: "Tactile details that make a first impression memorable.",
      details: ["Embossing", "Spot UV", "Premium stock"],
      // REPLACE → src/assets/images/mockup-02.jpg
      image: localImage("mockup-02.jpg", "https://images.pexels.com/photos/5706018/pexels-photo-5706018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Business card mockup",
    },
    {
      title: "Bottle label design",
      discipline: "Packaging mockup",
      description: "Water bottle label with wave-inspired pattern and clean typography.",
      approach: "A simple language creates recognition across the product line.",
      details: ["Label design", "Product photography", "Mockup render"],
      // REPLACE → src/assets/images/mockup-03.jpg
      image: localImage("mockup-03.jpg", "https://images.pexels.com/photos/31012803/pexels-photo-31012803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Bottle label mockup",
    },
  ],
  flyers: [
    {
      title: "Food campaign",
      discipline: "Flyer direction",
      description: "A bold, appetite-led print direction for a food promotion.",
      approach: "An expressive headline, a rich food image and a layout designed to catch attention in hand or on a feed.",
      details: ["Promotional flyer", "Social adaptation", "Print concept"],
      // REPLACE → src/assets/images/work-flyer-food.jpg
      image: localImage("work-flyer-food.jpg", "https://images.pexels.com/photos/8743888/pexels-photo-8743888.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative food promotion flyer mockup",
    },
    {
      title: "Product launch",
      discipline: "Promotional print",
      description: "A refined launch layout with considered type and a striking product image.",
      approach: "Quiet space around the product gives the launch message room to feel elevated and memorable.",
      details: ["Launch artwork", "Product story", "Print concept"],
      // REPLACE → src/assets/images/work-flyer-perfume.jpg
      image: localImage("work-flyer-perfume.jpg", "https://images.pexels.com/photos/36779955/pexels-photo-36779955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative perfume launch flyer mockup",
    },
    {
      title: "Opening invitation",
      discipline: "Event collateral",
      description: "An event announcement designed to work in hand and on screen.",
      approach: "A clear hierarchy makes the invitation easy to read while still feeling like an occasion.",
      details: ["Event flyer", "Invitation", "Print concept"],
      // REPLACE → src/assets/images/work-flyer-event.jpg
      image: localImage("work-flyer-event.jpg", "https://images.pexels.com/photos/5650018/pexels-photo-5650018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative opening event flyer mockup",
    },
  ],
  branding: [
    {
      title: "Fragrance identity",
      discipline: "Brand & packaging",
      description: "An identity direction built to feel distinctive at every touchpoint.",
      approach: "A restrained visual system lets the material, monogram and finish carry the character of the brand.",
      details: ["Identity direction", "Packaging", "Printed touchpoints"],
      // REPLACE → src/assets/images/work-brand-perfume.jpg
      image: localImage("work-brand-perfume.jpg", "https://images.pexels.com/photos/36779951/pexels-photo-36779951.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative luxury fragrance identity mockup",
    },
    {
      title: "Bottled character",
      discipline: "Packaging system",
      description: "A clean product system that carries from shelf to story.",
      approach: "A simple wave-inspired language creates recognition across the bottle, label and campaign.",
      details: ["Label concept", "Bottle mockup", "Brand system"],
      // REPLACE → src/assets/images/work-brand-water.jpg
      image: localImage("work-brand-water.jpg", "https://images.pexels.com/photos/593099/pexels-photo-593099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative bottled water branding mockup",
    },
    {
      title: "Wear the mark",
      discipline: "Fashion identity",
      description: "A flexible visual language for labels, clothing and packaging.",
      approach: "The mark stays confident whether it is embroidered, printed, or scaled down to a hang tag.",
      details: ["Identity direction", "Apparel mockup", "Packaging"],
      // REPLACE → src/assets/images/work-brand-fashion.jpg
      image: localImage("work-brand-fashion.jpg", "https://images.pexels.com/photos/30940601/pexels-photo-30940601.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative apparel brand identity mockup",
    },
  ],
  signage: [
    {
      title: "A place to find",
      discipline: "Exterior signage",
      description: "Clear, confident building identification with real-world presence.",
      approach: "Legibility at a distance shapes the scale, contrast and placement of every element.",
      details: ["Exterior sign", "Wayfinding idea", "Facade mockup"],
      // REPLACE → src/assets/images/work-sign-health.jpg
      image: localImage("work-sign-health.jpg", "https://images.pexels.com/photos/19093452/pexels-photo-19093452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative healthcare building signage mockup",
    },
    {
      title: "After dark",
      discipline: "Illuminated signage",
      description: "Dimensional lettering designed to make an entrance memorable.",
      approach: "A sign that is part of the building by day and a landmark in its own right by night.",
      details: ["Lit lettering", "Storefront mockup", "Material direction"],
      // REPLACE → src/assets/images/work-sign-studio.jpg
      image: localImage("work-sign-studio.jpg", "https://images.pexels.com/photos/10175387/pexels-photo-10175387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative illuminated studio signage mockup",
    },
    {
      title: "The first impression",
      discipline: "Corporate signage",
      description: "A clear visual signature for a professional space.",
      approach: "A considered combination of lettering and symbol brings the visual identity into the room.",
      details: ["Interior sign", "Reception mockup", "Brand application"],
      // REPLACE → src/assets/images/work-sign-shield.jpg
      image: localImage("work-sign-shield.jpg", "https://images.pexels.com/photos/5691036/pexels-photo-5691036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"),
      alt: "Illustrative corporate interior signage mockup",
    },
  ],
};

export const DESIGN_SERVICES = [
  {
    title: "Brand identity",
    description: "Logos and visual systems with a point of view.",
  },
  {
    title: "Flyers & campaigns",
    description: "Promotional artwork made to stop the scroll and the street.",
  },
  {
    title: "Packaging & labels",
    description: "A sharper presence for the products people pick up.",
  },
  {
    title: "Digital & social",
    description: "Consistent graphics wherever your audience finds you.",
  },
  {
    title: "Video editing",
    description: "A considered edit for reels, brand stories and short-form content.",
  },
  {
    title: "Motion graphics",
    description: "Typography and graphic elements that bring a visual idea to life.",
  },
];

export const PRINT_SERVICES = [
  {
    title: "Business stationery",
    description: "Cards, letterheads and everyday brand essentials.",
  },
  {
    title: "Flyers & posters",
    description: "Small-run and campaign print for events and launches.",
  },
  {
    title: "Banners & signage",
    description: "Large-format pieces made to be noticed from a distance.",
  },
  {
    title: "Labels & merchandise",
    description: "Printed details that travel with your product or people.",
  },
];

export type ServicePath = "design" | "printing";

export type Rate = {
  service: string;
  detail: string;
  amount: string;
};

// Indicative example rates until Abdulamid confirms the final price list.
export const RATE_GUIDE: Record<ServicePath, Rate[]> = {
  design: [
    { service: "Logo design", detail: "A distinctive mark and essential files", amount: "₦15,000" },
    { service: "Brand identity", detail: "A wider visual system for your business", amount: "₦50,000" },
    { service: "Flyer or poster", detail: "One print-ready design", amount: "₦8,000" },
    { service: "Business card design", detail: "Print-ready front and back", amount: "₦5,000" },
    { service: "Packaging or label", detail: "Artwork for a product or pack", amount: "₦20,000" },
  ],
  printing: [
    { service: "Business cards", detail: "100 pieces, standard finish", amount: "₦7,500" },
    { service: "A5 flyers", detail: "250 pieces, standard paper", amount: "₦15,000" },
    { service: "Flex banners", detail: "Per square metre", amount: "₦4,500" },
    { service: "Labels & stickers", detail: "50 pieces, standard finish", amount: "₦6,000" },
    { service: "Signage", detail: "Based on size and material", amount: "₦25,000" },
  ],
};

export const INQUIRY_ITEMS: Record<ServicePath, string[]> = {
  design: ["Logo design", "Brand identity", "Flyer or poster", "Packaging or label", "Social media artwork", "Business card design", "Video editing", "Motion graphics"],
  printing: ["Business cards", "A5 flyers", "Banners", "Labels & stickers", "Signage", "Merchandise"],
};

export type PrintFormat = "flyer" | "cards" | "labels" | "signage";

export const PRINT_FORMATS: { key: PrintFormat; title: string; detail: string; inquiryItem: string }[] = [
  { key: "flyer", title: "Flyers & posters", detail: "A message with room to move.", inquiryItem: "A5 flyers" },
  { key: "cards", title: "Business cards", detail: "Something worth keeping.", inquiryItem: "Business cards" },
  { key: "labels", title: "Labels & stickers", detail: "Small format, big presence.", inquiryItem: "Labels & stickers" },
  { key: "signage", title: "Signage", detail: "Made to be seen from afar.", inquiryItem: "Signage" },
];
