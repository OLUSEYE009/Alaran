import { useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import type { ServicePath } from "./content";
import SiteHeader from "./components/SiteHeader";
import LandingHero from "./components/LandingHero";
import StudioStory from "./components/StudioStory";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import ServicePaths from "./components/ServicePaths";
import PrintStudio from "./components/PrintStudio";
import Clients from "./components/Clients";
import RateGuide from "./components/RateGuide";
import Inquiry, { type InquiryRequest } from "./components/Inquiry";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  const [pricingPath, setPricingPath] = useState<ServicePath>("design");
  const [request, setRequest] = useState<InquiryRequest | null>(null);
  const requestId = useRef(0);

  const choosePath = (path: ServicePath) => {
    setPricingPath(path);
    setRequest({ id: ++requestId.current, path });
  };

  const startInquiry = (path: ServicePath, item?: string, project?: string) => {
    setPricingPath(path);
    setRequest({ id: ++requestId.current, path, item, project });
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onChoosePath={choosePath} />
      <main>
        <LandingHero />
        <StudioStory />
        <Skills />
        <Portfolio onDiscussProject={(title) => startInquiry("design", undefined, title)} />
        <ServicePaths onPickService={(path, service) => startInquiry(path, service)} />
        <PrintStudio
          onPickPrint={(service) => startInquiry("printing", service)}
          onPrintPricing={() => choosePath("printing")}
        />
        <Clients />
        <RateGuide
          path={pricingPath}
          onPathChange={choosePath}
          onPickRate={(path, service) => startInquiry(path, service || undefined)}
        />
        <Inquiry request={request} />
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}
