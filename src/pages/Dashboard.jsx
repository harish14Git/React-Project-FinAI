import React, { useMemo } from "react";

/* helper: read expenses from localStorage */
function loadExpenses() {
  try {
    const raw = localStorage.getItem("expenses_v1");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/* simple sparkline: small inline SVG path from numbers */
function Sparkline({ data = [], color = "#2563eb", width = 120, height = 30 }) {
  if (!data.length) return <svg width={width} height={height} />;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const d = `M${points.join(" L ")}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Dashboard() {
  const expenses = useMemo(() => loadExpenses(), []);
  const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const count = expenses.length;
  const avg = count ? Math.round(total / count) : 0;

  // category aggregation
  const byCategory = expenses.reduce((acc, e) => {
    const c = e.category || "Other";
    acc[c] = (acc[c] || 0) + Number(e.amount || 0);
    return acc;
  }, {});
  const sortedCats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCats[0] ? { name: sortedCats[0][0], value: sortedCats[0][1] } : { name: "-", value: 0 };

  // mini trend: last 12 entries amounts for sparkline
  const lastAmounts = expenses.slice(-12).map(e => Number(e.amount || 0));
  // prepare 8 bars (top-8 categories)
  const bars = sortedCats.slice(0, 8).map(([name, value]) => ({ name, value }));
  while (bars.length < 8) bars.push({ name: "—", value: 0 });

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-sub">Track your spending habits, recent transactions, and overall financial health at a glance.</p>
        </div>
        <div className="header-actions">
          <div className="small-cta">Export</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-title">Total Spent</div>
          <div className="stat-value">₹{total.toLocaleString()}</div>
          <div className="stat-sub">{count} entries • Avg ₹{avg}</div>
          <div className="sparkline"><Sparkline data={lastAmounts} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Top Category</div>
          <div className="stat-value">{topCategory.name}</div>
          <div className="stat-sub">₹{topCategory.value}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Entries</div>
          <div className="stat-value">{count}</div>
          <div className="stat-sub">Useful for frequency analysis</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Top 8 Categories</h3>
          <div className="bars-wrap">
            {bars.map((b, i) => {
              const max = Math.max(...bars.map(x => x.value), 1);
              const pct = Math.round((b.value / max) * 100);
              return (
                <div key={i} className="bar-row">
                  <div className="bar-label">{b.name}</div>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="bar-value">₹{b.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="mini-cards">
          <div className="mini-card">
            <h4>Quick Tip</h4>
            <p>Focus on reducing top category to get immediate savings.</p>
          </div>

          <div className="mini-card">
            <h4>Forecast (simple)</h4>
            <p>Estimated next-month spend: ₹{Math.round(avg * 30)}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
