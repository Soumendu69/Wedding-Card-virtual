import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const PHOTOS = [
  {
    src: "/moments/photo1.png",
    title: "Boundless",
    caption: "“Happiness is a day at the beach with you.”",
  },
  {
    src: "/moments/photo2.jpg",
    title: "Forever",
    caption: "“Every sunset with you feels like a beginning.”",
  },
  {
    src: "/moments/photo3.jpg",
    title: "Together",
    caption: "“The best moments are the ones we share.”",
  },
  {
    src: "/moments/photo4.png",
    title: "Always",
    caption: "“Wherever you are, that is where I belong.”",
  },
  {
    src: "/moments/photo5.png",
    title: "Us",
    caption: "“And so our forever begins.”",
  },
];

function MomentsCard({ photo, index, progress }) {
  const total = PHOTOS.length;

  const start = index / total;
  const end = (index + 1) / total;

  // Every card has the same hooks, in the same order.
  const y = useTransform(
    progress,
    [start, end],
    index === 0 ? ["0vh", "0vh"] : ["105vh", "0vh"]
  );

  const scale = useTransform(
    progress,
    [start, end],
    index === total - 1 ? [1, 1] : [1, 0.94]
  );

  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.03), start, end],
    [0, 1, 1]
  );

  const stackOffset = index * 5;

  return (
    <motion.div
      className="moments-card"
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 10,
        top: `${stackOffset}px`,
      }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        draggable="false"
      />

      <div className="moments-card-overlay">
        <h3>{photo.title}</h3>
        <p>{photo.caption}</p>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const stageRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const total = PHOTOS.length;

      const current = Math.min(
        total - 1,
        Math.floor(latest * total)
      );

      setActiveCard(current);
    }
  );

  return (
    <section className="section-gentle moments-section">

      <span className="scratch-title-sup reveal">
        Our Story
      </span>

      <h2 className="scratch-title reveal reveal-d1">
        Moments Together
      </h2>

      <p className="scratch-sub reveal reveal-d2">
        A glimpse into our journey
      </p>

      <div
        ref={stageRef}
        className="moments-stage"
      >
        {PHOTOS.map((photo, index) => (
          <MomentsCard
            key={index}
            photo={photo}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>

    </section>
  );
}