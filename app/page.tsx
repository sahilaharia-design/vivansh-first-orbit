import Hero from "@/components/Hero";
import MamaLetter from "@/components/MamaLetter";
import WorldBornInto from "@/components/WorldBornInto";
import WorldsSection from "@/components/WorldsSection";
import BlessingsSection from "@/components/BlessingsSection";
import ClosingSection from "@/components/ClosingSection";
import ClientOnlyOverlays from "@/components/ClientOnlyOverlays";

export default function Home() {
  return (
    <main>
      <ClientOnlyOverlays />
      <Hero />
      <MamaLetter />
      <WorldBornInto />
      <WorldsSection />
      <BlessingsSection />
      <ClosingSection />
    </main>
  );
}
