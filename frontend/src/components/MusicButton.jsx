import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicButton({ active }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      // soft instrumental from a public source (mocked silent for demo)
      a.src = "https://cdn.pixabay.com/download/audio/2022/10/14/audio_3c1a9b6f47.mp3?filename=indian-wedding-shehnai-122024.mp3";
      a.loop = true;
      a.volume = 0.4;
      audioRef.current = a;
    }
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!active) return null;

  return (
    <button
      className={`music-btn ${playing ? "active" : ""}`}
      onClick={toggle}
      aria-label="Toggle music"
    >
      {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
