import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';
import Charts from './components/Charts';
import { CSVLink } from 'react-csv';

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';          // ← ваш файл конфигурации

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    dateRange: ['', ''],
    amountRange: [0, Infinity],
  });
  const [editingTransaction, setEditingTransaction] = useState(null);

  /** ------------------- CRUD ------------------- **/

  // CREATE
  const addTransaction = async (t) => {
    await addDoc(collection(db, 'transactions'), {
      ...t,
      createdAt: serverTimestamp(),        // пригодится для сортировки
    });
  };

  // UPDATE
  const updateTransaction = async (id, updated) => {
    await updateDoc(doc(db, 'transactions', id), updated);
  };

  // DELETE
  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, 'transactions', id));
  };

  /** --------- подписка на коллекцию в реальном времени --------- **/
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'transactions'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTransactions(list);
    });
    return unsub;                          // отписываемся при размонтировании
  }, []);

  /** ------------------- UI helpers ------------------- **/

  const handleEdit = (transaction) => setEditingTransaction(transaction);

  const applyFilters = () =>
    transactions.filter(t => {
      const matchType     = !filters.type || t.type === filters.type;
      const matchCategory = !filters.category || t.category === filters.category;
      const matchDate     = !filters.dateRange[0] ||
        (new Date(t.date) >= new Date(filters.dateRange[0]) &&
         new Date(t.date) <= new Date(filters.dateRange[1]));
      const matchAmount   =
        t.amount >= filters.amountRange[0] && t.amount <= filters.amountRange[1];
      return matchType && matchCategory && matchDate && matchAmount;
    });

  /** --------------------------- JSX --------------------------- **/

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>

      <TransactionForm
        addTransaction={addTransaction}
        editingTransaction={editingTransaction}
        updateTransaction={updateTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <Filters filters={filters} setFilters={setFilters} />

      <TransactionList
        transactions={applyFilters()}
        deleteTransaction={deleteTransaction}
        onEdit={handleEdit}
      />

      <Charts transactions={applyFilters()} />

      <CSVLink
        data={transactions}
        filename="transactions.csv"
        className="btn mt-4"
      >
        Export CSV
      </CSVLink>
    </div>
  );
}

export default App;
