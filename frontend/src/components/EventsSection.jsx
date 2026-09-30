import React from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const VENUE_DAULATABAD = {
  name: "Daulatabad Choudwar",
  url: "https://maps.app.goo.gl/LiSzYTkbbyk38Zi66",
};

const VENUE_ADITYA = {
  name: "Aditya's The Nature",
  url: "https://maps.app.goo.gl/PAiToTZjtcZitr6j9",
};

const VENUE_WEDDING = {
  name: "Wedding Ceremony Venue",
  url: "https://maps.app.goo.gl/vzGvRTKUd83BcDyU6",
};

const VENUE_NISHAMANI = {
  name: "Nishamani Convention Hall",
  url: "https://www.google.com/maps?rlz=1C1ONGR_enIN1208IN1208&gs_lcrp=EgZjaHJvbWU yBggAEEUYOTIGCAEQIxgnMgcIAhAAGIAEMg0IAxAuGK8BGMcBGIAEMggIBBAAGBYYHjIICAUQABgWGB4yDQcGEAAYhgMYgAQYigUyDQcGEAAYhgMYgAQYigXSAQg1NzkxajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KVv4Eo6WDRk6MZLV18cHOPxs&daddr=Infront+BSNL+Office,+Link+Rd,+Kataka,+Odisha+753012",
};

const EVENTS = [
  {
    title: "Haldi & Rituals",
    date: "14 December 2026",
    time: "10:00 AM onwards",
    location: "Choudwar, Cuttack",
    venue: VENUE_DAULATABAD,
  },
  {
    title: "Wedding Ceremony",
    date: "14 December 2026",
    time: "8:00 PM onwards",
    location: "Kandarpur, Cuttack.",
    venue: VENUE_WEDDING,
  },
  {
    title: "Reception",
    date: "18 December 2026",
    time: "7:00 PM onwards",
    location: "Link Rd, Cuttack",
    venue: VENUE_NISHAMANI,
  },
];

export default function EventsSection() {
  return (
    <section className="section-gentle alt">
      <span className="scratch-title-sup reveal">
        The Celebration
      </span>

      <h2 className="scratch-title reveal reveal-d1">
        Wedding Events
      </h2>

      <p className="scratch-sub reveal reveal-d2">
        Join us as we begin our forever
      </p>

      <CountdownTimer />

      <div className="events-grid">
        {EVENTS.map((ev, i) => (
          <div
            className="event-card reveal"
            key={ev.title + i}
            style={{
              transitionDelay: `${0.15 * (i + 1)}s`,
            }}
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
              <Clock size={14} />
              {ev.time}
            </p>
{ev.location && (
  <p
    style={{
      marginTop: 4,
      marginBottom: 0,
      textAlign: "center",
    }}
  >
    {ev.location}
  </p>
)}
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

            {/* Direction doodle */}
            <div
              className={
                i % 2 === 0
                  ? "direction-doodle direction-doodle-right"
                  : "direction-doodle direction-doodle-left"
              }
            >
              <svg
                viewBox="0 0 300 120"
                className="direction-arrow"
                aria-hidden="true"
              >
                {i % 2 === 0 ? (
                  <path
                    d="M245 18 C210 5, 215 55, 175 65 C150 72, 145 70, 155 78"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M15 18 C50 5, 45 55, 85 65 C120 74, 155 58, 180 78"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
              </svg>

              <span>
                Click for
                <br />
                directions
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}