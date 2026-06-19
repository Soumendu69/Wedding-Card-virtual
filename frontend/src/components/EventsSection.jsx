import React from "react";
import { MapPin, Clock, Calendar } from "lucide-react";

const EVENTS = [
  {
    title: "Mehendi",
    date: "28 June 2026",
    time: "4:00 PM onwards",
    venue: "Sharma Residence, Jaipur",
  },
  {
    title: "Sangeet",
    date: "29 June 2026",
    time: "7:00 PM onwards",
    venue: "The Leela Palace, Lawn No. 2",
  },
  {
    title: "Wedding Ceremony",
    date: "01 July 2026",
    time: "9:30 AM onwards",
    venue: "Rambagh Gardens, Jaipur",
  },
  {
    title: "Reception",
    date: "01 July 2026",
    time: "8:00 PM onwards",
    venue: "Rambagh Pavilion",
  },
];

export default function EventsSection() {
  return (
    <section className="section-gentle alt">
      <span className="scratch-title-sup reveal">The Celebration</span>
      <h2 className="scratch-title reveal reveal-d1">Wedding Events</h2>
      <p className="scratch-sub reveal reveal-d2">
        Join us as we begin our forever
      </p>

      <div className="events-grid">
        {EVENTS.map((ev, i) => (
          <div
            className="event-card reveal"
            key={ev.title}
            style={{ transitionDelay: `${0.15 * (i + 1)}s` }}
          >
            <div className="event-meta">
              <Calendar size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
              {ev.date}
            </div>
            <h3>{ev.title}</h3>
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }}>
              <Clock size={14} /> {ev.time}
            </p>
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
              <MapPin size={14} /> {ev.venue}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
