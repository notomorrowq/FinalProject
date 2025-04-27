import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from '../components/TransactionForm'; // путь к вашему компоненту
import { db } from '../../firebase'; // импортируйте firebase, если нужно
import '@testing-library/jest-dom';

jest.mock('../../firebase'); // Мокаем Firebase, чтобы не взаимодействовать с реальной базой данных

describe('TransactionForm', () => {
  test('должен отобразить форму и корректно отправить данные', () => {
    // Мокаем функцию добавления транзакции
    const addTransaction = jest.fn();

    render(
      <TransactionForm addTransaction={addTransaction} editingTransaction={null} updateTransaction={() => {}} setEditingTransaction={() => {}} />
    );

    // Проверяем, что форма отображается
    expect(screen.getByPlaceholderText(/Category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();

    // Заполняем форму
    fireEvent.change(screen.getByPlaceholderText(/Category/i), { target: { value: 'Food' } });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText(/Date/i), { target: { value: '2025-04-27' } });

    // Отправляем форму
    fireEvent.click(screen.getByText(/Add/i));

    // Проверяем, что функция addTransaction была вызвана с правильными данными
    expect(addTransaction).toHaveBeenCalledWith({
      type: 'expense',
      category: 'Food',
      description: '',
      amount: 100,
      date: '2025-04-27',
    });
  });
});
