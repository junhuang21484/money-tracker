"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SimpleGraph({ accountData, transactionData }) {
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


  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className='text-xl text-center'>Balance Over Time</h1>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month_start" />
        <YAxis 
        domain={[0, dataMax => (dataMax + 500)]} 
        tickFormatter={(tick) => Math.round(tick).toString()} 
        />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" dot={true} />
      </LineChart>
    </ResponsiveContainer>
  );
}


















