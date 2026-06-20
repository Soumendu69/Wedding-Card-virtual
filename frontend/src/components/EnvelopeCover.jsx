import React, { useState } from "react";

export default function EnvelopeCover({ opened, onOpen }) {
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    if (animating || opened) return;
    setAnimating(true);
    // Let the open animation play, then notify parent
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div
      className={`envelope-wrap ${opened ? "is-gone" : ""} ${animating ? "is-opening" : ""}`}
      onClick={handleOpen}
      role="button"
      aria-label="Tap to reveal invitation"
    >
      <div className="env-paper" />
      <div className="env-flowers" />
      <div className="env-fold-bottom" />
      <div className="env-fold-left" />
      <div className="env-fold-right" />

      {/* Sun rays burst (only visible during opening animation) */}
      <div className="sun-rays" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="ray"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
          />
        ))}
        <div className="sun-glow" />
      </div>

      <div className="tap-to-reveal">Tap to Reveal</div>

      <div className="wax-seal">
        <div className="wax-monogram">D&amp;S</div>
      </div>

      <SparklesDeco />
    </div>
  );
}

function SparklesDeco() {
  return (
    <svg
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        opacity: 0.6,
        zIndex: 2,
      }}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="#f0d9a7"
    >
      <path d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z" />
    </svg>
  );
}
