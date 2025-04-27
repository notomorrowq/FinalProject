import { render, screen } from '@testing-library/react';
import Charts from '../components/Charts'; // путь к вашему компоненту

jest.mock('recharts', () => ({
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  Cell: () => <div />,
  BarChart: ({ children }) => <div>{children}</div>,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

describe('Charts', () => {
  test('должен отобразить графики', () => {
    const transactions = [
      { id: '1', date: '2025-04-27', type: 'expense', category: 'Food', amount: 100 },
      { id: '2', date: '2025-04-26', type: 'income', category: 'Salary', amount: 1500 },
    ];

    render(<Charts transactions={transactions} />);

    // Проверяем, что графики отображаются
    expect(screen.getByText(/PieChart/i)).toBeInTheDocument();
    expect(screen.getByText(/BarChart/i)).toBeInTheDocument();
    expect(screen.getByText(/LineChart/i)).toBeInTheDocument(); // Добавьте проверку для LineChart, если нужно
  });
});
