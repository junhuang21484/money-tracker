"use client";
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";

const COLORS = [
  "#50C878",
  "#3408DB",
  "#9B59B6",
  "#E74C3C",
  "#9900B9",
  "#3498DB",
  "#AAAA44",
  "#FF43A7",
  "#FFD700",
  "#92A500",
  "#F1C40F",
  "#E67E22",
  "#1ECC71",
  "#8AB09C",
  "#D35400",
  "#C0392B",
  "#8E44AD",
  "#FF69B4",
  "#00FFFF",
  "#FF00FF",
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) {
    return null;
  }

  return (
    <Text
      x={x}
      y={y}
      fill={COLORS[index % COLORS.length]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={"1em"}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </Text>
  );
};

export default function ExpensesPie({ transactionsData }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(
      (transaction) =>
        (selectedMonth === "" ||
          new Date(transaction.date).getMonth() === parseInt(selectedMonth)) &&
        (selectedYear === "" ||
          new Date(transaction.date).getFullYear() === parseInt(selectedYear))
    );
  }, [transactionsData, selectedMonth, selectedYear]);

  const dataForPieChart = useMemo(() => {
    const totalsByCategory = {};

    filteredTransactions.forEach((transaction) => {
      const category = transaction.category || "Uncategorized";

      if (!totalsByCategory[category]) {
        totalsByCategory[category] = 0;
      }
      totalsByCategory[category] += Math.abs(transaction.amount);
    });

    return Object.entries(totalsByCategory).map(([category, value]) => ({
      name: category,
      value,
    }));
  }, [filteredTransactions]);

  if (!dataForPieChart.length) {
    return <div>No transaction data available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-x-4 space-y-4">
      {/* Dropdown menu to select month */}
      <div className="space-x-4 space-y-2">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="truncate rounded-xl bg-gray-800 px-2 py-2 text-center text-l"
        >
          <option value="">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>

        {/* Dropdown menu to select year */}
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="truncate rounded-xl bg-gray-800 px-2 py-2 text-center text-l"
        >
          <option value="">All Years</option>
          {/* Using past 5 years*/}
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            wrapperStyle={{ bottom: -10 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
