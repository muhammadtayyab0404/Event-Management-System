import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";
import AmbientVideo from "../components/AmbientVideo.jsx";
import EventGallery from "../components/EventGallery.jsx";
import TeamGrid from "../components/TeamGrid.jsx";
import ContactCta from "../components/ContactCta.jsx";
export default function EventsView({ home = false }) {
  return (
    <>
      <main id="main">
        <section className={["hero compact"].filter(Boolean).join(" ")}>
          <AmbientVideo eager></AmbientVideo>
          <div className={["hero-shade"].filter(Boolean).join(" ")}></div>
          <div className={["hero-copy"].filter(Boolean).join(" ")}>
            <p className={["eyebrow"].filter(Boolean).join(" ")}>
              {"RH NEXUS EVENTS · ISLAMABAD"}
            </p>
            <h1>
              {"A closer look at"}
              <br />
              {"the celebration."}
            </h1>
            <p>
              {
                "Explore our event gallery, from the setting to the final detail."
              }
            </p>
          </div>
        </section>
        <section id="gallery" className={["section"].filter(Boolean).join(" ")}>
          <div className={["section-heading"].filter(Boolean).join(" ")}>
            <div>
              <p className={["eyebrow"].filter(Boolean).join(" ")}>
                {"DETAILS, SETTINGS & CELEBRATIONS"}
              </p>
              <h2>{"Our event gallery"}</h2>
            </div>
          </div>
          <p className={["intro"].filter(Boolean).join(" ")}>
            {
              "Hover or tap a photograph to explore its details. Select play to watch the sample event film."
            }
          </p>
          <EventGallery></EventGallery>
        </section>
        <ContactCta></ContactCta>
      </main>
    </>
  );
}
