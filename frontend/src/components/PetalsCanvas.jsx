import React, { useEffect, useRef } from "react";

export default function PetalsCanvas({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#F4C9C5", "#E6A8A4", "#D9B86A", "#F2DCD5", "#C2807E"];
    const COUNT = 35;

    const makePetal = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: 4 + Math.random() * 6,
      vy: 0.4 + Math.random() * 0.9,
      vx: -0.3 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      spin: -0.02 + Math.random() * 0.04,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.55 + Math.random() * 0.45,
    });

    petalsRef.current = Array.from({ length: COUNT }, makePetal);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalsRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(tick);
    };

    if (active) tick();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas id="petals-canvas" ref={canvasRef} style={{ opacity: active ? 1 : 0, transition: "opacity 1s" }} />;
}
