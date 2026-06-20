import React from "react";

export default function HeroInvite() {
  return (
    <section className="hero" id="hero">
      <div className="hero-corner" />
      <div className="hero-card">
        <img
          className="hero-icon reveal"
          src="https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/jwuciqyq_imgdownloader-c7fe28f7.png"
          alt="Lord Ganesha"
        />
        <div className="god-quote reveal reveal-d1">
          ॥ श्री गणेशाय नमः ॥
          <br />
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </div>
        <div className="intro-text reveal reveal-d2">
          With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of
        </div>
        <div className="couple-name shimmer reveal reveal-d2">Sunit</div>
        <div className="amp-row reveal reveal-d3">
          <span className="amp-line" />
          <span className="amp">&amp;</span>
          <span className="amp-line" />
        </div>
        <div className="couple-name shimmer reveal reveal-d3">Dipika</div>
        <div className="parent-sub reveal reveal-d4">
          Son of Mr. Pradeep Kumar Behera &amp; Mrs. Sabita Behera
          <br />
          Daughter of Mr. Duryodhan Behera &amp; Mrs. Suchitra Behera
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to see magic</span>
        <br />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function GaneshaIcon() {
  return (
    <svg className="hero-icon reveal" viewBox="0 0 100 100" fill="none" stroke="#8A4F4C" strokeWidth="1.2">
      {/* lotus base */}
      <path d="M20 78 Q30 65 50 70 Q70 65 80 78 Z" fill="#f1dcd5" stroke="#8A4F4C" strokeWidth="1"/>
      <path d="M28 76 Q40 60 50 72" />
      <path d="M72 76 Q60 60 50 72" />
      {/* ganesha head */}
      <ellipse cx="50" cy="42" rx="18" ry="20" fill="#fbf3ea" />
      {/* crown */}
      <path d="M34 25 Q50 8 66 25" />
      <circle cx="50" cy="14" r="2" fill="#C9A24B" stroke="none" />
      {/* ears */}
      <path d="M30 38 Q22 40 26 50 Q30 52 33 48" />
      <path d="M70 38 Q78 40 74 50 Q70 52 67 48" />
      {/* eyes */}
      <circle cx="42" cy="40" r="1.2" fill="#8A4F4C" />
      <circle cx="58" cy="40" r="1.2" fill="#8A4F4C" />
      {/* trunk */}
      <path d="M50 46 Q46 56 50 62 Q54 66 52 70" />
      {/* tilak */}
      <path d="M50 28 L50 36" stroke="#C9A24B" strokeWidth="1.4" />
    </svg>
  );
}
