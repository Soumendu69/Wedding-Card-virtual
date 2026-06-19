import React from "react";

export default function EnvelopeCover({ opened, onOpen }) {
  return (
    <div
      className={`envelope-wrap ${opened ? "hidden" : ""}`}
      onClick={onOpen}
      role="button"
      aria-label="Tap to reveal invitation"
    >
      <div className="env-paper" />
      <div className="env-flowers" />
      <div className="env-fold-left" />
      <div className="env-fold-right" />
      <div className="env-fold-bottom" />
      <div className="tap-to-reveal">Tap to Reveal</div>
      <div className="wax-seal">
        <div className="wax-monogram">R&amp;P</div>
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
