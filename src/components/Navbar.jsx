import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="brand">FinAI</div>
        <div className="brand-sub">Personal Finance • Smart Insights</div>
      </div>

      <div className="nav-right">
        <div className="profile">
          <span className="avatar">H</span>
          <span className="name">Harish</span>
        </div>
      </div>
    </header>
  );
}
