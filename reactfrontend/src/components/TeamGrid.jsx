import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";

export default function TeamGrid({ home = false }) {
  return (
    <>
      <div className={["team-grid"].filter(Boolean).join(" ")}>
        <article className={["team-card"].filter(Boolean).join(" ")}>
          <div className={["portrait"].filter(Boolean).join(" ")}>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 22v-3a8 8 0 0 1 16 0v3"></path>
            </svg>
            <span>{"RH NEXUS EVENTS"}</span>
          </div>
          <div className={["team-details"].filter(Boolean).join(" ")}>
            <h3>{"Event planning"}</h3>
            <p>{"Shaping your ideas into a considered plan."}</p>
            <span className={["profile-note"].filter(Boolean).join(" ")}>
              {"Team profile coming soon"}
            </span>
          </div>
        </article>
        <article className={["team-card"].filter(Boolean).join(" ")}>
          <div className={["portrait"].filter(Boolean).join(" ")}>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 22v-3a8 8 0 0 1 16 0v3"></path>
            </svg>
            <span>{"RH NEXUS EVENTS"}</span>
          </div>
          <div className={["team-details"].filter(Boolean).join(" ")}>
            <h3>{"Creative direction"}</h3>
            <p>{"Bringing the setting, styling and details together."}</p>
            <span className={["profile-note"].filter(Boolean).join(" ")}>
              {"Team profile coming soon"}
            </span>
          </div>
        </article>
        <article className={["team-card"].filter(Boolean).join(" ")}>
          <div className={["portrait"].filter(Boolean).join(" ")}>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 22v-3a8 8 0 0 1 16 0v3"></path>
            </svg>
            <span>{"RH NEXUS EVENTS"}</span>
          </div>
          <div className={["team-details"].filter(Boolean).join(" ")}>
            <h3>{"Event coordination"}</h3>
            <p>{"Keeping every part of the day connected."}</p>
            <span className={["profile-note"].filter(Boolean).join(" ")}>
              {"Team profile coming soon"}
            </span>
          </div>
        </article>
        <article className={["team-card"].filter(Boolean).join(" ")}>
          <div className={["portrait"].filter(Boolean).join(" ")}>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 22v-3a8 8 0 0 1 16 0v3"></path>
            </svg>
            <span>{"RH NEXUS EVENTS"}</span>
          </div>
          <div className={["team-details"].filter(Boolean).join(" ")}>
            <h3>{"Guest experience"}</h3>
            <p>{"Putting a warm welcome at the heart of the event."}</p>
            <span className={["profile-note"].filter(Boolean).join(" ")}>
              {"Team profile coming soon"}
            </span>
          </div>
        </article>
      </div>
    </>
  );
}
