import React, { useEffect, useRef, useState } from "react";

const CARDS = [
  { label: "MONTH", value: "DECEMBER" },
  { label: "DAY", value: "25" },
  { label: "YEAR", value: "2026" },
];

const PETAL_COLORS = [
  "#E08A88", "#C2807E", "#F2C9C5", "#D9B86A", "#E6A8A4",
  "#F4D1C9", "#C9A24B", "#B97A78", "#F2DCD5", "#E6BD60",
];

export default function SaveTheDate() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showMegaBurst, setShowMegaBurst] = useState(false);
  const triggeredMega = useRef(false);

  const handleReveal = () => {
    setRevealedCount((c) => c + 1);
  };

  useEffect(() => {
    if (revealedCount >= 3 && !triggeredMega.current) {
      triggeredMega.current = true;
      setShowMegaBurst(true);
      setTimeout(() => setShowMegaBurst(false), 3200);
    }
  }, [revealedCount]);

  return (
    <section className="scratch-section" id="countdown-section">
      <span className="scratch-title-sup reveal">The Date</span>
      <h2 className="scratch-title reveal reveal-d1">Save the Date</h2>
      <p className="scratch-sub reveal reveal-d2">
        Scratch below to reveal our wedding date
      </p>

      <div className="scratch-grid">
        {CARDS.map((c, i) => (
          <div
            className="scratch-item reveal"
            key={c.label}
            style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
          >
            <span className="scratch-label">{c.label}</span>
            <ScratchCard value={c.value} onReveal={handleReveal} />
            <div className="scratch-hint">
              <span className="arrow">↑</span> SCRATCH
            </div>
          </div>
        ))}
      </div>

      {showMegaBurst && <MegaBurst />}
    </section>
  );
}

function ScratchCard({ value, onReveal }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [burstPetals, setBurstPetals] = useState([]);
  const isDrawing = useRef(false);
  const burstTriggered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#C2807E");
    grad.addColorStop(1, "#9E5F5D");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

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

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 16px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 200;
    let samples = 0;
    for (let i = 0; i < data.length; i += 4 * step) {
      if (data[i + 3] === 0) cleared++;
      samples++;
    }
    const ratio = cleared / samples;
    if (ratio > 0.45 && !revealed) {
      setRevealed(true);
      ctx.clearRect(0, 0, width, height);
      triggerBurst();
      if (onReveal) onReveal();
    }
  };

  const triggerBurst = () => {
    if (burstTriggered.current) return;
    burstTriggered.current = true;

    const petals = [];
    const total = 28;
    for (let i = 0; i < total; i++) {
      const fromLeft = i % 2 === 0;
      const baseAngle = fromLeft ? -10 : -170;
      const spread = 80;
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const distance = 90 + Math.random() * 100;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance - 30;
      const rot = (Math.random() - 0.5) * 720;
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      const size = 0.6 + Math.random() * 0.9;
      const delay = Math.random() * 0.15;

      petals.push({
        id: `${Date.now()}-${i}`,
        fromLeft,
        color,
        size,
        delay,
        tx: `${tx}px`,
        ty: `${ty}px`,
        rot: `${rot}deg`,
      });
    }
    setBurstPetals(petals);
    setTimeout(() => setBurstPetals([]), 1800);
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
      {burstPetals.length > 0 && (
        <div className="flower-burst">
          {burstPetals.map((p) => (
            <span
              key={p.id}
              className={`petal-burst ${p.fromLeft ? "from-left" : "from-right"}`}
              style={{
                "--tx": p.tx,
                "--ty": p.ty,
                "--rot": p.rot,
                background: p.color,
                animationDelay: `${p.delay}s`,
                transform: `translate(-50%, -50%) scale(${p.size})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MegaBurst() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const arr = [];
    const total = 90;
    for (let i = 0; i < total; i++) {
      const fromLeft = i % 2 === 0;
      // Random launch position along the vertical axis
      const startY = 20 + Math.random() * 60; // % of viewport height
      const baseAngle = fromLeft ? -15 : -165;
      const spread = 90;
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const distance = window.innerWidth * (0.5 + Math.random() * 0.55);
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance + (Math.random() - 0.3) * 200;
      const rot = (Math.random() - 0.5) * 1080;
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      const size = 0.8 + Math.random() * 1.5;
      const delay = Math.random() * 0.45;
      const duration = 1.8 + Math.random() * 1.4;

      arr.push({
        id: `mb-${i}`,
        fromLeft,
        startY,
        color,
        size,
        delay,
        duration,
        tx: `${tx}px`,
        ty: `${ty}px`,
        rot: `${rot}deg`,
      });
    }
    setPetals(arr);
  }, []);

  return (
    <div className="mega-burst" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`mega-petal ${p.fromLeft ? "mb-left" : "mb-right"}`}
          style={{
            top: `${p.startY}%`,
            "--tx": p.tx,
            "--ty": p.ty,
            "--rot": p.rot,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.size})`,
          }}
        />
      ))}
    </div>
  );
}
