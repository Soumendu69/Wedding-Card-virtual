import React, { useEffect, useRef, useState } from "react";

const CARDS = [
  { label: "MONTH", value: "JULY" },
  { label: "DAY", value: "01" },
  { label: "YEAR", value: "2026" },
];

export default function SaveTheDate() {
  return (
    <section className="scratch-section" id="countdown-section">
      <span className="scratch-title-sup reveal">The Date</span>
      <h2 className="scratch-title reveal reveal-d1">Save the Date</h2>
      <p className="scratch-sub reveal reveal-d2">
        Scratch below to reveal our wedding date
      </p>

      <div className="scratch-grid">
        {CARDS.map((c, i) => (
          <div className="scratch-item reveal" key={c.label} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
            <span className="scratch-label">{c.label}</span>
            <ScratchCard value={c.value} />
            <div className="scratch-hint">
              <span className="arrow">↑</span> SCRATCH
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScratchCard({ value }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // base scratch fill
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#C2807E");
    grad.addColorStop(1, "#9E5F5D");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // texture dots
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * rect.width,
        Math.random() * rect.height,
        Math.random() * 2 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // word SCRATCH
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 16px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "4px";
    ctx.fillText("SCRATCH", rect.width / 2, rect.height / 2);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  };

  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 200;
    for (let i = 0; i < data.length; i += 4 * step) {
      if (data[i + 3] === 0) cleared++;
    }
    const ratio = cleared / (data.length / (4 * step));
    if (ratio > 0.45 && !revealed) {
      setRevealed(true);
      // clear remaining
      ctx.clearRect(0, 0, width, height);
    }
  };

  const handleDown = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const p = getPos(e);
    scratchAt(p.x, p.y);
  };
  const handleMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const p = getPos(e);
    scratchAt(p.x, p.y);
  };
  const handleUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="scratch-card">
      <div className="reveal-bg">{value}</div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
      )}
    </div>
  );
}
