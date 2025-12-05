import React, { useMemo } from "react";

function loadExpenses() {
  try {
    const raw = localStorage.getItem("expenses_v1");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function Insights() {
  const list = useMemo(() => loadExpenses(), []);
  const total = list.reduce((s, i) => s + Number(i.amount || 0), 0);
  const categories = {};
  list.forEach(i => categories[i.category] = (categories[i.category] || 0) + Number(i.amount || 0));
  const top = Object.entries(categories).sort((a,b) => b[1]-a[1])[0];

  const uniqueDates = [...new Set(list.map(i => i.date))];
  const avgDaily = uniqueDates.length ? Math.round(total / uniqueDates.length) : 0;
  const overspend = list.filter(i => Number(i.amount) > 1000).length;
  const avgPerEntry = list.length ? Math.round(total / list.length) : 0;
  const forecast = avgPerEntry * 30;

  const insights = [
    { title: "Monthly Spend", text: `Recorded total ₹${total}` },
    { title: "Top Category", text: top ? `${top[0]} — ₹${top[1]}` : "No category data" },
    { title: "Avg Daily Spend", text: `Approx ₹${avgDaily} / day` },
    { title: "Overspend Alerts", text: `${overspend} transactions over ₹1000` },
    { title: "Forecast", text: `Estimated next-month spend: ₹${forecast}` },
  ];

  return (
    <section className="page">
      <div className="page-header">
        <h1>Insights</h1>
        <p className="page-sub">Actionable, explainable suggestions you can talk through in interviews.</p>
      </div>

      <div className="insights-grid">
        {insights.map((ins, i) => (
          <div key={i} className="insight-card">
            <h4>{ins.title}</h4>
            <p>{ins.text}</p>
          </div>
        ))}
      </div>

      <div className="card advice-card">
        <h3>Actionable Advice</h3>
        <ul>
          <li>Trim top category spending by 10% — highest immediate impact.</li>
          <li>Set a weekly micro-budget and review every Sunday.</li>
          <li>Export data for offline backups (CSV export is a good improvement).</li>
        </ul>
      </div>
    </section>
  );
}
