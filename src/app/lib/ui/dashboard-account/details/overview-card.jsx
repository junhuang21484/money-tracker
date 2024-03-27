'use client'

import { BanknotesIcon, DocumentArrowUpIcon, CreditCardIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const iconMap = {
  balance: BanknotesIcon,
  accType: CreditCardIcon,
  income: DocumentArrowDownIcon,
  expense: DocumentArrowUpIcon
};

export default function OverviewCard({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  const { title, value, type } = data[currentIndex];
  const Icon = iconMap[type];

  return (
    <div className="w-full rounded-xl bg-gray-900 p-2 shadow-lg select-none" onClick={handleCardClick}>
      <div className="flex p-4 w-full items-center justify-center text-emerald-500">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-xl font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-gray-800 px-4 py-8 text-center text-2xl">{value}</p>
      <div className="flex justify-center mb-2">
        {data.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mt-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-emerald-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}