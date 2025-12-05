import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Insights from "./pages/Insights";
import Assistant from "./pages/Assistant";  
import AIRecommendations from "./components/AIRecommendations";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <div className="layout">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/ai" element={<AIRecommendations />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
