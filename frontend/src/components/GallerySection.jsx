import React from "react";

const PHOTOS = [
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/nfyxfb90_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_13_12%20AM.png",
    title: "Boundless",
    caption: "\u201CHappiness is a day at the beach with you.\u201D",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/3ta7acmt_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_12_11%20AM.png",
    title: "Forever",
    caption: "\u201CEvery sunset with you feels like a beginning.\u201D",
  },
];

export default function GallerySection() {
  return (
    <section className="section-gentle memories-section">
      <span className="scratch-title-sup reveal">Our Story</span>
      <h2 className="scratch-title reveal reveal-d1">Moments Together</h2>
      <p className="scratch-sub reveal reveal-d2">A glimpse into our journey</p>

      <div className="memories-stack">
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="memory-card"
            style={{
              top: `${6 + i * 3}rem`,
              zIndex: i + 1,
            }}
          >
            <img src={p.src} alt={p.title} loading="lazy" />
            <div className="memory-overlay">
              <h3>{p.title}</h3>
              <p>{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
