import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";
import AmbientVideo from "../components/AmbientVideo.jsx";
import EventGallery from "../components/EventGallery.jsx";
import TeamGrid from "../components/TeamGrid.jsx";
import ContactCta from "../components/ContactCta.jsx";
export default function TeamView({ home = false }) {
  return (
    <>
      <main id="main">
        <section className={["page-intro"].filter(Boolean).join(" ")}>
          <p className={["eyebrow"].filter(Boolean).join(" ")}>
            {"RH NEXUS EVENTS"}
          </p>
          <h1>
            {"The people behind"}
            <br />
            {"your celebration."}
          </h1>
          <p>{"Planning, creativity and coordination, working together."}</p>
        </section>
        <section className={["section"].filter(Boolean).join(" ")}>
          <div className={["section-heading"].filter(Boolean).join(" ")}>
            <div>
              <p className={["eyebrow"].filter(Boolean).join(" ")}>
                {"OUR TEAM"}
              </p>
              <h2>{"Meet the team"}</h2>
            </div>
          </div>
          <p className={["intro"].filter(Boolean).join(" ")}>
            {"Our team profiles and photographs will be shared here soon."}
          </p>
          <TeamGrid></TeamGrid>
        </section>
        <ContactCta></ContactCta>
      </main>
    </>
  );
}
