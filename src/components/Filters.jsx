import React from 'react';

function Filters({ filters, setFilters }) {
  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAmountChange = e => {
    const value = parseFloat(e.target.value);
    const range = [...filters.amountRange];
    if (e.target.name === 'min') range[0] = value || 0;
    if (e.target.name === 'max') range[1] = value || Infinity;
    setFilters({ ...filters, amountRange: range });
  };

  return (
    <div className="filters-container">
      <select name="type" value={filters.type} onChange={handleChange} className="border p-1">
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="border p-1" />
      <input type="date" name="from" placeholder='From' onChange={e => setFilters({ ...filters, dateRange: [e.target.value, filters.dateRange[1]] })} className="border p-1" />
      <input type="date" name="to" placeholder='To' onChange={e => setFilters({ ...filters, dateRange: [filters.dateRange[0], e.target.value] })} className="border p-1" />
      <input type="number" name="min" placeholder="Min Amount" onChange={handleAmountChange} className="border p-1" />
      <input type="number" name="max" placeholder="Max Amount" onChange={handleAmountChange} className="border p-1" />
    </div>
  );
}

export default Filters;
