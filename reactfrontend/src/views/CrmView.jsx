import React, { useState } from "react";
import { cx } from "../utils/cx.js";
import { useNavigate } from "react-router-dom";

export default function CrmView({ home = false }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

const navigate = useNavigate();
  const base = (
    import.meta.env.VITE_CRM_BASE_URL ||
    window.RH_CONFIG?.crmBaseUrl ||
    ""
  ).replace(/\/$/, "");

async function submit() {
  console.log("CRM BASE URL:", base);
console.log("LOGIN URL:", base + "/api/login");
  setStatus("");

  if (!base) {
    setStatus(
      "CRM access is not connected yet. Please contact rhnexusevents@gmail.com for account assistance.",
    );
    return;
  }

  setBusy(true);

  try {
    const response = await fetch(base + "/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw Error(
        Object.values(result.errors || {})
          .flat()
          .join(" ") ||
          result.message ||
          "Login failed.",
      );
    }

    // ========================================
    // LOGIN RESPONSE
    // ========================================

    console.log(
      "[CrmView] Login response:",
      result
    );

    console.log(
      "[CrmView] Sanctum token:",
      result.token
    );

    // ========================================
    // USER + ROLE
    // ========================================

    const user = result.user;
    const role = user?.role;

    console.log(
      "[CrmView] Logged-in user:",
      user
    );

    console.log(
      "[CrmView] User role:",
      role
    );

    // ========================================
    // VALIDATE USER + ROLE
    // ========================================

    if (!user || !role) {
      console.error(
        "[CrmView] ❌ User or role missing:",
        {
          user,
          role,
        }
      );

      setStatus(
        "No valid role assigned to this account."
      );

      return;
    }

    // ========================================
    // SAVE SESSION
    // ========================================

    sessionStorage.setItem(
      "crm_token",
      result.token
    );

    sessionStorage.setItem(
      "crm_user",
      JSON.stringify(user)
    );

    console.log(
      "[CrmView] ✅ CRM session saved"
    );

    console.log(
      "[CrmView] Session user:",
      JSON.parse(
        sessionStorage.getItem("crm_user")
      )
    );

    setStatus(
      "You are signed in successfully."
    );

    // ========================================
    // ROLE BASED REDIRECT
    // ========================================

    if (role === "admin") {
      console.log(
        "[CrmView] 👑 Admin → /crm/admin"
      );

      navigate(
        "/crm/admin",
        {
          replace: true,
        }
      );

    } else if (role === "manager") {
      console.log(
        "[CrmView] 👔 Manager → /crm/manager"
      );

      navigate(
        "/crm/manager",
        {
          replace: true,
        }
      );

    } else if (role === "client") {
      console.log(
        "[CrmView] 👤 Client → /crm/client"
      );

      navigate(
        "/crm/client",
        {
          replace: true,
        }
      );

    } else {
      console.warn(
        "[CrmView] ⚠️ Unknown role:",
        role
      );

      sessionStorage.removeItem(
        "crm_token"
      );

      sessionStorage.removeItem(
        "crm_user"
      );

      setStatus(
        "No valid role assigned to this account."
      );

      return;
    }

    // ========================================
    // CLEAR FORM
    // ========================================

    setValues({
      email: "",
      password: "",
    });

  } catch (error) {
    console.error(
      "[CrmView] Login error:",
      error
    );

    setStatus(
      error.message ||
      "Unable to connect to the CRM."
    );

  } finally {
    setBusy(false);
  }
}


  return (
    <>
      <main id="main">
        <section className={["section crm-layout"].filter(Boolean).join(" ")}>
          <div>
            <p className={["eyebrow"].filter(Boolean).join(" ")}>
              {"RH NEXUS CRM"}
            </p>

            <h1>
              {"Your events."}
              <br />
              {"One place."}
            </h1>

            <p>{"Access your account."}</p>
          </div>

          <div className={["form-panel"].filter(Boolean).join(" ")}>
            <div className={["tabs"].filter(Boolean).join(" ")}>
              <button
                type="button"
                className={[cx({ selected: true })]
                  .filter(Boolean)
                  .join(" ")}
              >
                {"Login"}
              </button>
            </div>

            {!base ? (
              <p
                id="crm-notice"
                className={["notice"].filter(Boolean).join(" ")}
              >
                {"Account access requires the CRM server to be configured."}
              </p>
            ) : null}

            <form
              id="auth-form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className={["form-grid"].filter(Boolean).join(" ")}
            >
              <label>
                {"Email *"}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength="200"
                  value={values.email}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      email: e.target.value,
                    }))
                  }
                />
              </label>

              <label>
                {"Password *"}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength="1"
                  required
                  maxLength="200"
                  value={values.password}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      password: e.target.value,
                    }))
                  }
                />
              </label>

              <button
                type="submit"
                disabled={busy}
                className={["btn"].filter(Boolean).join(" ")}
              >
                {busy ? "Please wait…" : "Login"}
              </button>

              <p
                role="status"
                className={["form-status full"].filter(Boolean).join(" ")}
              >
                {status}
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}