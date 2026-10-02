import React, {
  useState,
  useLayoutEffect,
  useEffect,
  Suspense,
  lazy,
} from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import WhatsAppLink from "./components/WhatsAppLink.jsx";
import VideoDialog from "./components/VideoDialog.jsx";

import HomeView from "./views/HomeView.jsx";
import EventsView from "./views/EventsView.jsx";
import TeamView from "./views/TeamView.jsx";
import VendorView from "./views/VendorView.jsx";
import ContactView from "./views/ContactView.jsx";

import { EventContext } from "./context.js";

import AdminHome from "./admin/AdminHome.jsx";
import CrmEvents from "./components/admincrm/CrmEvents.jsx";
// import ManagerHome from "./manager/ManagerHome.jsx";
// import ClientHome from "./client/ClientHome.jsx";

import CrmLayout from "./crm/CrmLayout.jsx";

const CrmView = lazy(() => import("./views/CrmView.jsx"));

// ========================================
// CRM ENTRY
// ========================================

function CrmEntry() {
  const token = sessionStorage.getItem("crm_token");

  let user = null;

  try {
    user = JSON.parse(sessionStorage.getItem("crm_user") || "null");
  } catch {
    user = null;
  }

  // Already logged in
  if (token && user) {
    if (user.role === "admin") {
      return <Navigate to="/crm/admin" replace />;
    }

    if (user.role === "manager") {
      return <Navigate to="/crm/manager" replace />;
    }

    if (user.role === "client") {
      return <Navigate to="/crm/client" replace />;
    }
  }

  // Not logged in
  return <CrmView />;
}

// ========================================
// MAIN APP
// ========================================

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const route = useLocation();

  // ========================================
  // CRM ROUTES
  // ========================================

  const isCrmRoute = route.pathname.startsWith("/crm/");

  // ========================================
  // PAGE TITLE + SCROLL
  // ========================================

  useLayoutEffect(() => {
    const path = route.pathname;

    let page = "home";

    if (path === "/events") {
      page = "events";
    } else if (path === "/team") {
      page = "team";
    } else if (path === "/vendor") {
      page = "vendor";
    } else if (path === "/contact") {
      page = "contact";
    } else if (path.startsWith("/crm")) {
      page = "crm";
    }

    document.title =
      page === "crm"
        ? "CRM | RH Nexus Events"
        : `${page[0].toUpperCase() + page.slice(1)} | RH Nexus Events`;

    // Remove public page classes
    document.body.classList.remove(
      "home-page",
      "events-page",
      "team-page",
      "vendor-page",
      "contact-page",
    );

    // Add current public page class
    if (["home", "events", "team", "vendor", "contact"].includes(page)) {
      document.body.classList.add(`${page}-page`);
    }

    window.scrollTo(0, 0);

    setSelectedEvent(null);
  }, [route.pathname]);

  // ========================================
  // SCROLL REVEAL ANIMATION
  // ========================================

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
      },
    );

    const scan = () => {
      document.querySelectorAll(".subtle-reveal").forEach((element) => {
        if (!observed.has(element)) {
          observed.add(element);

          element.classList.add("reveal-ready");

          observer.observe(element);
        }
      });
    };

    scan();

    const mutationObserver = new MutationObserver(scan);

    const appElement = document.getElementById("app");

    if (appElement) {
      mutationObserver.observe(appElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [route.pathname]);

  // ========================================
  // APP
  // ========================================

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        openEvent: setSelectedEvent,
      }}
    >
      {/* Skip Link */}

      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();

          const main = document.getElementById("main");

          if (main) {
            main.setAttribute("tabindex", "-1");

            main.focus();

            main.scrollIntoView();
          }
        }}
      >
        Skip to content
      </a>

      {/* Public Header */}

      {!isCrmRoute && <SiteHeader />}

      {/* Routes */}

      <Suspense
        fallback={
          <main id="main" className="section">
            Loading…
          </main>
        }
      >
        <Routes>
          {/* ================================= */}
          {/* PUBLIC WEBSITE */}
          {/* ================================= */}

          <Route path="/" element={<HomeView />} />

          <Route path="/events" element={<EventsView />} />

          <Route path="/team" element={<TeamView />} />

          <Route path="/vendor" element={<VendorView />} />

          <Route path="/contact" element={<ContactView />} />

          {/* ================================= */}
          {/* CRM LOGIN */}
          {/* ================================= */}

          <Route path="/crm" element={<CrmEntry />} />

          {/* ================================= */}
          {/* ADMIN CRM */}
          {/* ================================= */}

          <Route element={<CrmLayout />}>
            <Route path="/crm/admin" element={<AdminHome />} />
            <Route path="/crm/admin/events" element={<CrmEvents />} />
          </Route>

          {/* ================================= */}
          {/* FUTURE MANAGER CRM */}
          {/* ================================= */}

          {/*
          <Route
            element={<ManagerLayout />}
          >
            <Route
              path="/crm/manager"
              element={<ManagerHome />}
            />
          </Route>
          */}

          {/* ================================= */}
          {/* FUTURE CLIENT CRM */}
          {/* ================================= */}

          {/*
          <Route
            element={<ClientLayout />}
          >
            <Route
              path="/crm/client"
              element={<ClientHome />}
            />
          </Route>
          */}

          {/* ================================= */}
          {/* UNKNOWN URL */}
          {/* ================================= */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Public Footer */}

      {!isCrmRoute && <SiteFooter />}

      {/* Public WhatsApp */}

      {!isCrmRoute && <WhatsAppLink />}

      {/* Event Dialog */}

      <VideoDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </EventContext.Provider>
  );
}
