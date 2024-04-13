"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

const aggregateByCategory = (transactions, accountData) => {
  const totalsByCategory = {};

  transactions.forEach((transaction) => {
    const accountType = accountData[transaction.account_id];
    const isDepository = accountType && accountType.is_depository === 1;

    const category = transaction.category;

    if (!totalsByCategory[category]) {
      totalsByCategory[category] = 0;
    }
    totalsByCategory[category] += Math.abs(transaction.amount);
  });

  return Object.entries(totalsByCategory).map(([category, value]) => ({
    name: category,
    value,
  }));
};

export default function SpendingPieChart({ transactionData, accountData }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value === "" ? null : event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value === "" ? null : event.target.value);
  };

  const filteredTransactions = transactionData.filter(
    (transaction) =>
      (selectedMonth === null ||
        new Date(transaction.date).getMonth() === parseInt(selectedMonth)) &&
      (selectedYear === null ||
        new Date(transaction.date).getFullYear() === parseInt(selectedYear))
  );

  const dataForPieChart = aggregateByCategory(
    filteredTransactions,
    accountData
  );

  if (dataForPieChart.every((entry) => entry.value === 0)) {
    console.warn("All values for the pie chart are zero.");
    return <div>No data to display.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-x-4 space-y-4">
      {/* Dropdown menu to select month */}
      <div className="space-x-4 space-y-2">
        <select
          value={selectedMonth || ""}
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
          value={selectedYear || ""}
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
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
