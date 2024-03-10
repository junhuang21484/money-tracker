"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTransactionsByAccount } from '../../../data/transactions';
import { eachDayOfInterval, startOfDay, isBefore, isSameDay, format } from 'date-fns';

export default function SimpleGraph({ }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const processTransactions = async () => {
      const accountCreationDate = new Date('2024-03-05T00:00:00Z');
  
      const transactionsResponse = [
        { date: '2024-03-06T12:00:00Z', amount: -100 }, 
        { date: '2024-03-07T12:00:00Z', amount: 200 },
        { date: '2024-03-08T12:00:00Z', amount: -50 }
      ];
  
      let currentBalance = 1000; 
  
      const endDate = new Date('2024-03-10T00:00:00Z');
      const allDays = eachDayOfInterval({
        start: accountCreationDate,
        end: endDate,
      });
  
      let balanceByDay = [];
  
      allDays.forEach(day => {
        let dailyTransactions = transactionsResponse.filter(transaction => {
          let transactionDate = new Date(transaction.date);
          return isBefore(transactionDate, day) || isSameDay(transactionDate, day);
        });
  
        dailyTransactions.forEach(transaction => {
          currentBalance += transaction.amount;
        });
  
        balanceByDay.push({
          date: format(day, 'MM-dd'), 
          balance: currentBalance,
        });
      });

      setData(balanceByDay);
    };
  
    processTransactions();
  }, []);  

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}














