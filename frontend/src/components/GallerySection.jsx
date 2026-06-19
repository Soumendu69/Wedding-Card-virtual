import React from "react";
import { Heart } from "lucide-react";

export default function GallerySection() {
  return (
    <section className="section-gentle">
      <span className="scratch-title-sup reveal">Our Story</span>
      <h2 className="scratch-title reveal reveal-d1">Moments Together</h2>
      <p className="scratch-sub reveal reveal-d2">A glimpse into our journey</p>

      <div className="gallery-row">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="gphoto reveal" key={i} style={{ transitionDelay: `${0.08 * i}s` }}>
            <Heart />
          </div>
        ))}
      </div>
    </section>
  );
}
