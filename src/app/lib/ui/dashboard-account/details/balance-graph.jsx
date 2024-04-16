"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';

export default function BalanceOverTimeGraph({ accountData, transactionData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let currentBalance = parseFloat(accountData.balance);

    const sortedTransactions = transactionData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const dateRange = sortedTransactions.length ? { start: startOfMonth(new Date(sortedTransactions[0].date)), end: endOfMonth(new Date(sortedTransactions[sortedTransactions.length - 1].date)) } : null;
    const months = dateRange ? eachMonthOfInterval(dateRange) : [];

    const balanceOverTime = months.map(month => {
      const monthEnd = endOfMonth(month);
      const transactionsThisMonth = sortedTransactions.filter(t => new Date(t.date) <= monthEnd);
      transactionsThisMonth.forEach(t => {
        currentBalance += parseFloat(t.amount);
      });
      return {
        date: format(month, 'MMM-yyyy'),
        balance: parseFloat(currentBalance.toFixed(2))
      };
    });

    balanceOverTime.push({
      date: 'Latest',
      balance: parseFloat(accountData.balance.toFixed(2))
    });

    setData(balanceOverTime);
  }, [accountData, transactionData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const styles = {
        backgroundColor: '#10B981',
        padding: '5px 10px', 
        border: '1px solid #cccccc', 
        borderRadius: '8px', 
        color: 'black', 
      };
  
      return (
        <div className="custom-tooltip" style={styles}>
          <p className="label">{`$${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
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

















