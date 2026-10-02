import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";
import { useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";
import BookingCalendar from "../components/BookingCalendar.jsx";
export default function ContactView({ home = false }) {
  const route = {
    query: Object.fromEntries(new URLSearchParams(useLocation().search)),
  };
  const meeting = useForm(
    "Meeting request",
    ["date", "time", "name", "phone", "email", "location", "message"],
    ["date", "time", "name", "phone", "email", "location", "message"],
  );
  const enquiry = useForm(
    "Event enquiry",
    ["name", "email", "phone", "event_type", "message"],
    ["name", "email", "phone", "event_type", "message"],
  );
  const choices = ["Corporate", "Wedding", "Social event", "Parties", "Other"];
  useEffect(() => {
    if (choices.includes(route.query.event))
      enquiry.set("event_type", route.query.event);
  }, []);

  return (
    <>
      <main id="main">
        <section className={["page-intro"].filter(Boolean).join(" ")}>
          <p className={["eyebrow"].filter(Boolean).join(" ")}>
            {"LET’S START A CONVERSATION"}
          </p>
          <h1>{"Your next event starts here."}</h1>
          <p>{"Tell us your plans or request a meeting with our team."}</p>
        </section>
        <section
          className={["section form-columns booking-layout"]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={["form-panel meeting-panel"].filter(Boolean).join(" ")}
          >
            <div className={["panel-heading"].filter(Boolean).join(" ")}>
              <span className={["panel-kicker"].filter(Boolean).join(" ")}>
                {"LET’S MEET"}
              </span>
              <h2>{"Book a meeting"}</h2>
            </div>
            <p>
              {
                "Select a date and time, then share your details. Our team will confirm availability."
              }
            </p>
            <form
              data-kind="Meeting request"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                meeting.submit(e);
              }}
              className={["form-grid"].filter(Boolean).join(" ")}
            >
              <BookingCalendar
                value={meeting.values.date}
                onChange={(value) => meeting.set("date", value)}
              ></BookingCalendar>
              <label
                className={["full date-fallback"].filter(Boolean).join(" ")}
              >
                {"Preferred date *"}
                <input
                  onBlur={(e) => {
                    meeting.check("date");
                  }}
                  aria-invalid={Boolean(meeting.errors.date)}
                  aria-describedby={
                    meeting.errors.date ? "meeting-date-error" : undefined
                  }
                  name="date"
                  type="date"
                  min={meeting.today}
                  required
                  maxLength="200"
                  value={meeting.values.date}
                  onChange={(e) => meeting.set("date", e.target.value)}
                />
                {meeting.errors.date ? (
                  <span
                    id="meeting-date-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.date}
                  </span>
                ) : null}
              </label>
              <label className={["full"].filter(Boolean).join(" ")}>
                {"Preferred time (Pakistan time) *"}
                <input
                  onBlur={(e) => {
                    meeting.check("time");
                  }}
                  aria-invalid={Boolean(meeting.errors.time)}
                  aria-describedby={
                    meeting.errors.time ? "meeting-time-error" : undefined
                  }
                  name="time"
                  type="time"
                  required
                  maxLength="200"
                  value={meeting.values.time}
                  onChange={(e) => meeting.set("time", e.target.value)}
                />
                {meeting.errors.time ? (
                  <span
                    id="meeting-time-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.time}
                  </span>
                ) : null}
              </label>
              <label>
                {"Name *"}
                <input
                  onBlur={(e) => {
                    meeting.check("name");
                  }}
                  aria-invalid={Boolean(meeting.errors.name)}
                  aria-describedby={
                    meeting.errors.name ? "meeting-name-error" : undefined
                  }
                  name="name"
                  type="text"
                  required
                  minLength="2"
                  autoComplete="name"
                  maxLength="200"
                  value={meeting.values.name}
                  onChange={(e) => meeting.set("name", e.target.value)}
                />
                {meeting.errors.name ? (
                  <span
                    id="meeting-name-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.name}
                  </span>
                ) : null}
              </label>
              <label>
                {"Phone *"}
                <input
                  onBlur={(e) => {
                    meeting.check("phone");
                  }}
                  aria-invalid={Boolean(meeting.errors.phone)}
                  aria-describedby={
                    meeting.errors.phone ? "meeting-phone-error" : undefined
                  }
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  title="Enter a phone number with 7 to 15 digits."
                  maxLength="200"
                  value={meeting.values.phone}
                  onChange={(e) => meeting.set("phone", e.target.value)}
                />
                {meeting.errors.phone ? (
                  <span
                    id="meeting-phone-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.phone}
                  </span>
                ) : null}
              </label>
              <label>
                {"Email *"}
                <input
                  onBlur={(e) => {
                    meeting.check("email");
                  }}
                  aria-invalid={Boolean(meeting.errors.email)}
                  aria-describedby={
                    meeting.errors.email ? "meeting-email-error" : undefined
                  }
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength="200"
                  value={meeting.values.email}
                  onChange={(e) => meeting.set("email", e.target.value)}
                />
                {meeting.errors.email ? (
                  <span
                    id="meeting-email-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.email}
                  </span>
                ) : null}
              </label>
              <label>
                {"Meeting location *"}
                <input
                  onBlur={(e) => {
                    meeting.check("location");
                  }}
                  aria-invalid={Boolean(meeting.errors.location)}
                  aria-describedby={
                    meeting.errors.location
                      ? "meeting-location-error"
                      : undefined
                  }
                  name="location"
                  type="text"
                  required
                  minLength="3"
                  maxLength="200"
                  value={meeting.values.location}
                  onChange={(e) => meeting.set("location", e.target.value)}
                />
                {meeting.errors.location ? (
                  <span
                    id="meeting-location-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.location}
                  </span>
                ) : null}
              </label>
              <label className={["full"].filter(Boolean).join(" ")}>
                {"Event details *"}
                <textarea
                  onBlur={(e) => {
                    meeting.check("message");
                  }}
                  aria-invalid={Boolean(meeting.errors.message)}
                  aria-describedby={
                    meeting.errors.message ? "meeting-message-error" : undefined
                  }
                  required
                  name="message"
                  rows="4"
                  minLength="10"
                  maxLength="3000"
                  value={meeting.values.message}
                  onChange={(e) => meeting.set("message", e.target.value)}
                ></textarea>
                {meeting.errors.message ? (
                  <span
                    id="meeting-message-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {meeting.errors.message}
                  </span>
                ) : null}
              </label>
              <label className={["check full"].filter(Boolean).join(" ")}>
                <input
                  type="checkbox"
                  required
                  aria-invalid={Boolean(meeting.errors.consent)}
                  checked={meeting.values.consent}
                  onChange={(e) => meeting.set("consent", e.target.checked)}
                />
                {" I agree to be contacted about this request."}
              </label>
              {meeting.errors.consent ? (
                <span
                  className={["field-error full"].filter(Boolean).join(" ")}
                >
                  {meeting.errors.consent}
                </span>
              ) : null}
              <button
                type="submit"
                className={["btn"].filter(Boolean).join(" ")}
              >
                {"Book a meeting"}
              </button>
              <p
                role="status"
                className={["form-status full"].filter(Boolean).join(" ")}
              >
                {meeting.status}{" "}
                {meeting.mailto ? (
                  <a href={meeting.mailto}>{meeting.linkLabel}</a>
                ) : null}
              </p>
            </form>
          </div>
          <div
            className={["form-panel enquiry-panel"].filter(Boolean).join(" ")}
          >
            <div className={["panel-heading"].filter(Boolean).join(" ")}>
              <span className={["panel-kicker"].filter(Boolean).join(" ")}>
                {"YOUR OCCASION"}
              </span>
              <h2>{"Contact us"}</h2>
            </div>
            <p>{"Have a question? Tell us what you have in mind."}</p>
            <form
              data-kind="Event enquiry"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                enquiry.submit(e);
              }}
              className={["form-grid"].filter(Boolean).join(" ")}
            >
              <label>
                {"Name *"}
                <input
                  onBlur={(e) => {
                    enquiry.check("name");
                  }}
                  aria-invalid={Boolean(enquiry.errors.name)}
                  aria-describedby={
                    enquiry.errors.name ? "enquiry-name-error" : undefined
                  }
                  name="name"
                  type="text"
                  required
                  minLength="2"
                  autoComplete="name"
                  maxLength="200"
                  value={enquiry.values.name}
                  onChange={(e) => enquiry.set("name", e.target.value)}
                />
                {enquiry.errors.name ? (
                  <span
                    id="enquiry-name-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {enquiry.errors.name}
                  </span>
                ) : null}
              </label>
              <label>
                {"Email *"}
                <input
                  onBlur={(e) => {
                    enquiry.check("email");
                  }}
                  aria-invalid={Boolean(enquiry.errors.email)}
                  aria-describedby={
                    enquiry.errors.email ? "enquiry-email-error" : undefined
                  }
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength="200"
                  value={enquiry.values.email}
                  onChange={(e) => enquiry.set("email", e.target.value)}
                />
                {enquiry.errors.email ? (
                  <span
                    id="enquiry-email-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {enquiry.errors.email}
                  </span>
                ) : null}
              </label>
              <label>
                {"Phone *"}
                <input
                  onBlur={(e) => {
                    enquiry.check("phone");
                  }}
                  aria-invalid={Boolean(enquiry.errors.phone)}
                  aria-describedby={
                    enquiry.errors.phone ? "enquiry-phone-error" : undefined
                  }
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  title="Enter a phone number with 7 to 15 digits."
                  maxLength="200"
                  value={enquiry.values.phone}
                  onChange={(e) => enquiry.set("phone", e.target.value)}
                />
                {enquiry.errors.phone ? (
                  <span
                    id="enquiry-phone-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {enquiry.errors.phone}
                  </span>
                ) : null}
              </label>
              <label>
                {"Event type *"}
                <select
                  onBlur={(e) => {
                    enquiry.check("event_type");
                  }}
                  aria-invalid={Boolean(enquiry.errors.event_type)}
                  aria-describedby={
                    enquiry.errors.event_type
                      ? "enquiry-event_type-error"
                      : undefined
                  }
                  name="event_type"
                  required
                  value={enquiry.values.event_type}
                  onChange={(e) => enquiry.set("event_type", e.target.value)}
                >
                  <option value="">{"Select an option"}</option>
                  <option>{"Corporate"}</option>
                  <option>{"Wedding"}</option>
                  <option>{"Social event"}</option>
                  <option>{"Parties"}</option>
                  <option>{"Other"}</option>
                </select>
                {enquiry.errors.event_type ? (
                  <span
                    id="enquiry-event_type-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {enquiry.errors.event_type}
                  </span>
                ) : null}
              </label>
              <label className={["full"].filter(Boolean).join(" ")}>
                {"Message"}
                <textarea
                  onBlur={(e) => {
                    enquiry.check("message");
                  }}
                  aria-invalid={Boolean(enquiry.errors.message)}
                  aria-describedby={
                    enquiry.errors.message ? "enquiry-message-error" : undefined
                  }
                  required
                  name="message"
                  rows="4"
                  minLength="10"
                  maxLength="3000"
                  value={enquiry.values.message}
                  onChange={(e) => enquiry.set("message", e.target.value)}
                ></textarea>
                {enquiry.errors.message ? (
                  <span
                    id="enquiry-message-error"
                    className={["field-error"].filter(Boolean).join(" ")}
                  >
                    {enquiry.errors.message}
                  </span>
                ) : null}
              </label>
              <label className={["check full"].filter(Boolean).join(" ")}>
                <input
                  type="checkbox"
                  required
                  aria-invalid={Boolean(enquiry.errors.consent)}
                  checked={enquiry.values.consent}
                  onChange={(e) => enquiry.set("consent", e.target.checked)}
                />
                {" I agree to be contacted about this request."}
              </label>
              {enquiry.errors.consent ? (
                <span
                  className={["field-error full"].filter(Boolean).join(" ")}
                >
                  {enquiry.errors.consent}
                </span>
              ) : null}
              <button
                type="submit"
                className={["btn"].filter(Boolean).join(" ")}
              >
                {"Prepare email"}
              </button>
              <p
                role="status"
                className={["form-status full"].filter(Boolean).join(" ")}
              >
                {enquiry.status}{" "}
                {enquiry.mailto ? (
                  <a href={enquiry.mailto}>{enquiry.linkLabel}</a>
                ) : null}
              </p>
            </form>
          </div>
        </section>
        <section className={["office office-map"].filter(Boolean).join(" ")}>
          <div className={["office-copy"].filter(Boolean).join(" ")}>
            <p className={["eyebrow"].filter(Boolean).join(" ")}>
              {"FIND RH NEXUS EVENTS"}
            </p>
            <h2>
              {"Come in."}
              <br />
              {"Let’s talk ideas."}
            </h2>
            <p>
              {"Street no 17, Shop no 110,"}
              <br />
              {"Sector I-16/3, Islamabad,"}
              <br />
              {"Pakistan 44000"}
            </p>
            <a href="tel:+923712250420">{"03712250420"}</a>
            <p className={["map-help"].filter(Boolean).join(" ")}>
              {"Select the map to view our office address in Google Maps."}
            </p>
          </div>
          <div className={["map-frame"].filter(Boolean).join(" ")}>
            <iframe
              title="Map of the RH Nexus Events office address"
              src="https://www.google.com/maps?q=Street%20no%2017%2C%20Shop%20no%20110%2C%20Sector%20I-16%2F3%2C%20Islamabad%2C%20Pakistan%2044000&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex="-1"
            ></iframe>
            <a
              href="https://www.google.com/maps?q=Street%20no%2017%2C%20Shop%20no%20110%2C%20Sector%20I-16%2F3%2C%20Islamabad%2C%20Pakistan%2044000"
              target="_blank"
              rel="noopener"
              aria-label="View RH Nexus Events office address in Google Maps"
              className={["map-link"].filter(Boolean).join(" ")}
            >
              <span className={["map-label"].filter(Boolean).join(" ")}>
                <svg
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="2.5"></circle>
                </svg>
                <span>
                  <strong>{"RH Nexus Events"}</strong>
                  <small>{"Sector I-16/3 · View office location"}</small>
                </span>
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
