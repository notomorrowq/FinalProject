import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';
import Charts from './components/Charts';
import { CSVLink } from 'react-csv';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    dateRange: ['', ''],
    amountRange: [0, Infinity],
  });

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (id, updated) => {
    setTransactions(transactions.map(t => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const applyFilters = () => {
    return transactions.filter(t => {
      const matchType = !filters.type || t.type === filters.type;
      const matchCategory = !filters.category || t.category === filters.category;
      const matchDate = !filters.dateRange[0] ||
        (new Date(t.date) >= new Date(filters.dateRange[0]) && new Date(t.date) <= new Date(filters.dateRange[1]));
      const matchAmount = t.amount >= filters.amountRange[0] && t.amount <= filters.amountRange[1];
      return matchType && matchCategory && matchDate && matchAmount;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <TransactionForm addTransaction={addTransaction} />
      <Filters filters={filters} setFilters={setFilters} />
      <TransactionList
        transactions={applyFilters()}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction}
      />
      <Charts transactions={applyFilters()} />
      <CSVLink data={transactions} filename="transactions.csv" className="btn mt-4">Export CSV</CSVLink>
    </div>
  );
}

export default App;