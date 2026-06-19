import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC =
  "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/4fmoi0f4_Kudmayi-Film-Version-8k-Video-Rocky-Aur-Rani-Kii-Prem-Kahaani-Ranveer-Alia-Shahid-Pritam%20%28mp3cut.net%29.mp3";

export default function MusicButton({ active }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.src = MUSIC_SRC;
      a.loop = true;
      a.volume = 0.45;
      a.preload = "auto";
      audioRef.current = a;
    }
  }, []);

  // Auto-start music once the envelope is opened (user-initiated)
  useEffect(() => {
    if (active && !startedRef.current && audioRef.current) {
      startedRef.current = true;
      const a = audioRef.current;
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked; user can toggle manually via the button
          setPlaying(false);
        });
    }
  }, [active]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  if (!active) return null;

  return (
    <button
      className={`music-btn ${playing ? "active" : ""}`}
      onClick={toggle}
      aria-label="Toggle music"
      title={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
