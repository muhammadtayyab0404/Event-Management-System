import React, { useContext } from "react";
import { events, homeEvents } from "../data/events.js";
import { EventContext } from "../context.js";
export default function EventGallery({ home = false }) {
  const { openEvent } = useContext(EventContext);
  return (
    <div className={`collage ${home ? "home-collage" : ""}`}>
      {(home ? homeEvents : events).map((event) => (
        <article
          key={event.id}
          className="event-card"
          tabIndex={home ? undefined : 0}
        >
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            decoding="async"
          />
          <div className="event-info">
            <span>{event.category}</span>
            <h3>{event.title}</h3>
            {!home && (
              <>
                <p>{event.description}</p>
                <p className="location">{event.location}</p>
              </>
            )}
          </div>
          {!home && (
            <button
              className="play"
              aria-label={`Play sample video for ${event.title}`}
              onClick={() => openEvent(event)}
            >
              ▶
            </button>
          )}
        </article>
      ))}
    </div>
  );
}
