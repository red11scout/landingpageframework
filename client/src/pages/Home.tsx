import { Navbar } from "@/components/atlas/Navbar";
import { Hero } from "@/components/atlas/Hero";
import { Timeline } from "@/components/atlas/Timeline";
import { Lineage } from "@/components/atlas/Lineage";
import { Explorer } from "@/components/atlas/Explorer";
import { Compare } from "@/components/atlas/Compare";
import { Canon } from "@/components/atlas/Canon";
import { Manuscripts } from "@/components/atlas/Manuscripts";
import { Variants } from "@/components/atlas/Variants";
import { Lenses } from "@/components/atlas/Lenses";
import { Finder } from "@/components/atlas/Finder";
import { Footer } from "@/components/atlas/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Lineage />
        <Explorer />
        <Compare />
        <Canon />
        <Manuscripts />
        <Variants />
        <Lenses />
        <Finder />
        <Footer />
      </main>
    </div>
  );
}
