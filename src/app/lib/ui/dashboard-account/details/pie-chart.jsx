"use client";
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#D0D0D0'];

const aggregateByCategory = (transactions) => {
  const totalsByCategory = {};

  transactions.forEach(({ category, amount }) => {
    if (!totalsByCategory[category]) {
      totalsByCategory[category] = 0;
    }
    totalsByCategory[category] += Math.abs(amount);
  });

  return Object.keys(totalsByCategory).map((category) => ({
    name: category,
    value: totalsByCategory[category],
  }));
};

export default function SpendingPieChart({ transactionData }) {
  const dataForPieChart = aggregateByCategory(transactionData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataForPieChart}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {dataForPieChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

