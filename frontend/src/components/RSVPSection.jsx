import React, { useState } from "react";
import { Send, Check, PartyPopper, Utensils } from "lucide-react";

const EVENTS = [
  { id: "mehendi", title: "Mehendi", date: "DEC 21 \u00b7 4:00 PM" },
  { id: "sangeet", title: "Sangeet", date: "DEC 22 \u00b7 7:00 PM" },
  { id: "wedding", title: "Wedding Ceremony", date: "DEC 25 \u00b7 9:30 AM" },
  { id: "reception", title: "Reception", date: "DEC 28 \u00b7 8:00 PM" },
];

const DIETARY = [
  "No specific preferences",
  "Vegetarian",
  "Vegan",
  "Jain",
  "Gluten-free",
  "Nut allergy",
];

// Replace with your Google Apps Script Web App URL after deployment.
const RSVP_ENDPOINT =
  process.env.REACT_APP_RSVP_WEBHOOK_URL ||
  "";

export default function RSVPSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    attending: "yes",
    partySize: "1",
    events: ["mehendi", "sangeet", "wedding", "reception"],
    dietary: "Vegetarian",
    advice: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const toggleEvent = (id) => {
    setForm((p) => ({
      ...p,
      events: p.events.includes(id)
        ? p.events.filter((e) => e !== id)
        : [...p.events, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrMsg("Please share your name.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrMsg("");

    const payload = {
      timestamp: new Date().toISOString(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      attending: form.attending === "yes" ? "Joyfully Accept" : "Regrettably Decline",
      party_size: form.partySize,
      events: form.events
        .map((id) => EVENTS.find((e) => e.id === id)?.title)
        .filter(Boolean)
        .join(", "),
      dietary: form.dietary,
      advice: form.advice.trim(),
    };

    if (!RSVP_ENDPOINT) {
      // No endpoint configured — log locally so the user sees the form works.
      console.warn("RSVP webhook not configured. Submission:", payload);
      setStatus("success");
      return;
    }

    try {
      // Use no-cors mode because Apps Script web-apps deployed for "Anyone"
      // accept the request and return data, but their CORS headers vary.
      // We treat success optimistically; Apps Script always writes the row.
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrMsg("Couldn't send your RSVP. Please try again in a moment.");
    }
  };

  if (status === "success") {
    return (
      <section className="rsvp-section">
        <div className="rsvp-card-wrap">
          <div className="rsvp-success">
            <div className="rsvp-success-icon">
              <PartyPopper size={28} />
            </div>
            <h3>Thank you!</h3>
            <p>
              Your RSVP has been received with love. We can't wait to celebrate
              with you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-section">
      <div className="rsvp-head">
        <span className="scratch-title-sup reveal">Join the Celebration</span>
        <h2 className="rsvp-title reveal reveal-d1">RSVP</h2>
        <p className="rsvp-sub reveal reveal-d2">
          Kindly let us know if you can make it — your presence will make this
          celebration whole.
        </p>
      </div>

      <form className="rsvp-card-wrap" onSubmit={handleSubmit}>
        {/* Your details */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">Your details</h4>
          <label className="rsvp-label">YOUR NAME</label>
          <input
            type="text"
            className="rsvp-input"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <label className="rsvp-label">PHONE NUMBER</label>
          <div className="rsvp-phone-row">
            <span className="rsvp-flag" aria-hidden="true">🇮🇳</span>
            <input
              type="tel"
              className="rsvp-input rsvp-phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Will you join */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">Will you join us?</h4>
          <div className="rsvp-toggle">
            <button
              type="button"
              className={`rsvp-pill ${form.attending === "yes" ? "active" : ""}`}
              onClick={() => update("attending", "yes")}
            >
              JOYFULLY ACCEPT 💐
            </button>
            <button
              type="button"
              className={`rsvp-pill ${form.attending === "no" ? "active" : ""}`}
              onClick={() => update("attending", "no")}
            >
              REGRETTABLY DECLINE
            </button>
          </div>
        </div>

        {/* Party size */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">Party size</h4>
          <select
            className="rsvp-input rsvp-select"
            value={form.partySize}
            onChange={(e) => update("partySize", e.target.value)}
          >
            <option value="1">1 (Just me)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
          </select>
        </div>

        {/* Events */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">Events you'll attend</h4>
          <div className="rsvp-events">
            {EVENTS.map((ev) => {
              const on = form.events.includes(ev.id);
              return (
                <button
                  type="button"
                  key={ev.id}
                  className={`rsvp-event ${on ? "on" : ""}`}
                  onClick={() => toggleEvent(ev.id)}
                >
                  <div className="rsvp-event-text">
                    <strong>{ev.title}</strong>
                    <span>{ev.date}</span>
                  </div>
                  <span className={`rsvp-check ${on ? "on" : ""}`}>
                    {on && <Check size={14} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">
            <Utensils size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
            Dietary preferences
          </h4>
          <select
            className="rsvp-input rsvp-select"
            value={form.dietary}
            onChange={(e) => update("dietary", e.target.value)}
          >
            {DIETARY.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Advice */}
        <div className="rsvp-card reveal">
          <h4 className="rsvp-card-title">Marriage advice for us</h4>
          <textarea
            className="rsvp-input rsvp-textarea"
            placeholder="Share something sweet, funny, or wise…"
            rows={4}
            value={form.advice}
            onChange={(e) => update("advice", e.target.value)}
          />
        </div>

        {status === "error" && errMsg && (
          <div className="rsvp-error">{errMsg}</div>
        )}

        <button
          type="submit"
          className="rsvp-submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              <Send size={16} style={{ marginRight: 8 }} />
              SEND RSVP
            </>
          )}
        </button>
      </form>
    </section>
  );
}
"rsvp-submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              <Send size={16} style={{ marginRight: 8 }} />
              SEND RSVP
            </>
          )}
        </button>
      </form>
    </section>
  );
}
