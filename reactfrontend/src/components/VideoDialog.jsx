import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function VideoDialog({ event, onClose }) {
  const modal = useRef(null),
    video = useRef(null),
    closeButton = useRef(null);
  useEffect(() => {
    if (!event) return;
    const opener = document.activeElement;
    modal.current.showModal();
    document.body.classList.add("modal-open");
    closeButton.current.focus();
    video.current.play().catch(() => {});
    return () => {
      video.current?.pause();
      modal.current?.close();
      document.body.classList.remove("modal-open");
      opener?.focus?.();
    };
  }, [event]);
  return createPortal(
    <dialog
      ref={modal}
      className="event-dialog"
      aria-labelledby="event-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target !== modal.current) return;
        const r = modal.current.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onClose();
      }}
    >
      <button
        ref={closeButton}
        className="dialog-close"
        type="button"
        aria-label="Close event video"
        onClick={onClose}
      >
        Close
      </button>
      <video
        ref={video}
        className="dialog-video"
        src={event?.video}
        controls
        playsInline
        preload="none"
      />
      <div className="dialog-details">
        <p className="eyebrow">EVENT FILM</p>
        <h2 id="event-dialog-title">{event?.title}</h2>
        <p id="event-dialog-description">
          {event?.description} {event?.location}
        </p>
        <p className="dialog-note">Sample event video</p>
      </div>
    </dialog>,
    document.body,
  );
}
