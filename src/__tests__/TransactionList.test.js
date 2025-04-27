import { render, screen, fireEvent } from '@testing-library/react';
import TransactionList from '../components/TransactionList'; // путь к вашему компоненту

describe('TransactionList', () => {
  test('должен отобразить список транзакций и обрабатывать удаление', () => {
    const transactions = [
      { id: '1', date: '2025-04-27', type: 'expense', category: 'Food', amount: 100 },
      { id: '2', date: '2025-04-26', type: 'income', category: 'Salary', amount: 1500 },
    ];

    const deleteTransaction = jest.fn();
    const onEdit = jest.fn();

    render(
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        onEdit={onEdit}
      />
    );

    // Проверяем, что транзакции отображаются
    expect(screen.getByText(/Food/)).toBeInTheDocument();
    expect(screen.getByText(/Salary/)).toBeInTheDocument();

    // Проверяем, что кнопка удаления работает
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(deleteTransaction).toHaveBeenCalledWith('1');
  });
});
