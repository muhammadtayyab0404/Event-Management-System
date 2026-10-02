import React from "react";
import { Outlet } from "react-router-dom";
import "../../public/assets/css/crmlayout.css";
import Sidebar from "../components/admincrm/Sidebar";

export default function RHNexusCRMLayout() {
  return (
    <div className="rhnx-layout">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="rhnx-main">
        <header className="rhnx-header">
          <div>
            <small>RH NEXUS / CRM</small>

            <h2>Overview</h2>
          </div>
        </header>

        <section className="rhnx-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
