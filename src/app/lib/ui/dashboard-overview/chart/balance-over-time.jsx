'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const styles = {
      backgroundColor: '#10B981',
      padding: '5px 10px',
      border: '1px solid #cccccc',
      borderRadius: '8px',
      color: 'black',
    };
    const date = new Date(label).toLocaleDateString();
    return (
      <div className="custom-tooltip" style={styles}>
        <p className="label">{`${date}: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function OverviewGraph( { transactionsData, netBalance } ) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let runningBalance = netBalance;
  
    const sortedTransactions = transactionsData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    const balanceOverTime = sortedTransactions.map(transaction => {
      runningBalance += parseFloat(transaction.amount);
  
      return {
        date: transaction.date, 
        balance: runningBalance
      };
    });
  
    setData(balanceOverTime);
  }, [transactionsData, netBalance]);
  
  
  const minBalance = Math.min(...data.map((data) => data.balance));
  const maxBalance = Math.max(...data.map((data) => data.balance));
  const buffer = (maxBalance - minBalance) * 0.05;
  const minDomain = minBalance - buffer;
  const maxDomain = maxBalance + buffer;

  if (data.length === 0) {
    return (
      <div>
        <h1 className='text-xl text-center'>Total Balance Over Time</h1>
        <p className='text-center mt-4'>No data to display</p>
      </div>
    )
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className='text-xl text-center'>Total Balance Over Time</h1>
      <LineChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis 
          dataKey="date" 
          interval="preserveStartEnd"
          axisLine={{ stroke: '#e0e0e0' }} 
          tickLine={false} 
          tick={{ fill: '#6b7280' }} 
          tickFormatter={(tickItem) => {
            return '';
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
