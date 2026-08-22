import { About } from "@/components/About";
import { Bridge } from "@/components/Bridge";
import { Collection } from "@/components/Collection";
import { Contact } from "@/components/Contact";
import { HeroStory } from "@/components/HeroStory";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <HeroStory />
        <Bridge />
        <Collection />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
