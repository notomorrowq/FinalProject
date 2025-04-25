import React, { useState } from 'react';

function TransactionForm({ addTransaction }) {
  const [form, setForm] = useState({ type: 'expense', category: '', description: '', amount: '', date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm({ type: 'expense', category: '', description: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <select name="type" value={form.type} onChange={handleChange} className="border p-1">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-1" />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-1" />
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="border p-1" />
      <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-1" />
      <button type="submit" className="bg-blue-500 text-white p-1">Add</button>
    </form>
  );
}

export default TransactionForm;