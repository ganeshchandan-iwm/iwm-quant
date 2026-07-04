import Hero from "@/components/sections/home/Hero";
import StatsBand from "@/components/sections/home/StatsBand";
import Pillars from "@/components/sections/home/Pillars";
import Performance from "@/components/sections/home/Performance";
import CtaBanner from "@/components/sections/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Pillars />
      <Performance />
      <CtaBanner />
    </>
  );
}
