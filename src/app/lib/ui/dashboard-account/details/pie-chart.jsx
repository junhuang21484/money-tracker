"use client";
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#D0D0D0'];

const aggregateByCategory = (transactions, accountData) => {
  const totalsByCategory = {};

  transactions.forEach(transaction => {
    const accountType = accountData[transaction.account_id];
    const isDepository = accountType && accountType.is_depository === 1;

    const category = transaction.category;

    if (!totalsByCategory[category]) {
      totalsByCategory[category] = 0;
    }
    totalsByCategory[category] += Math.abs(transaction.amount);
  });

  return Object.entries(totalsByCategory).map(([category, value]) => ({
    name: category,
    value
  }));
};


export default function SpendingPieChart({ transactionData, accountData }) {
  console.log('Account Data:', accountData);

  if (!accountData || typeof accountData !== 'object' || accountData instanceof Array) {
    console.error('accountData is not an object or is an array', accountData);
    return <div>Error: Account data is not valid.</div>;
  }

  const dataForPieChart = aggregateByCategory(transactionData, accountData);
  console.log('Data for Pie Chart:', dataForPieChart);

  if (dataForPieChart.every(entry => entry.value === 0)) {
    console.warn('All values for the pie chart are zero.');
    return <div>No data to display.</div>;
  }

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

