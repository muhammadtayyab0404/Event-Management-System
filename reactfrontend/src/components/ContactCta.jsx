import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";

export default function ContactCta({ home = false }) {
  return (
    <>
      <section className={["contact-cta"].filter(Boolean).join(" ")}>
        <p className={["eyebrow"].filter(Boolean).join(" ")}>
          {"LET’S PLAN TOGETHER"}
        </p>
        <h2>{"Tell us what you’re celebrating."}</h2>
        <p>
          {"Share your occasion, ideas and date. We’ll take it from there."}
        </p>
        <Link to="/contact" className={["btn"].filter(Boolean).join(" ")}>
          {home ? "Let’s discuss your event" : "Contact with us"}
        </Link>
      </section>
    </>
  );
}
