import React from "react";
import { Heart } from "lucide-react";

export default function FooterNote() {
  return (
    <footer className="footer-note">
      <div className="heart-line">
        <span />
        <Heart size={14} fill="#C2807E" stroke="#8A4F4C" />
        <span />
      </div>
      <p style={{ margin: 0, fontSize: "1.05rem" }}>
        With love and gratitude,
      </p>
      <p style={{ marginTop: 4, fontFamily: "'Dancing Script', cursive", color: "#8A4F4C", fontSize: "1.5rem" }}>
        Dipika &amp; Sunit
      </p>
      <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", letterSpacing: 3, textTransform: "uppercase", color: "#C2807E" }}>
        #DipikaWedsSunit
      </p>
    </footer>
  );
}
