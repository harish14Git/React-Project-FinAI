import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AIRecommendations = () => {
  const monthlySpending = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 14500 },
    { month: "Mar", amount: 13800 },
    { month: "Apr", amount: 17000 },
    { month: "May", amount: 16500 },
    { month: "Jun", amount: 19000 },
  ];

  const tips = [
    {
      title: "Spending Increased (22%)",
      detail:
        "Your spending increased in April–June. Review Food, Shopping and Travel categories.",
      type: "warning",
    },
    {
      title: "Save ₹2500 Easily",
      detail:
        "Reducing entertainment & online purchases by 15% helps you save instantly.",
      type: "success",
    },
    {
      title: "Subscriptions Alert",
      detail:
        "You have multiple subscriptions. Switch to quarterly plans to reduce cost.",
      type: "info",
    },
    {
      title: "Food Expenses Up",
      detail:
        "Food spending rises monthly. Weekly meal planning can save ₹800–₹1000.",
      type: "warning",
    },
  ];

  return (
    <div className="page-container fade-in">

      <div className="header-with-image">
        <div>
          <h2 className="page-title">Smart AI Recommendations</h2>
          <p className="subtitle">
            Insights generated based on your recent spending behaviour
          </p>
        </div>

        <img
          src="/src/assets/Images/ai-insights.png"
          className="header-image"
          alt="AI Insights"
        />
      </div>

      <div className="chart-card scale-on-hover">
        <h3>6-Month Spending Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="tips-grid">
        {tips.map((t, index) => (
          <div key={index} className={`tip-card ${t.type} scale-on-hover`}>
            <h4>{t.title}</h4>
            <p>{t.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
