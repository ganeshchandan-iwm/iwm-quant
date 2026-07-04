import Hero from "@/components/sections/home/Hero";
import Playground from "@/components/sections/home/Playground";
import About from "@/components/sections/home/About";
import Pillars from "@/components/sections/home/Pillars";
import Culture from "@/components/sections/home/Culture";
import CareersTeaser from "@/components/sections/home/CareersTeaser";
import CtaBanner from "@/components/sections/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Playground />
      <About />
      <Pillars />
      <Culture />
      <CareersTeaser />
      <CtaBanner />
    </>
  );
}
