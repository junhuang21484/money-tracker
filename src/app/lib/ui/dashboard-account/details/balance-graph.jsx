"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMonthlyBalanceChange } from '../../../data/transactions';

export default function SimpleGraph({ accountData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyBalance = async () => {
      try {
        const monthlyBalanceChanges = await getMonthlyBalanceChange(accountData.account_id);
        let currentBalance = parseFloat(accountData.balance);

        const balanceOverTime = monthlyBalanceChanges.reduce((acc, monthChange, index) => {
          const balanceChange = parseFloat(monthChange.balance_change);
          currentBalance -= balanceChange;
          const roundedBalance = parseFloat(currentBalance.toFixed(2));

          acc.push({
            month_start: monthChange.month_start,
            balance: roundedBalance
          });

          if (index === monthlyBalanceChanges.length - 1) {
            acc.push({
              month_start: 'Latest', 
              balance: parseFloat(accountData.balance.toFixed(2)) 
            });
          }
          return acc;
        }, []);

        setData(balanceOverTime); 
      } catch (error) {
        console.error('Failed to fetch monthly balance change:', error);
      }
    };

    fetchMonthlyBalance();
  }, [accountData.account_id, accountData.balance]); 

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


















