import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive ? "side-link active" : "side-link";

  return (
    <aside className="sidebar">
      <nav className="side-nav">
        <NavLink to="/dashboard" className={linkClass}>📊 Dashboard</NavLink>
        <NavLink to="/expenses" className={linkClass}>➕ Expenses</NavLink>
        <NavLink to="/insights" className={linkClass}>💡 Insights</NavLink>
        <NavLink to="/assistant" className={linkClass}>🤖 Assistant</NavLink>
        <NavLink to="/ai" className={linkClass}>🧠 AI Recommendations</NavLink>        
      </nav>

      <div className="side-footer">
        <small>Built with React — Resume-ready</small>
      </div>
    </aside>
  );
}
