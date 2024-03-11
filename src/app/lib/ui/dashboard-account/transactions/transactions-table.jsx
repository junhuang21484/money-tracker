"use client";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

export default function TransactionsTable({ account_type, transactions }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-emerald-500">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            {account_type === "manual" && <th scope="col" className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans) => {
            return (
              <tr
                key={trans.transaction_id}
                className="bg-gray-800 hover:bg-gray-600 text-white"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4  rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="checkbox-table-3" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">{trans.name}</td>
                <td className="px-6 py-4">{formatDateToLocal(trans.date)}</td>
                <td className="px-6 py-4">{trans.category}</td>
                <td className="px-6 py-4">{formatCurrency(trans.amount)}</td>
                {account_type === "manual" && <td className="px-6 py-4">To be worked on</td>}
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
