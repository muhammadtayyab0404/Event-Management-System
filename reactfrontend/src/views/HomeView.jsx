import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";
import AmbientVideo from "../components/AmbientVideo.jsx";
import EventGallery from "../components/EventGallery.jsx";
import TeamGrid from "../components/TeamGrid.jsx";
import ContactCta from "../components/ContactCta.jsx";
export default function HomeView({ home = false }) {
  return (
    <>
      <main id="main">
        <section className={["hero"].filter(Boolean).join(" ")}>
          <AmbientVideo
            source="assets/videos/home-company.mp4"
            poster="assets/images/home-video-poster.jpg"
            eager
          ></AmbientVideo>
          <div className={["hero-shade"].filter(Boolean).join(" ")}></div>
          <div className={["hero-copy"].filter(Boolean).join(" ")}>
            <p className={["eyebrow"].filter(Boolean).join(" ")}>
              {"RH NEXUS EVENTS · ISLAMABAD"}
            </p>
            <h1>
              {"Your occasion."}
              <br />
              <span>
                {"Beautifully brought"}
                <br />
                {"together."}
              </span>
            </h1>
            <p>
              {"Corporate events, weddings and private celebrations."}
              <br />
              {"Planned with you. Brought to life by RH Nexus."}
            </p>
            <div className={["hero-actions"].filter(Boolean).join(" ")}>
              <Link to="/contact" className={["btn"].filter(Boolean).join(" ")}>
                {"Discuss your event"}
              </Link>
              <Link
                to="/events"
                className={["hero-secondary"].filter(Boolean).join(" ")}
              >
                {"View our events"}
              </Link>
            </div>
          </div>
          <div className={["hero-footnote"].filter(Boolean).join(" ")}>
            <span>{"EVENT PLANNING & CATERING"}</span>
            <span>{"ISLAMABAD, PAKISTAN"}</span>
          </div>
        </section>
        <section
          className={["section subtle-reveal"].filter(Boolean).join(" ")}
        >
          <div className={["section-heading"].filter(Boolean).join(" ")}>
            <div>
              <p className={["eyebrow"].filter(Boolean).join(" ")}>
                {"THE OCCASIONS"}
              </p>
              <h2>{"Events we serve"}</h2>
            </div>
          </div>
          <p className={["section-intro"].filter(Boolean).join(" ")}>
            {
              "From business gatherings to personal milestones, every occasion deserves its own approach."
            }
          </p>
          <div className={["services"].filter(Boolean).join(" ")}>
            <Link
              to="/contact?event=Corporate"
              className={["service"].filter(Boolean).join(" ")}
            >
              <img
                src="assets/images/corporate-catering.webp"
                alt="Corporate setting"
                loading="lazy"
              />
              <div>
                <h3>{"Corporate"}</h3>
              </div>
            </Link>
            <Link
              to="/contact?event=Wedding"
              className={["service"].filter(Boolean).join(" ")}
            >
              <img
                src="assets/images/wedding-catering.webp"
                alt="Wedding setting"
                loading="lazy"
              />
              <div>
                <h3>{"Wedding"}</h3>
              </div>
            </Link>
            <Link
              to="/contact?event=Social event"
              className={["service"].filter(Boolean).join(" ")}
            >
              <img
                src="assets/images/gallery-3.webp"
                alt="Social event setting"
                loading="lazy"
              />
              <div>
                <h3>{"Social event"}</h3>
              </div>
            </Link>
            <Link
              to="/contact?event=Parties"
              className={["service"].filter(Boolean).join(" ")}
            >
              <img
                src="assets/images/dessert-table.webp"
                alt="Parties setting"
                loading="lazy"
              />
              <div>
                <h3>{"Parties"}</h3>
              </div>
            </Link>
          </div>
        </section>
        <section
          className={["complimentary film-feature"].filter(Boolean).join(" ")}
        >
          <AmbientVideo
            poster=""
            className={["ambient-video"].filter(Boolean).join(" ")}
          ></AmbientVideo>
          <div
            aria-hidden="true"
            className={["film-shade"].filter(Boolean).join(" ")}
          ></div>
          <div>
            <p className={["eyebrow"].filter(Boolean).join(" ")}>
              {"INCLUDED WITH YOUR EVENT"}
            </p>
            <h2>
              <span
                className={["complimentary-highlight"]
                  .filter(Boolean)
                  .join(" ")}
              >
                {"Complimentary"}
              </span>
              <br />
              {"professional videography."}
            </h2>
            <p>
              <strong>
                {
                  "Complimentary professional videography, including drone shots."
                }
              </strong>
              {
                " A lasting record of your celebration, with food samples also provided as part of our service."
              }
            </p>
          </div>
          <div className={["film-offer"].filter(Boolean).join(" ")}>
            <span className={["offer-label"].filter(Boolean).join(" ")}>
              {"COMPLIMENTARY"}
            </span>
            <span className={["offer-item"].filter(Boolean).join(" ")}>
              {"Professional videography"}
            </span>
            <span className={["offer-item"].filter(Boolean).join(" ")}>
              {"Drone shots"}
            </span>
            <span className={["offer-item"].filter(Boolean).join(" ")}>
              {"Food samples"}
            </span>
            <Link to="/contact" className={["btn"].filter(Boolean).join(" ")}>
              {"Plan your event"}
            </Link>
          </div>
        </section>
        <section
          className={["section subtle-reveal"].filter(Boolean).join(" ")}
        >
          <div className={["section-heading"].filter(Boolean).join(" ")}>
            <div>
              <p className={["eyebrow"].filter(Boolean).join(" ")}>
                {"THE GALLERY"}
              </p>
              <h2>{"A few moments from our events"}</h2>
            </div>
            <Link
              to="/events"
              className={["text-link"].filter(Boolean).join(" ")}
            >
              {"View all events"}
            </Link>
          </div>
          <EventGallery home></EventGallery>
        </section>
        <section
          className={["section muted subtle-reveal"].filter(Boolean).join(" ")}
        >
          <div className={["section-heading"].filter(Boolean).join(" ")}>
            <div>
              <p className={["eyebrow"].filter(Boolean).join(" ")}>
                {"THE PEOPLE"}
              </p>
              <h2>{"Meet the team"}</h2>
            </div>
            <Link
              to="/team"
              className={["text-link"].filter(Boolean).join(" ")}
            >
              {"Explore the team"}
            </Link>
          </div>
          <TeamGrid></TeamGrid>
        </section>
        <ContactCta home></ContactCta>
      </main>
    </>
  );
}
