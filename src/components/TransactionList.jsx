import React from 'react';

function TransactionList({ transactions, deleteTransaction, onEdit }) {

  return (
    <div className="mb-4">
      <h2 className="font-bold">Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id} className="border-b py-1 flex justify-between">
            <span>{t.date} - {t.type} - {t.category}: ${t.amount}</span>
            <div className="transaction-buttons">
              <button onClick={() => onEdit(t)} className="edit">Edit</button>
              <button onClick={() => deleteTransaction(t.id)} className="delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>  
  );
}

export default TransactionList;
