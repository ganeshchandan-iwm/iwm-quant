import Hero from "@/components/sections/home/Hero";
import Playground from "@/components/sections/home/Playground";
import About from "@/components/sections/home/About";
import Values from "@/components/sections/home/Values";
import Pillars from "@/components/sections/home/Pillars";
import Manifesto from "@/components/sections/home/Manifesto";
import CorrelationSection from "@/components/sections/home/CorrelationSection";
import Culture from "@/components/sections/home/Culture";
import CareersTeaser from "@/components/sections/home/CareersTeaser";
import CtaBanner from "@/components/sections/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Playground />
      <About />
      <Values />
      <Pillars />
      <Manifesto />
      <CorrelationSection />
      <Culture />
      <CareersTeaser />
      <CtaBanner />
    </>
  );
}
