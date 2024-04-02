import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { date: '2023-01-01', balance: 1000 },
  { date: '2023-02-01', balance: 2000 },
  { date: '2023-03-01', balance: 1500 },
  { date: '2023-04-01', balance: 2500 },
  { date: '2023-05-01', balance: 3000 },
  { date: '2023-06-01', balance: 3500 },
  { date: '2023-07-01', balance: 3000 },
  { date: '2023-08-01', balance: 4000 },
  { date: '2023-09-01', balance: 4500 },
  { date: '2023-10-01', balance: 5000 },
  { date: '2023-11-01', balance: 5500 },
  { date: '2023-12-01', balance: 6000 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ddd' }}>
        <p className="label">{`Balance: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function OverviewGraph() {
  const minBalance = Math.min(...dummyData.map((data) => data.balance));
  const maxBalance = Math.max(...dummyData.map((data) => data.balance));
  const buffer = (maxBalance - minBalance) * 0.05;
  const minDomain = minBalance - buffer;
  const maxDomain = maxBalance + buffer;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <h1 className='text-xl text-center'>Total Balance Over Time</h1>
      <LineChart data={dummyData}>
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
