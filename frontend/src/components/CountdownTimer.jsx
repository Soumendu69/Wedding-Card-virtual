import React, { useEffect, useState } from "react";

const TARGET = new Date("2026-12-25T09:30:00").getTime();

function computeRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

const pad = (n) => String(n).padStart(2, "0");

export default function CountdownTimer() {
  const [t, setT] = useState(computeRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(computeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-card reveal">
      <p className="cd-tagline">
        A lifetime of togetherness begins with one sacred step
      </p>
      <h2 className="cd-title">The Wedding</h2>
      <p className="cd-date">12 &middot; 25 &middot; 2026</p>

      <div className="cd-grid">
        <CDUnit value={pad(t.days)} label="DAYS" />
        <CDUnit value={pad(t.hours)} label="HOURS" />
        <CDUnit value={pad(t.mins)} label="MINS" />
        <CDUnit value={pad(t.secs)} label="SECS" />
      </div>
    </div>
  );
}

function CDUnit({ value, label }) {
  return (
    <div className="cd-unit">
      <div className="cd-number">{value}</div>
      <div className="cd-label">{label}</div>
    </div>
  );
}
