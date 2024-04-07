'use client'
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

const COLORS = ['#50C878', '#3498DB', '#9B59B6', '#E74C3C', '#F1C40F', '#E67E22', '#2ECC71', '#1ABC9C', '#D35400', '#C0392B', '#8E44AD', '#2980B9'];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if(percent < 0.005) {
      return null;
    }
    
    return (
      <Text 
        x={x} 
        y={y} 
        fill={COLORS[index % COLORS.length]} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={'0.8em'}
        >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </Text>
    );
};

export default function ExpensesPie({ transactionsData }) {
  const dataForPieChart = useMemo(() => {
    const totalsByCategory = {};

    transactionsData.forEach(transaction => {
      const category = transaction.category || 'Uncategorized';

      if (!totalsByCategory[category]) {
        totalsByCategory[category] = 0;
      }
      totalsByCategory[category] += Math.abs(transaction.amount);
    });

    return Object.entries(totalsByCategory).map(([category, value]) => ({
      name: category,
      value
    }));
  }, [transactionsData]);

  if (!dataForPieChart.length) {
    return <div>No transaction data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataForPieChart}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="80%"
          innerRadius="60%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {dataForPieChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="bottom" layout="horizontal" wrapperStyle={{ bottom: -10 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

