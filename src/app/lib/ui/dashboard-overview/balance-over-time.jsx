'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const styles = {
      backgroundColor: '#10B981',
      padding: '5px 10px',
      border: '1px solid #cccccc',
      borderRadius: '8px',
      color: 'black',
    }
    return (
      <div className="custom-tooltip" style={styles}>
        <p className="label">{`$${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function OverviewGraph( { transactionsData } ) {
  console.log("ALL TRANS DATA:", transactionsData);
  const [data, setData] = useState([]);

  useEffect(() => {
    let runningBalance = 0;
  
    const validTransactions = transactionsData.filter(transaction => transaction && transaction.date);
  
    const sortedTransactions = validTransactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  
    const balanceOverTime = sortedTransactions.map(transaction => {
      runningBalance += parseFloat(transaction.amount);
  
      const transactionDate = new Date(transaction.date);
      const dateString = transactionDate.toISOString().split('T')[0];
  
      return {
        date: dateString,
        balance: runningBalance
      };
    });
  
    setData(balanceOverTime);
  }, [transactionsData]);
  
  const minBalance = Math.min(...data.map((data) => data.balance));
  const maxBalance = Math.max(...data.map((data) => data.balance));
  const buffer = (maxBalance - minBalance) * 0.05;
  const minDomain = minBalance - buffer;
  const maxDomain = maxBalance + buffer;


  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className='text-xl text-center'>Total Balance Over Time</h1>
      <LineChart data={data}>
        <CartesianGrid stroke="#e0e0e0" />
        <XAxis 
          dataKey="date" 
          axisLine={{ stroke: '#e0e0e0' }} 
          tickLine={false} 
          tick={{ fill: '#6b7280' }} 
          tickFormatter={(tickItem) => {
            const date = new Date(tickItem);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(2);
            return `${month}-${year}`;
          }}
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
