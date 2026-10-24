import SIGN_01 from "./assets/images/mockup-01.jpeg";
import SIGN_02 from "./assets/images/mockup-02.jpeg";
import SIGN_03 from "./assets/images/mockup-03.jpeg";
import MOCK_01 from "./assets/images/signage1.jpg";
import MOCK_02 from "./assets/images/signage2.jpg";
import MOCK_03 from "./assets/images/signage3.jpg";
import FLYER_01 from "./assets/images/flyer1.jpg";
import FLYER_02 from "./assets/images/flyer2.jpg";
import FLYER_03 from "./assets/images/flyer3.jpg";
import BRAND_01 from "./assets/images/brand1.png";
import BRAND_02 from "./assets/images/brand2.png";
import BRAND_03 from "./assets/images/brand3.jpeg";

/* ==========================================================================
   HOW TO ADD YOUR REAL PROJECT IMAGES
   --------------------------------------------------------------------------
   Put each image inside:   src/assets/images/
   Name it EXACTLY like the filename in the import at the top of this file.
   Mockups, flyers, branding and signage images are imported directly, so
   their file names and extensions must match those imports exactly.

   Key Images:
   - Your portrait:   src/assets/images/abdulamid.jpg   (About section)
   - Top banner:      src/assets/images/hero-studio.jpg (Hero workspace photo)
   - Graphic Design:  src/assets/images/service-design.jpg (Services section)
   - Printing:        src/assets/images/service-printing.jpg (Services section)
   - Mockups:         src/assets/images/signage1.jpg, signage2.jpg, signage3.jpg
   - Flyers:          src/assets/images/flyer1.jpg, flyer2.jpg, flyer3.jpg
   - Branding:        src/assets/images/brand1.jpg, brand2.jpg, brand3.jpg
   - Signage:         src/assets/images/mockup-01.jpeg, mockup-02.jpeg, mockup-03.jpeg
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
      title: "Shoe packaging",
      discipline: "Product mockup",
      description: "Luxury shoe packaging and premium finishes.",
      approach: "A restrained visual system lets the material, monogram and finish carry the character of the brand.",
      details: ["3D mockup", "Packaging design", "Foil finish"],
      image: MOCK_01,
      alt: "Jarulee Shoe packaging mockup",
    },
    {
      title: "Food Business Bag set",
      discipline: "Branded Bag mockup",
      description: "Premium business bag with embossed logo details.",
      approach: "Tactile details that make a first impression memorable.",
      details: ["Embossing", "Product photography", "Premium stock"],
      image: MOCK_02,
      alt: "Food Business bag mockup",
    },
    {
      title: "Whole Shield ",
      discipline: "mockup",
      description: "Whole shiel station design and clean typography.",
      approach: "A simple language creates recognition across the product line.",
      details: ["Label design", "3D Render", "Mockup render"],
      image: MOCK_03,
      alt: "Wholeshield Station mockup",
    },
  ],
  flyers: [
    {
      title: "Food campaign",
      discipline: "Flyer direction",
      description: "A bold, appetite-led print direction for a food promotion.",
      approach: "An expressive headline, a rich food image and a layout designed to catch attention in hand or on a feed.",
      details: ["Promotional flyer", "Social adaptation", "Print concept"],
      image: FLYER_01,
      alt: "Illustrative food promotion flyer mockup",
    },
    {
      title: "Product launch",
      discipline: "Promotional print",
      description: "A refined launch layout with considered type and a striking product image.",
      approach: "Quiet space around the product gives the launch message room to feel elevated and memorable.",
      details: ["Launch artwork", "Product story", "Print concept"],
      image: FLYER_02,
      alt: "Illustrative perfume launch flyer mockup",
    },
    {
      title: "Opening invitation",
      discipline: "Event collateral",
      description: "An event announcement designed to work in hand and on screen.",
      approach: "A clear hierarchy makes the invitation easy to read while still feeling like an occasion.",
      details: ["Event flyer", "Invitation", "Print concept"],
      image: FLYER_03,
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
      image: BRAND_01,
      alt: "Illustrative luxury fragrance identity mockup",
    },
    {
      title: "Bottled character",
      discipline: "Packaging system",
      description: "A clean product system that carries from shelf to story.",
      approach: "A simple wave-inspired language creates recognition across the bottle, label and campaign.",
      details: ["Label concept", "Bottle mockup", "Brand system"],
      image: BRAND_02,
      alt: "Illustrative bottled water branding mockup",
    },
    {
      title: "Wear the mark",
      discipline: "Fashion identity",
      description: "A flexible visual language for labels, clothing and packaging.",
      approach: "The mark stays confident whether it is embroidered, printed, or scaled down to a hang tag.",
      details: ["Identity direction", "Apparel mockup", "Packaging"],
      image: BRAND_03,
      alt: "Illustrative apparel brand identity mockup",
    },
  ],
  signage: [
    {
      title: "Atelier Nezer",
      discipline: "Exterior signage",
      description: "Clear, confident building identification with real-world presence.",
      approach: "Legibility at a distance shapes the scale, contrast and placement of every element.",
      details: ["Exterior sign", "Wayfinding idea", "Billboard mockup"],
      image: SIGN_01,
      alt: "Exterior signage by Abdulamid Alaran",
    },
    {
      title: "Taiwan Acrylic  Plastic",
      discipline: "Illuminated signage",
      description: "Dimensional lettering designed to make an entrance memorable.",
      approach: "A sign that is part of the building by day and a landmark in its own right by night.",
      details: ["Lit lettering", "Storefront mockup", "Material direction"],
      image: SIGN_02,
      alt: "Illuminated signage by Abdulamid Alaran",
    },
    {
      title: "The first impression",
      discipline: "Corporate signage",
      description: "A clear visual signature for a professional space.",
      approach: "A considered combination of lettering and symbol brings the visual identity into the room.",
      details: ["Interior sign", "Reception mockup", "Brand application"],
      image: SIGN_03,
      alt: "Corporate signage by Abdulamid Alaran",
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