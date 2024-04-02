'use client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dataForPieChart = [
  { name: 'Category A', value: 100 },
  { name: 'Category B', value: 150 },
  { name: 'Category C', value: 300 },
  { name: 'Category D', value: 200 },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 15;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <Text 
        x={x} 
        y={y} 
        fill={COLORS[index % COLORS.length]} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central">
        {`${dataForPieChart[index].name} (${(percent * 100).toFixed(0)}%)`}
      </Text>
    );
  };

export default function ExpensesPie() {
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
