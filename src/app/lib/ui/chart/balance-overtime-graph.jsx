"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, subMonths, subYears } from "date-fns";

export default function BalanceOverTimeGraph({ currentBalance, transactionData }) {
  const [data, setData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("MAX");

  useEffect(() => {
    const sortedTransactions = transactionData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let initialValue = currentBalance;
    const balanceOverTime = sortedTransactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        switch (timeFrame) {
          case "7D":
            return transactionDate > subDays(new Date(), 7);
          case "1M":
            return transactionDate > subMonths(new Date(), 1);
          case "3M":
            return transactionDate > subMonths(new Date(), 3);
          case "1Y":
            return transactionDate > subYears(new Date(), 1);
          default:
            return true;
        }
      })
      .map((transaction) => {
        initialValue = Number(initialValue - transaction.amount).toFixed(2);
        return {
          date: format(new Date(transaction.date), "MMM-dd-yyyy"),
          balance: Number(currentBalance - transaction.amount).toFixed(2),
        };
      });

    balanceOverTime.unshift({ date: "initial", balance: initialValue });
    balanceOverTime.push({ date: "Latest", balance: currentBalance });
    setData(balanceOverTime);
  }, [transactionData, timeFrame]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const styles = {
        backgroundColor: "#10B981",
        padding: "5px 10px",
        border: "1px solid #cccccc",
        borderRadius: "8px",
        color: "black",
      };
      return (
        <div className="custom-tooltip" style={styles}>
          <p className="label">${payload[0]?.payload.balance}</p>
        </div>
      );
    }
    return null;
  };

  const calculateDomain = (data) => {
    const amounts = data.map((item) => item.balance);
    const dataMax = Math.max(...amounts);
    const dataMin = Math.min(...amounts);
    const buffer = (dataMax - dataMin) * 0.1;
    return [dataMin - buffer, dataMax + buffer];
  };

  const [minDomain, maxDomain] = calculateDomain(data);

  const timeFrameBtnStyling = (timeFrameStr) => {
    return `px-4 py-2 rounded-md ${
      timeFrame === timeFrameStr
        ? "bg-emerald-500 text-white"
        : "bg-gray-200 text-gray-500"
    }`;
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <h1 className="text-xl text-center">Balance Over Time</h1>
        <LineChart data={data}>
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#e0e0e0" }}
            tickLine={false}
            tick={{ fill: "#6b7280" }}
          />
          <YAxis
            domain={[minDomain, maxDomain]}
            tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`}
            axisLine={{ stroke: "#e0e0e0" }}
            tickLine={false}
            tick={{ fill: "#6b7280" }}
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
      <div className="flex justify-center mt-4 gap-2">
        <button
          className={timeFrameBtnStyling("7D")}
          onClick={() => setTimeFrame("7D")}
        >
          7D
        </button>
        <button
          className={timeFrameBtnStyling("1M")}
          onClick={() => setTimeFrame("1M")}
        >
          1M
        </button>
        <button
          className={timeFrameBtnStyling("3M")}
          onClick={() => setTimeFrame("3M")}
        >
          3M
        </button>
        <button
          className={timeFrameBtnStyling("1Y")}
          onClick={() => setTimeFrame("1Y")}
        >
          1Y
        </button>
        <button
          className={timeFrameBtnStyling("MAX")}
          onClick={() => setTimeFrame("MAX")}
        >
          MAX
        </button>
      </div>
    </div>
  );
}
