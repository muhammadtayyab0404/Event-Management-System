import React, { useRef, useEffect, useContext } from "react";
import { EventContext } from "../context.js";
export default function AmbientVideo({
  eager = false,
  source = "assets/videos/company.mp4",
  poster = "assets/images/hero-catering.webp",
  className = "",
}) {
  const video = useRef(null),
    { selectedEvent } = useContext(EventContext);
  useEffect(() => {
    const el = video.current;
    let visible = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (visible && !document.hidden && !reduced.matches && !selectedEvent) {
        if (!el.getAttribute("src")) el.src = source;
        el.play().catch(() => {});
      } else el.pause();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      el.pause();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [source, selectedEvent]);
  return (
    <video
      ref={video}
      src={eager ? source : undefined}
      className={className}
      muted
      loop
      playsInline
      preload={eager ? "metadata" : "none"}
      poster={poster || undefined}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
