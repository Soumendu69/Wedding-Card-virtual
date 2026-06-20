import { useEffect, useState } from "react";
import "./App.css";
import EnvelopeCover from "./components/EnvelopeCover";
import HeroInvite from "./components/HeroInvite";
import SaveTheDate from "./components/SaveTheDate";
import EventsSection from "./components/EventsSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";
import FooterNote from "./components/FooterNote";
import PetalsCanvas from "./components/PetalsCanvas";
import MusicButton from "./components/MusicButton";

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [opened]);

  // Reveal-on-scroll observer
  useEffect(() => {
    if (!opened) return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [opened]);

  return (
    <div className="App">
      <PetalsCanvas active={opened} />
      <EnvelopeCover opened={opened} onOpen={() => setOpened(true)} />
      <MusicButton active={opened} />

      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroInvite />
        <SaveTheDate />
        <EventsSection />
        <GallerySection />
        <RSVPSection />
        <FooterNote />
      </main>
    </div>
  );
}

export default App;
