import Hero from "@/components/Hero";
import NotesSection from "@/components/NotesSection";
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
      <NotesSection />
      <WorldBornInto />
      <WorldsSection />
      <BlessingsSection />
      <ClosingSection />
    </main>
  );
}
