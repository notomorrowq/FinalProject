import React, { useState, useEffect } from 'react';

function TransactionForm({ addTransaction, editingTransaction, updateTransaction, setEditingTransaction }) {

  const [form, setForm] = useState({ type: 'expense', category: '', description: '', amount: '', date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, { ...form, amount: parseFloat(form.amount) });
      setEditingTransaction(null);
    } else {
      addTransaction({ ...form, amount: parseFloat(form.amount) });
    }
    setForm({ type: 'expense', category: '', description: '', amount: '', date: '' });
    
  };

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type,
        category: editingTransaction.category,
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
      });
    }
  }, [editingTransaction]);

  return (
    <div className="transactionfrom-container">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <select name="type" value={form.type} onChange={handleChange} className="border p-1">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-1" />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-1" />
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="border p-1" />
        <input type="date" name="date" placeholder='Date' value={form.date} onChange={handleChange} className="border p-1" />
        <button type="submit" className="bg-blue-500 text-white p-1">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;