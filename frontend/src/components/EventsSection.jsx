import React from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const VENUE_DAULATABAD = {
  name: "Daulatabad Choudwar",
  url: "https://maps.app.goo.gl/LiSzYTkbbyk38Zi66",
};

const VENUE_NISHAMANI = {
  name: "Nishamani Convention Hall",
  url: "https://www.google.com/maps?rlz=1C1ONGR_enIN1208IN1208&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgcIAhAAGIAEMg0IAxAuGK8BGMcBGIAEMggIBBAAGBYYHjIICAUQABgWGB4yDQgGEAAYhgMYgAQYigUyDQgHEAAYhgMYgAQYigXSAQg1NzkxajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KVv4Eo6WDRk6MZLV18cHOPxs&daddr=Infront+BSNL+Office,+Link+Rd,+Kataka,+Odisha+753012",
};

const EVENTS = [
  {
    title: "Mehendi",
    date: "21 December 2026",
    time: "4:00 PM onwards",
    venue: VENUE_DAULATABAD,
  },
  {
    title: "Sangeet",
    date: "22 December 2026",
    time: "7:00 PM onwards",
    venue: VENUE_DAULATABAD,
  },
  {
    title: "Wedding Ceremony",
    date: "14 December 2026",
    time: "9:30 AM onwards",
    venue: VENUE_ADITYA,
  },
  {
    title: "Reception",
    date: "18 December 2026",
    time: "7:00 PM onwards",
    venue: VENUE_NISHAMANI,
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

      <CountdownTimer />

      <div className="events-grid">
        {EVENTS.map((ev, i) => (
          <div
            className="event-card reveal"
            key={ev.title + i}
            style={{ transitionDelay: `${0.15 * (i + 1)}s` }}
          >
            <div className="event-meta">
              <Calendar
                size={12}
                style={{
                  display: "inline",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              {ev.date}
            </div>

            <h3>{ev.title}</h3>

            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 8,
              }}
            >
              <Clock size={14} /> {ev.time}
            </p>

            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 6,
              }}
            >
              <MapPin size={14} />

              <a
                href={ev.venue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-link"
              >
                {ev.venue.name}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}