import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";

export default function SiteFooter({ home = false }) {
  return (
    <>
      <footer>
        <div className={["footer-grid"].filter(Boolean).join(" ")}>
          <div>
            <Link to="/" className={["brand"].filter(Boolean).join(" ")}>
              {"RH NEXUS EVENTS"}
            </Link>
            <p>
              {"Event planning, catering and celebrations."}
              <br />
              {"From the first idea to the final detail."}
            </p>
          </div>
          <div>
            <h3>{"Let’s talk"}</h3>
            <a href="tel:+923712250420">{"03712250420"}</a>
            <a href="mailto:rhnexusevents@gmail.com">
              {"rhnexusevents@gmail.com"}
            </a>
          </div>
          <div>
            <h3>{"Visit our office"}</h3>
            <a
              href="https://www.google.com/maps?q=Street%20no%2017%2C%20Shop%20no%20110%2C%20Sector%20I-16%2F3%2C%20Islamabad%2C%20Pakistan%2044000"
              target="_blank"
              rel="noopener"
            >
              {
                "Street no 17, Shop no 110, Sector I-16/3, Islamabad, Pakistan 44000"
              }
            </a>
          </div>
        </div>
        <div className={["footer-bottom"].filter(Boolean).join(" ")}>
          <span>{"© RH Nexus Events"}</span>
          <div className={["social"].filter(Boolean).join(" ")}>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/rh_nexus_events/"
              target="_blank"
              rel="noopener"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M17 7h.01"></path>
              </svg>
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/profile.php?id=61591578887658"
              target="_blank"
              rel="noopener"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M14 22v-9h3l1-4h-4V7c0-2 1-2 4-2V1h-3c-4 0-6 2-6 6v2H6v4h3v9"></path>
              </svg>
            </a>
            <a
              aria-label="Tiktok"
              href="https://www.tiktok.com/@rh.nexus.events5?lang=en"
              target="_blank"
              rel="noopener"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M14 3v13a5 5 0 1 1-4-5v4a2 2 0 1 0 1 2V3h3c1 3 3 5 6 5v4c-3 0-5-1-6-3"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
