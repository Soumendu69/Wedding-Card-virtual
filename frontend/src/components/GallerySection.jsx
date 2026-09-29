import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const PHOTOS = [
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/nfyxfb90_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_13_12%20AM.png",
    title: "Boundless",
    caption: "“Happiness is a day at the beach with you.”",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/3ta7acmt_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_12_11%20AM.png",
    title: "Forever",
    caption: "“Every sunset with you feels like a beginning.”",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/nfyxfb90_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_13_12%20AM.png",
    title: "Together",
    caption: "“The best moments are the ones we share.”",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/3ta7acmt_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_12_11%20AM.png",
    title: "Always",
    caption: "“Wherever you are, that is where I belong.”",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_fest-hub-18/artifacts/nfyxfb90_ChatGPT%20Image%20Jun%2020%2C%202026%2C%2011_13_12%20AM.png",
    title: "Us",
    caption: "“And so our forever begins.”",
  },
];

function MomentsCard({ photo, index, progress, activeCard }) {
  const total = PHOTOS.length;

  const enterStart = index === 0 ? 0 : (index - 1) / total;
  const enterEnd = index === 0 ? 0 : index / total;

  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? [0, 0] : ["75vh", "0vh"]
  );

  const scaleStart = index / total;
  const scaleEnd = Math.min(1, (index + 1) / total);

  const scale = useTransform(
    progress,
    [scaleStart, scaleEnd],
    index === total - 1 ? [1, 1] : [1, 0.94]
  );

  /*
   * Only the current/previous cards stay above the cards
   * that haven't arrived yet.
   */
  const zIndex =
    index <= activeCard
      ? index + 10
      : 1;

  return (
    <motion.div
      className="moments-card"
      style={{
        y,
        scale,
        zIndex,
      }}
    >
      <img
        src={photo.src}
        alt={photo.title}
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
        Math.floor(latest * total + 0.999)
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
            activeCard={activeCard}
          />
        ))}
      </div>

    </section>
  );
}