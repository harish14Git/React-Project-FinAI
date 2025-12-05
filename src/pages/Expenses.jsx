import React, { useEffect, useState } from "react";

/* load & save helpers */
function loadExpenses() {
  try {
    const raw = localStorage.getItem("expenses_v1");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveExpenses(list) {
  localStorage.setItem("expenses_v1", JSON.stringify(list));
}

export default function Expenses() {
  const [list, setList] = useState(() => loadExpenses());
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "",
    amount: "",
    notes: ""
  });
  const [editingId, setEditingId] = useState(null);

  /* Save to localStorage whenever list changes */
  useEffect(() => {
    saveExpenses(list);
  }, [list]);

  /* When editing, focus category field */
  useEffect(() => {
    if (editingId) {
      const el = document.querySelector("select[name='category']");
      el?.focus();
    }
  }, [editingId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function addOrUpdate() {
    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    if (editingId) {
      // update existing
      setList(prev =>
        prev.map(it =>
          it.id === editingId
            ? { ...it, ...form, amount: Number(form.amount) }
            : it
        )
      );
      setEditingId(null);
    } else {
      // add new
      setList(prev => [
        {
          id: Date.now(),
          ...form,
          amount: Number(form.amount)
        },
        ...prev
      ]);
    }

    // reset form
    setForm({
      date: new Date().toISOString().slice(0, 10),
      category: "",
      amount: "",
      notes: ""
    });
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      date: item.date,
      category: item.category,
      amount: item.amount,
      notes: item.notes
    });
  }

  function removeItem(id) {
    setList(prev => prev.filter(i => i.id !== id));
  }

  const total = list.reduce((s, i) => s + Number(i.amount || 0), 0);

  // Sort: Latest first
  const sortedList = [...list].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p className="page-sub">Add, edit or remove entries. Data persists locally.</p>
        </div>

        {list.length > 0 && (
          <button
            className="btn ghost"
            onClick={() => {
              if (window.confirm("Clear all expenses?")) setList([]);
            }}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="expense-area">
        {/* FORM CARD */}
        <div className="card form-card">
          <h3>{editingId ? "Edit Expense" : "Add Expense"}</h3>

          <div className="expense-form">
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Health</option>
              <option>Entertainment</option>
              <option>Other</option>
            </select>

            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />

            <input
              name="notes"
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={handleChange}
            />

            <button className="btn" onClick={addOrUpdate}>
              {editingId ? "Update" : "Add"}
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <strong>Total:</strong> ₹{total}
          </div>
        </div>

        {/* LIST CARD */}
        <div className="card list-card">
          <h3>Recent</h3>
          <div className="expense-list">
            {sortedList.length === 0 && (
              <p>No expenses yet — add one to get charts.</p>
            )}

            {sortedList.map(item => (
              <div className="expense-item" key={item.id}>
                <div>
                  <div className="expense-meta">
                    <strong>{item.category}</strong> • ₹{item.amount}
                  </div>

                  <div className="expense-sub">
                    {item.date}
                    {item.notes && ` · ${item.notes}`}
                  </div>
                </div>

                <div className="expense-actions">
                  <button
                    className="btn small"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn ghost small"
                    onClick={() => removeItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
