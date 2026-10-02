import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Logged-in user
  const [user, setUser] = useState(null);

  const route = useLocation();
  const navigate = useNavigate();

  // ========================================
  // CHECK LOGIN
  // ========================================

  useEffect(() => {
    console.log("================================");
    console.log(
      "[SiteHeader] Route changed:",
      route.pathname
    );

    console.log(
      "[SiteHeader] Checking login..."
    );

    checkLogin();

    // Close mobile menu when route changes
    setOpen(false);
  }, [route.pathname]);

  function checkLogin() {
    const token =
      sessionStorage.getItem("crm_token");

    let storedUser = null;

    try {
      storedUser = JSON.parse(
        sessionStorage.getItem("crm_user") || "null"
      );
    } catch (error) {
      console.error(
        "[SiteHeader] Error parsing crm_user:",
        error
      );

      storedUser = null;
    }

    console.log(
      "[SiteHeader] Token:",
      token
    );

    console.log(
      "[SiteHeader] Stored user:",
      storedUser
    );

    console.log(
      "[SiteHeader] User role:",
      storedUser?.role
    );

    if (token && storedUser) {
      console.log(
        "[SiteHeader] ✅ User is logged in"
      );

      setUser(storedUser);
    } else {
      console.log(
        "[SiteHeader] ❌ User is NOT logged in"
      );

      setUser(null);
    }
  }

  // ========================================
  // SCROLL + ESCAPE
  // ========================================

  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 28);
    };

    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    scroll();

    window.addEventListener(
      "scroll",
      scroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "keydown",
      key
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scroll
      );

      window.removeEventListener(
        "keydown",
        key
      );
    };
  }, []);

  // ========================================
  // ACCOUNT ICON
  // ========================================

  function handleAccountClick(e) {
    e.preventDefault();

    console.log("");
    console.log("================================");
    console.log(
      "[SiteHeader] 👤 ACCOUNT ICON CLICKED"
    );

    const token =
      sessionStorage.getItem("crm_token");

    let storedUser = null;

    try {
      storedUser = JSON.parse(
        sessionStorage.getItem("crm_user") || "null"
      );
    } catch (error) {
      console.error(
        "[SiteHeader] Error parsing user:",
        error
      );

      storedUser = null;
    }

    console.log(
      "[SiteHeader] Account click token:",
      token
    );

    console.log(
      "[SiteHeader] Account click user:",
      storedUser
    );

    console.log(
      "[SiteHeader] Account click role:",
      storedUser?.role
    );

    // ----------------------------------------
    // NOT LOGGED IN
    // ----------------------------------------

    if (!token || !storedUser) {
      console.log(
        "[SiteHeader] ❌ No login found"
      );

      console.log(
        "[SiteHeader] Redirecting to /crm"
      );

      navigate("/crm");

      return;
    }

    // ----------------------------------------
    // ADMIN
    // ----------------------------------------

    if (storedUser.role === "admin") {
      console.log(
        "[SiteHeader] 👑 Admin detected"
      );

      navigate("/crm/admin");

      return;
    }

    // ----------------------------------------
    // MANAGER
    // ----------------------------------------

    if (storedUser.role === "manager") {
      console.log(
        "[SiteHeader] 👔 Manager detected"
      );

      navigate("/crm/manager");

      return;
    }

    // ----------------------------------------
    // CLIENT
    // ----------------------------------------

    if (storedUser.role === "client") {
      console.log(
        "[SiteHeader] 👤 Client detected"
      );

      navigate("/crm/client");

      return;
    }

    // ----------------------------------------
    // INVALID ROLE
    // ----------------------------------------

    console.warn(
      "[SiteHeader] ⚠️ Invalid role:",
      storedUser.role
    );

    console.log(
      "[SiteHeader] Removing CRM session..."
    );

    sessionStorage.removeItem(
      "crm_token"
    );

    sessionStorage.removeItem(
      "crm_user"
    );

    setUser(null);

    navigate("/crm");
  }

  // ========================================
  // LOGOUT
  // ========================================

  function handleLogout() {
    console.log("");
    console.log("================================");
    console.log(
      "[SiteHeader] 🚪 LOGOUT CLICKED"
    );

    console.log(
      "[SiteHeader] Token BEFORE logout:",
      sessionStorage.getItem("crm_token")
    );

    console.log(
      "[SiteHeader] User BEFORE logout:",
      sessionStorage.getItem("crm_user")
    );

    // Remove CRM session
    sessionStorage.removeItem(
      "crm_token"
    );

    sessionStorage.removeItem(
      "crm_user"
    );

    setUser(null);

    console.log(
      "[SiteHeader] Token AFTER logout:",
      sessionStorage.getItem("crm_token")
    );

    console.log(
      "[SiteHeader] User AFTER logout:",
      sessionStorage.getItem("crm_user")
    );

    console.log(
      "[SiteHeader] Redirecting to /crm"
    );

    navigate("/crm");
  }

  // ========================================
  // RENDER
  // ========================================

  console.log(
    "[SiteHeader] Render → user:",
    user
  );

  return (
    <header
      className={
        scrolled ? "scrolled" : ""
      }
    >

      {/* ======================================
          LOGO
      ====================================== */}

      <Link
        className="brand"
        to="/"
      >
        <img
          src="assets/images/company-logo.jpeg"
          alt="RH Nexus Events"
        />

        <span>
          RH NEXUS
          <small>EVENTS</small>
        </span>
      </Link>

      {/* ======================================
          MENU BUTTON
      ====================================== */}

      <button
        className="menu"
        aria-expanded={open}
        aria-controls="nav"
        onClick={() =>
          setOpen(!open)
        }
      >
        Menu
      </button>

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <nav
        id="nav"
        className={
          open ? "open" : ""
        }
      >
        {[
          ["/", "Home"],
          ["/events", "Events"],
          ["/team", "Team"],
          ["/vendor", "Vendor"],
          ["/contact", "Contact"],
        ].map(
          ([url, label]) => (
            <NavLink
              key={url}
              to={url}
              end
            >
              {label}
            </NavLink>
          )
        )}
      </nav>

      {/* ======================================
          ACCOUNT + LOGOUT
      ====================================== */}

      <div
        className="header-account-area"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >

        {/* Account Icon */}

        <Link
          className="account"
          to="/crm"
          aria-label={
            user
              ? `${user.role || "User"} CRM`
              : "CRM Login"
          }
          title={
            user
              ? "Open CRM Dashboard"
              : "CRM Login"
          }
          onClick={
            handleAccountClick
          }
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
            <circle
              cx="12"
              cy="8"
              r="4"
            />

            <path
              d="M4 22v-3a8 8 0 0 1 16 0v3"
            />
          </svg>
        </Link>

        {/* Logout */}

   
{/* Logout */}

{user && (
<button
  type="button"
  className="logout-btn"
  onClick={handleLogout}
  style={{
    minHeight: "44px",
    padding: "0 21px",
    borderRadius: "999px",
    border: "1px solid transparent",
    background: "#94c11f",
    color: "#070a07",
    fontSize: ".93rem",
    fontWeight: "650",
    cursor: "pointer",
    transition: "0.2s ease"
  }}
>
  Logout
</button>
)}
        

      </div>

    </header>
  );
}
