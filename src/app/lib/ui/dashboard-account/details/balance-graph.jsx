"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BalanceOverTimeGraph({ accountData, transactionData }) {
  console.log('accountData:', accountData);
  console.log('transactionData:', transactionData);
  const [data, setData] = useState([]);

  useEffect(() => {
    let currentBalance = parseFloat(accountData.balance);

    const sortedTransactions = transactionData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const balanceOverTime = sortedTransactions.reduce((acc, transaction) => {
      currentBalance += parseFloat(transaction.amount);
      const newBalance = parseFloat(currentBalance.toFixed(2));

      acc.push({
        date: transaction.date,
        balance: newBalance
      });

      return acc;
    }, []);

    balanceOverTime.push({
      date: 'Latest',
      balance: parseFloat(accountData.balance.toFixed(2))
    });

    setData(balanceOverTime);
  }, [accountData, transactionData]); 

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const isLatest = payload[0].payload.isLatest;
      if (isLatest) {
        return (
          <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
            <p className="label">{`Current balance: $${payload[0].value}`}</p>
          </div>
        );
      }
    }
    return null;
  };

  const calculateDomain = (data) => {
    const amounts = data.map(item => item.balance);
    const dataMax = Math.max(...amounts);
    const dataMin = Math.min(...amounts);
    const buffer = (dataMax - dataMin) * 0.1;

    return [dataMin - buffer, dataMax + buffer];
  };

  const [minDomain, maxDomain] = calculateDomain(data);
  

  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className='text-xl text-center'>Balance Over Time</h1>
      <LineChart data={data}>
        <CartesianGrid stroke="#e0e0e0" />
        <XAxis 
          dataKey="date" 
          axisLine={{ stroke: '#e0e0e0' }} 
          tickLine={false} 
          tick={{ fill: '#6b7280' }} 
        />
        <YAxis
          domain={[minDomain, maxDomain]} 
          tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`} 
          axisLine={{ stroke: '#e0e0e0' }} 
          tickLine={false} 
          tick={{ fill: '#6b7280' }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#10B981"
          dot={false} 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

















