"use client";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { DeleteTransactionBtn, EditTransactionBtn } from "./buttons";
import clsx from "clsx";

export default function TransactionsTable({
  accountType,
  transactions,
}) {
  if (!transactions?.length) return (
    <p className="w-full text-center text-xl">No Transaction Data Found</p>
  )

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
      {/* Table for small screens */}
      <div className="md:hidden w-full text-white">
        {transactions?.map((trans) => (
          <div key={trans.transaction_id} className="w-full rounded-md p-4">
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>{formatDateToLocal(trans.date)}</p>
              </div>
              {accountType === "manual" && (
                <div className="flex justify-end gap-2">
                  <EditTransactionBtn transactionData={trans} />
                  <DeleteTransactionBtn transactionData={trans} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="flex items-center">
                  <p>{trans.name}</p>
                </div>
                <p className="text-sm text-gray-500">{trans.category}</p>
              </div>

              <div className="text-end">
                <p
                  className={clsx(
                    { "text-emerald-500": trans.amount > 0 },
                    { "text-red-500": trans.amount < 0 }
                  )}
                >
                  {formatCurrency(trans.amount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* For larger screen */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 hidden md:table">
        <thead className="text-xs uppercase bg-gray-700 text-emerald-500">
          <tr>
            {accountType === "manual" && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded  bg-gray-700 border-gray-600"
                  />
                </div>
              </th>
            )}

            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            {accountType === "manual" && (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans) => {
            return (
              <tr
                key={trans.transaction_id}
                className="bg-gray-800 hover:bg-gray-600 text-white"
              >
                {accountType === "manual" && (
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4  rounded bg-gray-700 border-gray-600"
                      />
                    </div>
                  </td>
                )}
                <td className="px-6 py-4">{trans.name}</td>
                <td className="px-6 py-4">{formatDateToLocal(trans.date)}</td>
                <td className="px-6 py-4">{trans.category}</td>
                <td
                  className={clsx(
                    "px-6 py-4",
                    { "text-emerald-500": trans.amount > 0 },
                    { "text-red-500": trans.amount < 0 }
                  )}
                >
                  {formatCurrency(trans.amount)}
                </td>
                {accountType === "manual" && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <EditTransactionBtn transactionData={trans} />
                      <DeleteTransactionBtn transactionData={trans} />
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
