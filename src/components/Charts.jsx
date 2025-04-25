import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Charts({ transactions }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const categoryData = Object.entries(transactions.reduce((acc, t) => {
    if (t.type === 'expense') acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    const item = acc.find(i => i.month === month) || { month, income: 0, expense: 0 };
    if (t.type === 'income') item.income += t.amount;
    if (t.type === 'expense') item.expense += t.amount;
    if (!acc.includes(item)) acc.push(item);
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;