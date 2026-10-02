import React, { useState } from "react";
import "../../../public/assets/css/crmlayout.css";

const eventsData = [
  {
    id: 1,
    title: "Malik Holdings Annual Gala",
    client: "Hassan Malik",
    date: "Oct 12, 2026",
    status: "Planned",
    stages: "2/3",
  },
  {
    id: 2,
    title: "Corporate Leadership Summit",
    client: "RH Corporate",
    date: "Nov 05, 2026",
    status: "Ongoing",
    stages: "1/3",
  },
  {
    id: 3,
    title: "Annual Award Ceremony",
    client: "Future Group",
    date: "Dec 18, 2026",
    status: "Completed",
    stages: "3/3",
  },
];

export default function CrmEvents() {
  const [events, setEvents] = useState(eventsData);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    status: "planned",
    starts: "",
    ends: "",
    venue: "",
    manager: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCreateEvent(e) {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      client: formData.client,
      date: formData.starts
        ? new Date(formData.starts).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "Not scheduled",
      status:
        formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
      stages: "0/3",
    };

    setEvents((prev) => [newEvent, ...prev]);

    setFormData({
      title: "",
      client: "",
      status: "planned",
      starts: "",
      ends: "",
      venue: "",
      manager: "",
      description: "",
    });

    setShowCreateModal(false);
  }

  return (
    <div className="crm-events-page">
      {/* Header */}
      <div className="crm-events-top">
        <div>
          <label>RH NEXUS EVENTS</label>

          <h1>Events Management</h1>

          <p>Manage all events, stages and client progress.</p>
        </div>

        <button
          className="crm-add-event"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="crm-events-filter">
        <button className="active">All Events</button>
        <button>Planned</button>
        <button>Ongoing</button>
        <button>Completed</button>
      </div>

      {/* Events List */}
      <div className="crm-events-grid">
        {events.map((event) => (
          <div className="crm-event-card" key={event.id}>
            <div className="crm-event-header">
              <div className="crm-event-icon">{event.title.charAt(0)}</div>

              <span className={`crm-status ${event.status.toLowerCase()}`}>
                {event.status}
              </span>
            </div>

            <h2>{event.title}</h2>

            <p>Client: {event.client}</p>

            <p>Date: {event.date}</p>

            <div className="crm-stage">
              <div>
                <span>Event Stages</span>

                <b>{event.stages}</b>
              </div>

              <div className="crm-progress">
                <span
                  style={{
                    width:
                      event.status === "Completed"
                        ? "100%"
                        : event.status === "Ongoing"
                          ? "55%"
                          : "30%",
                  }}
                />
              </div>
            </div>

            <button className="crm-view-btn">View Details</button>
          </div>
        ))}
      </div>

      {/* =========================
          CREATE EVENT MODAL
          ========================= */}

      {showCreateModal && (
        <div
          className="crm-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="crm-modal-header">
              <div>
                <label>RH NEXUS EVENTS</label>
                <h2>Create Event</h2>
              </div>

              <button
                type="button"
                className="crm-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateEvent}>
              {/* Event Title */}
              <div className="crm-form-group">
                <label>Event title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Client */}
              <div className="crm-form-group">
                <label>Client</label>

                <select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select client</option>
                  <option value="Hassan Malik">Hassan Malik</option>
                  <option value="RH Corporate">RH Corporate</option>
                  <option value="Future Group">Future Group</option>
                </select>
              </div>

              {/* Status */}
              <div className="crm-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Dates */}
              <div className="crm-form-row">
                <div className="crm-form-group">
                  <label>Starts</label>

                  <input
                    type="datetime-local"
                    name="starts"
                    value={formData.starts}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="crm-form-group">
                  <label>Ends (optional)</label>

                  <input
                    type="datetime-local"
                    name="ends"
                    value={formData.ends}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="crm-form-group">
                <label>Venue / location</label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue or location"
                />
              </div>

              {/* Manager */}
              <div className="crm-form-group">
                <label>Manager</label>

                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                >
                  <option value="">Unassigned</option>
                  <option value="Ahmed Khan">Ahmed Khan</option>
                  <option value="Ali Raza">Ali Raza</option>
                  <option value="Sara Malik">Sara Malik</option>
                </select>
              </div>

              {/* Description */}
              <div className="crm-form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the event..."
                  rows="4"
                />
              </div>

              {/* Buttons */}
              <div className="crm-modal-actions">
                <button
                  type="button"
                  className="crm-cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Close
                </button>

                <button type="submit" className="crm-save-btn">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
