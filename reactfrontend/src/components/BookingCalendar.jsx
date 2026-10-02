import React, { useState, useEffect } from "react";
import { pakistanToday } from "../utils/validation.js";
export default function BookingCalendar({ value = "", onChange }) {
  const today = pakistanToday(),
    [ty, tm] = today.split("-").map(Number);
  const [view, setView] = useState([ty, tm - 1]);
  const [year, month] = view;
  useEffect(() => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m] = value.split("-").map(Number);
      setView([y, m - 1]);
    }
  }, [value]);
  const move = (delta) => {
    const d = new Date(year, month + delta, 1);
    setView([d.getFullYear(), d.getMonth()]);
  };
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return (
    <div className="booking-calendar full">
      <div className="calendar-top">
        <button
          type="button"
          aria-label="Previous month"
          disabled={year === ty && month === tm - 1}
          onClick={() => move(-1)}
        >
          Previous
        </button>
        <h3 id="calendar-month" aria-live="polite">
          {new Date(year, month, 1).toLocaleDateString("en", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button type="button" aria-label="Next month" onClick={() => move(1)}>
          Next
        </button>
      </div>
      <div className="calendar-week" aria-hidden="true">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div id="calendar-days">
        {Array.from({ length: offset }, (_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {Array.from(
          { length: new Date(year, month + 1, 0).getDate() },
          (_, i) => {
            const day = i + 1,
              date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            return (
              <button
                key={date}
                type="button"
                aria-label={new Date(year, month, day).toLocaleDateString(
                  "en",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
                aria-pressed={value === date}
                disabled={date < today}
                onClick={() => onChange(date)}
              >
                {day}
              </button>
            );
          },
        )}
      </div>
      <p id="selected-date" aria-live="polite">
        {value
          ? `Preferred date: ${value} · Time zone: Pakistan`
          : "Select your preferred date."}
      </p>
    </div>
  );
}
