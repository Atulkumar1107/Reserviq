import HeroSection from "@/components/HeroSection";
import TerrainManifesto from "@/components/TerrainManifesto";
import ThetaStateSection from "@/components/ThetaStateSection";
import BotanicalCollection from "@/components/BotanicalCollection";
import ResourceCenter from "@/components/ResourceCenter";
import NatureSection from "@/components/NatureSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";

import {
  heroData,
  terrainData,
  thetaData,
  productData,
  resourceData,
  natureData,
  CTAData,
  FAQData,
  contactData,
} from "@/data/homeData";

export default function Page() {
  return (
    <main>
      <HeroSection  />
      <TerrainManifesto  />
      <ThetaStateSection/>
      <BotanicalCollection  />
      <ResourceCenter  />
      <NatureSection  />
      <CTASection  />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
