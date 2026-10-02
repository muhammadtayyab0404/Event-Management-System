import React from "react";

export default function Home() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      description: "Events managed",
    },
    {
      title: "Active Stages",
      value: "18",
      description: "Currently running",
    },
    {
      title: "Completed",
      value: "42",
      description: "Successfully delivered",
    },
    {
      title: "Client Feedback",
      value: "96%",
      description: "Average satisfaction",
    },
  ];

  const eventStatus = [
    {
      name: "Planned",
      count: 8,
      progress: "75%",
    },
    {
      name: "Ongoing",
      count: 5,
      progress: "55%",
    },
    {
      name: "Completed",
      count: 11,
      progress: "90%",
    },
    {
      name: "Cancelled",
      count: 0,
      progress: "0%",
    },
  ];

  const upcomingEvents = [
    {
      logo: "M",
      name: "Malik Holdings Annual Gala",
      client: "Hassan Malik",
      stages: "2/3 stages complete",
      date: "Oct 12, 2026",
      status: "Planned",
    },
    {
      logo: "A",
      name: "Al Noor Corporate Dinner",
      client: "Ahmed Traders",
      stages: "1/4 stages complete",
      date: "Nov 05, 2026",
      status: "Ongoing",
    },
    {
      logo: "S",
      name: "Sapphire Wedding Event",
      client: "Sapphire Group",
      stages: "4/4 stages complete",
      date: "Dec 18, 2026",
      status: "Completed",
    },
  ];

  return (
    <>
      {/* INTRO */}

      <div className="rhnx-intro">
        <div>
          <label>RH NEXUS EVENTS</label>

          <h1>Good to see you, RH.</h1>

          <p>
            Manage events, track progress and deliver memorable experiences.
          </p>
        </div>

        <button>View events</button>
      </div>

      {/* STAT CARDS */}

      <div className="rhnx-cards">
        {stats.map((item, index) => (
          <div className="rhnx-card" key={index}>
            <span>{item.title}</span>

            <h2>{item.value}</h2>

            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* EVENT STATUS */}

      <div className="rhnx-panel">
        <label>PORTFOLIO MIX</label>

        <h2>Event Status</h2>

        {eventStatus.map((item, index) => (
          <div className="rhnx-status" key={index}>
            <span>{item.name}</span>

            <b>{item.count}</b>

            <div>
              <i
                style={{
                  width: item.progress,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* EVENTS LIST */}

      <div className="rhnx-panel">
        <div className="rhnx-event-head">
          <h2>Upcoming Events</h2>

          <a href="#">See all</a>
        </div>

        {upcomingEvents.map((event, index) => (
          <div className="rhnx-event" key={index}>
            <div className="rhnx-event-logo">{event.logo}</div>

            <div>
              <h3>{event.name}</h3>

              <p>
                {event.client} · {event.stages}
              </p>
            </div>

            <div className="rhnx-date">{event.date}</div>

            <div className="rhnx-badge">{event.status}</div>
          </div>
        ))}
      </div>
    </>
  );
}
